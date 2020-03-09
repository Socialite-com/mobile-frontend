import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
} from 'react-native'

import Button from "library/components/Button";
import TextForm from "library/components/TextInput";
import CustomText from "library/components/CustomText";

import firebase from 'react-native-firebase';
import {onSignIn} from "library/networking/auth";

const screenWidth = Math.round(Dimensions.get('window').width);

class PhoneAuthScreen extends Component {
  state = {
    phone: '+1',
    confirmResult: null,
    verificationCode: '',
    userId: ''
  };

  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(this.state.phone)
  };

  handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      firebase.auth()
        .signInWithPhoneNumber(this.state.phone)
        .then(confirmResult => { this.setState({ confirmResult }) })
        .catch(error => { alert(error.message) })
    } else {
      alert('Invalid Phone Number')
    }
  };

  handleVerifyCode = () => {
    // Request for OTP verification
    const { confirmResult, verificationCode } = this.state;
    if (verificationCode.length === 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          this.setState({ userId: user.uid });
          // alert(`Verified! ${user.uid}`)
          user.getIdToken()
            .then(key => {
              onSignIn(key);
              this.props.navigation.navigate('CreateEvent')
            })
        })
        .catch(error => { alert(error.message) })
    } else {
      alert('Please enter a 6 digit OTP code.')
    }
  };

  renderPhoneInputView = () => {
    return (
      <View style={styles.authContainer}>
        <View style={{width: screenWidth * 0.8}}>
          <CustomText style={{fontSize: 16}} label="Please enter your phone number below"/>
        </View>
        <TextForm
          placeholder="+1"
          keyboardType='phone-pad'
          value={this.state.phone}
          onChangeText={phone => {
            this.setState({ phone })
          }}
          maxLength={15}
        />
        <Button
          dark
          title='Send Code'
          onPress={this.handleSendCode}
        />
      </View>
    )
  };

  renderConfirmationCodeView = () => {
    return (
      <View style={styles.authContainer}>
        <View style={{width: screenWidth * 0.8}}>
          <CustomText style={{fontSize: 16}} label="Please enter the 6 digit verification code"/>
        </View>
        <TextForm
          placeholder='Verification code'
          value={this.state.verificationCode}
          keyboardType='numeric'
          onChangeText={verificationCode => {
            this.setState({ verificationCode })
          }}
          maxLength={6}
        />
        <Button
          dark
          title="Verify Code"
          onPress={this.handleVerifyCode}
        />
      </View>
    )
  };

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={styles.mediaContainer}>
          <CustomText label="Some image..." />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.title}>
            <CustomText title label="Become a Socialite" />
          </View>
          {this.state.confirmResult ? this.renderConfirmationCodeView() : this.renderPhoneInputView()}
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  mediaContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 3,
    width: screenWidth,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  authContainer: {
    flex: 3,
    alignItems: 'center',
    marginTop: '3%'
  },
  title: {
    flex: 1,
    justifyContent: 'flex-end',
    width: screenWidth * 0.8
  }
});

export default PhoneAuthScreen