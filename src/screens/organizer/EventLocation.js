import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  Image,
} from 'react-native';

import Modal from 'react-native-modal';
import Geocoder from 'react-native-geocoding';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

Geocoder.init('AIzaSyDJSAvTqCXe-SDaSNxLKU4kiogZX06wR14');

import Button from '../../library/components/General/Button';
import TextForm from '../../library/components/General/TextInput';
import CustomText from '../../library/components/General/CustomText';

import R from 'res/R';

class EventLocation extends React.Component {
  state = {
    isModalVisible: false,
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    textLocation: '',
  };

  handleModal = () => {
    Keyboard.dismiss;
    const visible = this.state.isModalVisible;
    this.setState({isModalVisible: !visible});
  };

  handleLocation = location => {
    if (location == null) {
      location = this.state.location;
    }
    this.setState({location: location});

    //create text
    //needs payed things
    // Geocoder.from(location)
    //   .then(json => {
    //     var addressComponent = json.results[0].address_components[0];
    //     alert(addressComponent);
    //   })
    //   .catch(error => console.warn(error));
  };

  removeLocation = () => {
    this.setState({isModalVisible: false, textLocation: ''});
  };

  handleVerifyLocation = () => {
    //if (this.state.location && this.state.textLocation) {
    if (this.state.location) {
      this.props.navigation.navigate('EventPrice');
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

        <TouchableOpacity onPress={this.handleModal}>
          <View>
            <TextForm
              placeholder="Choose Location"
              value={this.state.textLocation}
              editable={false}
              onFocus={() => Keyboard.dismiss()}
              showSoftInputOnFocus={false}
              pointerEvents="none"
            />
          </View>
        </TouchableOpacity>

        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={this.handleModal}
          style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <CustomText
              style={styles.titleContainer}
              label="Choose Location"
              subtitle
              center
            />

            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={this.state.location}
              onRegionChangeComplete={this.handleLocation}>
              <View style={styles.markerFixed}>
                <Image style={styles.marker} source={R.images.marker} />
              </View>
            </MapView>

            <View style={styles.buttonContainer}>
              <Button title="Cancel" grey half onPress={this.removeLocation} />
              <Button
                title="Set"
                dark
                half
                onPress={() => {
                  this.handleLocation();
                  this.handleModal();
                }}
              />
            </View>
          </View>
        </Modal>

        <Button title="Next" dark onPress={this.handleVerifyLocation} />
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
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
  },
});

export default EventLocation;
