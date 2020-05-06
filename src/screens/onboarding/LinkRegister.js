import React from 'react';
import {
  View,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';
import vision, {
  VisionBarcodeFormat,
  VisionBarcodeValueType,
} from '@react-native-firebase/ml-vision';
import {RNCamera} from 'react-native-camera';

import DismissKeyboardView from '../../library/components/General/DismissKeyboardView';
import LinkButton from 'library/components/General/LinkButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../library/components/General/Button';
import TextForm from 'library/components/General/TextInput';
import CustomText from 'library/components/General/CustomText';

import R from 'res/R';

class LinkRegister extends React.Component {
  state = {
    keyVal: '',
    error: '',
    activeBarcode: '',
    modalVisible: false,
    cameraVisible: false,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      error: '',
    });
  }

  _handleKeyInput() {
    const {keyVal} = this.state;
    if (keyVal.length === 0) {
      this.setState({error: 'Invalid Key Length'});
      Alert.alert('Invalid Key Length');
    } else {
      this.props.navigation.navigate('GetCode', {
        eventKey: keyVal,
        origin: 'key',
      });
    }
  }

  handleModal = () => {
    const visible = this.state.modalVisible;
    this.setState({modalVisible: !visible});
  };

  handleCamera = () => {
    const visible = this.state.cameraVisible;
    this.setState({cameraVisible: !visible});
  };

  renderCamera = () => {
    return (
      <View style={{flex: 1}}>
        <RNCamera
          ref={cam => {
            this.camera = cam;
          }}
          style={{
            height: R.constants.screenHeight,
            width: R.constants.screenWidth,
          }}
          onGoogleVisionBarcodesDetected={this._onBarcodeRecognized}
          googleVisionBarcodeType={
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE
          }
          aspect={RNCamera.Constants.Orientation.auto}
        />
      </View>
    );
  };

  _validateCode = barcode => {
    function byteCount(s) {
      return encodeURI(s).split(/%..|./).length - 1;
    }
    // add validation steps for a Socialite event Id
    if (barcode === '.' || barcode === '..') {
      return 'Invalid QR code';
    } else if (byteCount(barcode) >= 1500) {
      return 'QR encoding is over byte limit.';
    } else if (barcode.includes('/')) {
      return 'Invalid QR code';
    } else {
      return null;
    }
  };

  _onBarcodeRecognized = ({barcodes}) => {
    const {activeBarcode} = this.state;
    var error = null;
    barcodes.forEach(barcode => {
      if (barcode.data === activeBarcode) {
      } else if (typeof barcode.data === 'string') {
        error = this._validateCode(barcode.data);
        if (error === null) {
          this.props.navigation.navigate('GetCode', {
            eventKey: barcode.data,
            origin: 'scanner',
          });
        } else {
          Alert.alert(error);
          this.setState({activeBarcode: barcode.data});
        }
      }
    });
  };

  _handleReadCode = () => {
    ImagePicker.launchImageLibrary({}, async response => {
      this.handleModal(); // close modal
      vision()
        .barcodeDetectorProcessImage(response.uri, {
          barcodeFormats: [VisionBarcodeFormat.QR_CODE],
        })
        .then(barcodes => {
          if (barcodes.length === 0) {
            Alert.alert('No barcodes detected in image');
          } else {
            barcodes.map(barcode => {
              if (
                barcode &&
                barcode.valueType === VisionBarcodeValueType.TEXT
              ) {
                const error = this._validateCode(barcode.displayValue);
                if (error === null) {
                  this.props.navigation.navigate('GetCode', {
                    eventKey: barcode.displayValue,
                    origin: 'scanner',
                  });
                } else {
                  Alert.alert(error);
                }
              }
            });
          }
        });
    });
  };

  _renderModal() {
    return (
      <Modal
        isVisible={this.state.modalVisible}
        swipeDirection="down"
        onSwipeComplete={this.handleModal}
        onBackdropPress={this.handleModal}
        style={styles.modalContainer}>
        <View style={styles.modalContentContainer}>
          <Button
            half
            swap
            onPress={() => this.handleCamera()}
            customStyle={{height: 130}}
            title="Take a picture">
            <Icon name="ios-camera" size={50} />
          </Button>
          <Button
            half
            swap
            onPress={() => this._handleReadCode()}
            customStyle={{
              height: 130,
              justifyContent: 'space-around',
            }}
            title="Choose from camera roll">
            <Icon name="ios-image" size={50} />
          </Button>
        </View>
      </Modal>
    );
  }

  render() {
    if (this.state.cameraVisible) {
      this.props.navigation.setOptions({
        headerRight: () => (
          <LinkButton
            header
            title="Close"
            onPress={() => this.handleCamera()}
          />
        ),
      });
    } else {
      this.props.navigation.setOptions({
        headerRight: () => (
          <LinkButton
            header
            onPress={() => this._handleKeyInput()}
            title="Next"
          />
        ),
      });
    }

    return (
      <>
        {this.state.cameraVisible ? (
          this.renderCamera()
        ) : (
          <DismissKeyboardView style={{flex: 1, alignItems: 'center'}}>
            <KeyboardAvoidingView style={{flex: 1}} behavior="position">
              <View style={{flex: 1, alignItems: 'center'}}>
                <View style={styles.mediaArea}>
                  <Image style={styles.image} source={R.images.scan} />
                </View>
                <View style={styles.textArea}>
                  <CustomText title label="Access an existing event" />
                  <CustomText label="Enter your Socialite invite key or scan your Socialite code to access your event" />
                </View>
                <View style={styles.buttonArea}>
                  <TextForm
                    value={this.state.keyVal}
                    onChangeText={keyVal => {
                      this.setState({keyVal});
                    }}
                    placeholder="Paste your key..."
                  />
                  <View style={{width: R.constants.screenWidth * 0.8}}>
                    <LinkButton
                      underline
                      title="Scan a QR Code"
                      onPress={() => this.handleModal()}
                    />
                    {this._renderModal()}
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </DismissKeyboardView>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  mediaArea: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: R.constants.screenWidth * 0.5,
  },
  textArea: {
    flex: 1,
    justifyContent: 'flex-end',
    width: R.constants.screenWidth * 0.8,
  },
  buttonArea: {
    flex: 2,
    marginTop: '5%',
    alignItems: 'center',
  },
  modalContentContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 30,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  image: {
    height: R.constants.screenWidth * 0.8,
    width: R.constants.screenWidth * 0.8,
  },
});

export default LinkRegister;
