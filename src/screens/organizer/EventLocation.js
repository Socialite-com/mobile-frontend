import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from 'react-native';

import Modal from 'react-native-modal';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';

import Button from '../../library/components/General/Button';
import TextForm from '../../library/components/General/TextInput';
import CustomText from '../../library/components/General/CustomText';
import LocationItem from 'library/components/General/LocationItem';

import db from 'library/networking/database';

const keyboardOffset = R.constants.screenHeight * 0.2;
const latDelta = 0.001;
const longDelta = 0.001;

import R from 'res/R';

class EventLocation extends React.Component {
  state = {
    isModalVisible: false,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: latDelta,
      longitudeDelta: longDelta,
    },
    textLocation: '',
  };

  handleLocationSelect = async (fetchDetails, id) => {
    const res = await fetchDetails(id);

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
  };

  handleModal = () => {
    Keyboard.dismiss;
    const visible = this.state.isModalVisible;
    this.setState({isModalVisible: !visible});
  };

  removeLocation = () => {
    this.setState({isModalVisible: false});
  };

  handleVerifyLocation = async () => {
    if (this.state.location.latitude && this.state.textLocation) {
      //format data
      var type;
      if (this.props.route.params.private) {
        type = 'private';
      } else {
        type = 'public';
      }

      const data = {
        name: this.props.route.params.name,
        type: type,
        free: this.props.route.params.free,
        price: this.props.route.params.price,
        time: this.props.route.params.time,
        location: this.state.location,
      };

      //get user data
      db.getUser()
        .then(user => {
          //create event
          db.createEvent(user.uid, data)
            .then(success => {
              console.log(success);

              this.handleModal();
              this.props.navigation.reset({
                index: 0,
                routes: [{name: 'User'}],
              });
            })
            .catch(err => alert(err.message));
        })
        .catch(err => alert(err));
    } else {
      alert('You must set a valid location for the event');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.textContainer, styles.titleContainer]}>
          <CustomText label="Where will your event take place?" subtitle />
        </View>

        <KeyboardAvoidingView
          keyboardVerticalOffset={keyboardOffset}
          behavior="padding">
          <GoogleAutoComplete
            queryTypes=""
            components="country:ca"
            apiKey="AIzaSyDJSAvTqCXe-SDaSNxLKU4kiogZX06wR14">
            {({
              inputValue,
              handleTextChange,
              locationResults,
              fetchDetails,
            }) => (
              <>
                <TextForm
                  placeholder="Choose Location"
                  value={inputValue}
                  onChangeText={handleTextChange}
                />

                <ScrollView
                  contentContainerStyle={styles.scrollView}
                  keyboardShouldPersistTaps="always">
                  {locationResults.map((el, i) => (
                    <LocationItem
                      {...el}
                      onPress={() =>
                        this.handleLocationSelect(fetchDetails, el.place_id)
                      }
                      key={String(i)}
                    />
                  ))}
                </ScrollView>
              </>
            )}
          </GoogleAutoComplete>
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
              <Button title="Cancel" grey half onPress={this.removeLocation} />
              <Button
                title="Confirm"
                dark
                half
                onPress={() => this.handleVerifyLocation()}
              />
            </View>
          </View>
        </Modal>
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
    width: R.constants.screenWidth * 0.8,
    overflow: 'scroll',
  },
  modalContentContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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
  map: {
    width: '90%',
    height: 250,
    marginVertical: '2%',
  },
  scrollView: {
    alignItems: 'center',
  },
});

export default EventLocation;
