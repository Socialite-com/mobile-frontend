import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  Platform,
  View,
} from 'react-native';

import Button from 'library/components/Button';
import TextForm from 'library/components/TextInput';
import CustomText from 'library/components/CustomText';

import firebase from 'react-native-firebase';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

class PhoneAuthScreen extends Component {
  state = {
    phone: '+1',
    confirmResult: null,
    verificationCode: '',
    userExists: false,
    userId: '',
    offset: screenHeight * 0.2,
  };

  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(this.state.phone);
  };

  handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      firebase
        .auth()
        .signInWithPhoneNumber(this.state.phone)
        .then(confirmResult => {
          this.setState({confirmResult});
        })
        .catch(error => {
          alert(error.message);
        });
    } else {
      alert('Invalid Phone Number');
    }
  };

  async checkUserExists(user) {
    const ref = firebase
      .database()
      .ref('/users/' + user.uid + '/profile')
      .child('password');
    const snapshot = await ref.once('value');
    return snapshot.val() != null;
  }

  handleVerifyCode = () => {
    // Request for OTP verification
    const {confirmResult, verificationCode} = this.state;
    if (verificationCode.length === 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          this.setState({userId: user.uid});
          this.checkUserExists(user).then(r => {
            if (r) {
              this.props.navigation.navigate('EnterPassword', {
                finalRoute: this.props.route.params.finalRoute,
              });
            } else {
              this.props.navigation.navigate('UserName', {
                finalRoute: this.props.route.params.finalRoute,
              });
            }
          });
        })
        .catch(error => {
          alert(error.message);
        });
    } else {
      alert('Please enter a 6 digit OTP code.');
    }
  };

  renderPhoneInputView = () => {
    return (
      <View style={styles.authContainer}>
        <View style={{width: screenWidth * 0.8}}>
          <CustomText
            style={{fontSize: 16}}
            label="Please enter your phone number below"
          />
        </View>
        <TextForm
          autoFocus
          placeholder="+1"
          keyboardType="phone-pad"
          value={this.state.phone}
          onChangeText={phone => {
            this.setState({phone});
          }}
          maxLength={15}
        />
        <Button dark title="Send Code" onPress={this.handleSendCode} />
      </View>
    );
  };

  renderConfirmationCodeView = () => {
    return (
      <View style={styles.authContainer}>
        <View style={{width: screenWidth * 0.8}}>
          <CustomText
            style={{fontSize: 16}}
            label="Please enter the 6 digit verification code"
          />
        </View>
        <TextForm
          autoFocus
          placeholder="Verification code"
          value={this.state.verificationCode}
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          onChangeText={verificationCode => {
            this.setState({verificationCode});
          }}
          maxLength={6}
        />
        <Button dark title="Verify Code" onPress={this.handleVerifyCode} />
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.mediaContainer}>
          <CustomText label="Some image..." />
        </View>
        <KeyboardAvoidingView
          style={styles.inputContainer}
          keyboardVerticalOffset={this.state.offset}
          behavior="padding">
          <View style={styles.title}>
            <CustomText title label="Become a Socialite" />
          </View>
          {this.state.confirmResult
            ? this.renderConfirmationCodeView()
            : this.renderPhoneInputView()}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mediaContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 4,
    width: screenWidth,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  authContainer: {
    flex: 2,
    alignItems: 'center',
    marginTop: '3%',
  },
  title: {
    flex: 1,
    justifyContent: 'flex-end',
    width: screenWidth * 0.8,
  },
});

export default PhoneAuthScreen;
