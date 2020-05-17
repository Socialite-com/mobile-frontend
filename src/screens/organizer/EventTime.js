import React from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

import Button from '../../library/components/General/Button';
import TextForm from '../../library/components/General/TextInput';
import LinkButton from '../../library/components/General/LinkButton';
import CustomText from '../../library/components/General/CustomText';

import R from 'res/R';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {parseDateTime} from '../../state/selectors';
import {setCreatePayload, toggleCreateStage} from '../../state/actions/events';

class EventTime extends React.Component {
  state = {
    isModalVisible: false,
    time: new Date(),
    textTime: '',
  };

  handleModal = () => {
    Keyboard.dismiss();
    const visible = this.state.isModalVisible;
    this.setState({isModalVisible: !visible});
  };

  handleTime = selectedTime => {
    let {textTime, time} = this.state;
    if (selectedTime == null || selectedTime <= Date.now()) {
      selectedTime = time;
    } else {
      textTime = parseDateTime(selectedTime);
    }
    this.setState({time: selectedTime, textTime});
  };

  removeTime = () => {
    this.setState({isModalVisible: false, time: new Date(), textTime: ''});
  };

  handleVerifyTime = () => {
    // format event data
    const time = this.state.time;
    const eventData = this.props.newEvent.payload;
    if (time > new Date()) {
      eventData.startTime = time;
      this.props.actions.setCreatePayload(eventData);
      this.props.actions.toggleCreateStage('EventLocation');
      this.props.navigation.navigate('EventLocation');
    } else {
      alert('You must set a valid time for the party');
    }
  };

  render() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <LinkButton
          onPress={() => this.props.navigation.navigate('EventLocation')}
          header
          title="Skip"
        />
      ),
    });

    return (
      <>
        <View style={styles.progressBar} />
        <View style={styles.container}>
          <View style={[styles.textContainer, styles.titleContainer]}>
            <CustomText label="When will your party take place?" subtitle />
          </View>

          <TouchableOpacity onPress={this.handleModal}>
            <TextForm
              editable={false}
              placeholder="Choose time"
              value={this.state.textTime}
              onFocus={() => Keyboard.dismiss()}
              showSoftInputOnFocus={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
          <Button
            title="Next"
            grey={this.state.textTime === ''}
            onPress={this.handleVerifyTime}
          />
        </View>
        <Modal
          swipeDirection="down"
          isVisible={this.state.isModalVisible}
          onSwipeComplete={this.handleModal}
          onBackdropPress={this.handleModal}
          style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <CustomText
              style={styles.titleContainer}
              label="Choose a Start Time"
              subtitle
              center
            />
            <DateTimePicker
              mode={'datetime'}
              minuteInterval={5}
              value={this.state.time}
              minimumDate={new Date()}
              onChange={(event, selectedTime) => this.handleTime(selectedTime)}
            />
            <View style={styles.buttonContainer}>
              <Button title="Cancel" swap half onPress={this.removeTime} />
              <Button
                title="Set"
                half
                onPress={() => {
                  this.handleTime();
                  this.handleModal();
                }}
              />
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
  },
  titleContainer: {
    paddingBottom: '5%',
  },
  textContainer: {
    width: R.constants.screenWidth * 0.8,
    overflow: 'scroll',
  },
  modalContentContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 30,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '2%',
  },
  progressBar: {
    width: R.constants.screenWidth * 0.66,
    backgroundColor: '#000',
    position: 'absolute',
    height: 3,
  },
});

const ActionCreators = {
  toggleCreateStage,
  setCreatePayload,
};

const mapStateToProps = state => ({
  newEvent: state.newEvent,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventTime);
