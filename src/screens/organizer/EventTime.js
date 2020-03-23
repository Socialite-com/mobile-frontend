import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

import Button from 'library/components/Button';
import TextForm from 'library/components/TextInput';
import CustomText from 'library/components/CustomText';

const screenWidth = Math.round(Dimensions.get('window').width);

class EventTime extends React.Component {
  state = {
    isModalVisible: false,
    time: new Date(),
    textTime: '',
  };

  formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  handleModal = () => {
    Keyboard.dismiss;
    const visible = this.state.isModalVisible;
    this.setState({isModalVisible: !visible});
  };

  handleTime = selectedTime => {
    if (selectedTime == null) {
      selectedTime = this.state.time;
    }
    this.setState({time: selectedTime});
    const text =
      selectedTime.toDateString() + ' at ' + this.formatTime(selectedTime);
    this.setState({textTime: text});
  };

  removeTime = () => {
    this.setState({isModalVisible: false, time: new Date(), textTime: ''});
  };

  handleVerifyTime = () => {
    if (this.state.time > new Date()) {
      this.props.navigation.navigate('EventLocation');
    } else {
      alert('You must set a valid time for the event');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.textContainer, styles.titleContainer]}>
          <CustomText label="When will your event take place?" subtitle />
        </View>

        <TouchableOpacity onPress={this.handleModal}>
          <View>
            <TextForm
              placeholder="Choose time"
              value={this.state.textTime}
              editable={false}
              onFocus={() => Keyboard.dismiss()}
              showSoftInputOnFocus={false}
              pointerEvents="none"
            />
          </View>
        </TouchableOpacity>

        <Modal
          isVisible={this.state.isModalVisible}
          swipeDirection="down"
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
              value={this.state.time}
              mode={'datetime'}
              minimumDate={new Date()}
              onChange={(event, selectedTime) => this.handleTime(selectedTime)}
            />
            <View style={styles.buttonContainer}>
              <Button title="Cancel" grey half onPress={this.removeTime} />
              <Button
                title="Set"
                dark
                half
                onPress={() => {
                  this.handleTime();
                  this.handleModal();
                }}
              />
            </View>
          </View>
        </Modal>

        <Button title="Next" dark onPress={this.handleVerifyTime} />
      </View>
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
    width: screenWidth * 0.9,
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
});

export default EventTime;
