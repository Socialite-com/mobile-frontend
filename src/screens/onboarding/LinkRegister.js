import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';

import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';
import vision, {
  VisionBarcodeFormat,
  VisionBarcodeValueType,
} from '@react-native-firebase/ml-vision';
import {RNCamera} from 'react-native-camera';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  queryFail,
  queryEvent,
  resetEventQuery,
} from '../../state/actions/events';

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
    modalVisible: false,
    cameraVisible: false,
  };

  componentDidMount() {
    this.props.actions.resetEventQuery();
  }

  _handleKeyInput() {
    const {keyVal} = this.state;
    this.props.actions.queryEvent(keyVal);
    this.props.navigation.navigate('GetCode');
  }

  _onBarcodeRecognized = ({barcodes}) => {
    barcodes.forEach(barcode => {
      if (typeof barcode.data === 'string') {
        this.props.actions.queryEvent(barcode.data);
        this.props.navigation.navigate('GetCode');
      }
    });
  };

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
          ref={cam => (this.camera = cam)}
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

  _handleReadCode = () => {
    ImagePicker.launchImageLibrary({}, async response => {
      this.handleModal(); // close modal
      vision()
        .barcodeDetectorProcessImage(response.uri, {
          barcodeFormats: [VisionBarcodeFormat.QR_CODE],
        })
        .then(barcodes => {
          if (barcodes.length === 0) {
            this.props.actions.queryFail(
              'No barcodes were detected in your image.',
            );
          } else {
            barcodes.map(barcode => {
              if (
                barcode &&
                barcode.valueType === VisionBarcodeValueType.TEXT
              ) {
                this.props.actions.queryEvent(barcode.displayValue);
              } else {
                this.props.actions.queryFail('An error occurred somewhere');
              }
            });
          }
          this.props.navigation.navigate('GetCode');
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
            <KeyboardAvoidingView
              style={{flex: 1}}
              keyboardVerticalOffset={20}
              behavior="position">
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
                    onChangeText={keyVal => this.setState({keyVal})}
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

const ActionCreators = {
  resetEventQuery,
  queryEvent,
  queryFail,
};

const mapStateToProps = state => ({
  findEvent: state.findEvent,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkRegister);
