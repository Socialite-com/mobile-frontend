import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
  Image,
} from 'react-native';

import Button from 'library/components/General/Button';
import TextForm from 'library/components/General/TextInput';
import CustomText from 'library/components/General/CustomText';
import LinkButton from 'library/components/General/LinkButton';
import DismissKeyboardView from 'library/components/General/DismissKeyboardView';

import auth from '@react-native-firebase/auth';
import db from 'library/networking/database';

import {facebookLogin} from '../../library/networking/FBauthentication';
import authentication from '../../library/networking/authentication';

import R from 'res/R';

import Register from 'res/images/register.jpg';

class PhoneAuthScreen extends Component {
  state = {
    phone: '+1',
    confirmResult: null,
    verificationCode: '',
    userExists: false,
    userId: '',
    titling: {},
    offset: R.constants.screenHeight * 0.05,
  };

  componentDidMount(): void {
    const {option} = this.props.route.params;
    if (option === 'signIn') {
      this.setState({titling: R.strings.onboarding.signIn});
    } else if (option === 'signUp') {
      this.setState({titling: R.strings.onboarding.register});
    }
  }

  handleFBLogin() {
    facebookLogin().then(r => {
      if (r === 200) {
        authentication
          .onSignIn('fb-key')
          .then(
            this.props.navigation.reset({index: 0, routes: [{name: 'User'}]}),
          );
      } else {
        alert('Authentication failed.');
      }
    });
  }

  validatePhoneNumber = () => {
    const regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(this.state.phone);
  };

  handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      auth()
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

  handleVerifyCode = () => {
    // Request for OTP verification
    const {confirmResult, verificationCode} = this.state;
    if (verificationCode.length === 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          this.setState({userId: user.uid});
          db.checkUserExists(user).then(r => {
            if (r) {
              this.props.navigation.navigate('EnterPassword');
            } else {
              this.props.navigation.navigate('UserName');
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
        <View style={{width: R.constants.screenWidth * 0.8}}>
          <CustomText
            style={{fontSize: 16}}
            label={this.state.titling.prompt}
          />
        </View>
        <TextForm
          placeholder="+1"
          keyboardType="phone-pad"
          value={this.state.phone}
          onChangeText={phone => {
            this.setState({phone});
          }}
          maxLength={15}
        />
        <Button dark title="Send Code" onPress={this.handleSendCode} />
        <View style={{width: R.constants.screenWidth * 0.8}}>
          <LinkButton
            underline
            title="Or Connect with Facebook"
            onPress={() => this.handleFBLogin()}
          />
        </View>
      </View>
    );
  };

  renderConfirmationCodeView = () => {
    return (
      <View style={styles.authContainer}>
        <View style={{width: R.constants.screenWidth * 0.8}}>
          <CustomText
            style={{fontSize: 16}}
            label="Please enter the 6 digit verification code"
          />
        </View>
        <TextForm
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
      <KeyboardAvoidingView
        style={styles.inputContainer}
        keyboardVerticalOffset={this.state.offset}
        behavior="position">
        <DismissKeyboardView style={{flex: 1}}>
          <View style={styles.mediaContainer}>
            <Image style={styles.image} source={Register} />
          </View>
          <View style={styles.title}>
            <CustomText title label={this.state.titling.title} />
            {this.state.confirmResult
              ? this.renderConfirmationCodeView()
              : this.renderPhoneInputView()}
          </View>
        </DismissKeyboardView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  mediaContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    width: R.constants.screenWidth,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  authContainer: {
    alignItems: 'center',
    marginTop: '3%',
  },
  title: {
    flex: 2,
    width: R.constants.screenWidth * 0.8,
  },
  image: {
    height: R.constants.screenWidth * 0.8,
    width: R.constants.screenWidth * 0.8,
  },
});

export default PhoneAuthScreen;
