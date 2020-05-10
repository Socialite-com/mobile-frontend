import React from 'react';
import {StyleSheet, View, KeyboardAvoidingView, ScrollView} from 'react-native';

import Modal from 'react-native-modal';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import Button from '../../library/components/General/Button';
import TextForm from '../../library/components/General/TextInput';
import CustomText from '../../library/components/General/CustomText';
import LinkButton from '../../library/components/General/LinkButton';
import LocationItem from '../../library/components/General/LocationItem';
import DismissKeyboardView from '../../library/components/General/DismissKeyboardView';

import maps from '../../library/networking/googleMaps';
import _ from 'lodash';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setCreatePayload, createEvent} from '../../state/actions/events';

const keyboardOffset = R.constants.screenHeight * 0.2;
const latDelta = 0.001;
const longDelta = 0.001;

import R from 'res/R';

class EventLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      location: {
        latitude: 75.78825,
        longitude: -122.4324,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
      },
      textLocation: '',
      inputValue: '',
      locationResults: [],
    };
    this.onDebounce = _.debounce(this.handleTextChange, 500);
  }

  handleLocationSelect = id => {
    maps.geocode(id).then(res => {
      const location = res.geometry.location;
      this.setState({
        textLocation: res.formatted_address,
        location: {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: latDelta,
          longitudeDelta: longDelta,
        },
      });
      this.handleModal();
    });
  };

  handleTextChange = textValue => {
    if (textValue === '') {
      this.setState({locationResults: []});
    } else {
      maps.autocomplete(textValue).then(results => {
        this.setState({locationResults: results});
      });
    }
  };

  handleModal = () => {
    const visible = this.state.isModalVisible;
    this.setState({isModalVisible: !visible});
  };

  handleVerifyLocation = () => {
    if (this.state.location.latitude && this.state.textLocation) {
      const {location} = this.state;
      const eventData = this.props.newEvent.payload;
      eventData.location = [location.latitude, location.longitude];

      this.props.actions.setCreatePayload(eventData);
      this.props.actions
        .createEvent()
        .then(res => {
          this.props.navigation.reset({
            index: 0,
            routes: [{name: 'User'}],
          });
        })
        .catch(err => alert(err.message));
    }
  };

  render() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <LinkButton
          onPress={() =>
            this.props.navigation.reset({
              index: 0,
              routes: [{name: 'User'}],
            })
          }
          header
          title="Skip"
        />
      ),
    });

    const {inputValue, locationResults} = this.state;
    return (
      <>
        <View style={styles.progressBar} />
        <DismissKeyboardView style={styles.container}>
          <View style={[styles.textContainer, styles.titleContainer]}>
            <CustomText label="Where will your event take place?" subtitle />
          </View>

          <KeyboardAvoidingView
            style={{flex: 1, justifyContent: 'center'}}
            keyboardVerticalOffset={keyboardOffset}
            behavior="padding">
            <View
              style={{
                width: R.constants.screenWidth,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextForm
                placeholder="Choose Location"
                value={inputValue}
                onChangeText={value => {
                  this.setState({inputValue: value});
                  this.onDebounce(value);
                }}
              />
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollView}
              keyboardShouldPersistTaps="always">
              {locationResults.map((el, i) => (
                <LocationItem
                  {...el}
                  onPress={() => this.handleLocationSelect(el.place_id)}
                  key={String(i)}
                />
              ))}
            </ScrollView>
          </KeyboardAvoidingView>

          <Modal
            isVisible={this.state.isModalVisible}
            onBackdropPress={this.handleModal}
            style={styles.modalContainer}>
            <View style={styles.modalContentContainer}>
              <CustomText
                style={styles.titleContainer}
                label="Confirm Location"
                subtitle
                center
              />

              <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={this.state.location}>
                <Marker coordinate={this.state.location} />
              </MapView>

              <View style={styles.buttonContainer}>
                <Button
                  title="Cancel"
                  swap
                  half
                  onPress={() => this.setState({isModalVisible: false})}
                />
                <Button
                  half
                  title="Confirm"
                  onPress={() => this.handleVerifyLocation()}
                />
              </View>
            </View>
          </Modal>
        </DismissKeyboardView>
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
    alignItems: 'center',
    borderRadius: 8,
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
  map: {
    width: R.constants.screenWidth * 0.8,
    height: 250,
    marginVertical: '2%',
  },
  scrollView: {
    alignItems: 'center',
  },
  progressBar: {
    width: R.constants.screenWidth * 0.99,
    backgroundColor: '#000',
    position: 'absolute',
    height: 3,
  },
});

const ActionCreators = {
  createEvent,
  setCreatePayload,
};

const mapStateToProps = state => ({
  newEvent: state.newEvent,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventLocation);
