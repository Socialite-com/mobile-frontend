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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SET_PHONE_NUMBER, SET_VERIFICATION_CODE} from '../../state/constants';
import {
  setValue,
  resetAuth,
  handleSendCode,
  handleVerifyCode,
  connectFbAccount,
} from '../../state/actions/onboarding';

import R from 'res/R';

class PhoneAuthScreen extends Component {
  componentDidMount() {
    this.props.actions.resetAuth();
  }

  renderPhoneInputView = titling => {
    const {onBoarding, actions} = this.props;
    return (
      <View style={styles.authContainer}>
        <View style={{width: R.constants.screenWidth * 0.8}}>
          <CustomText style={{fontSize: 16}} label={titling.prompt} />
        </View>
        <TextForm
          maxLength={15}
          placeholder="+1"
          keyboardType="phone-pad"
          value={onBoarding.phoneAuth.phoneNumber}
          onChangeText={phone => actions.setValue(SET_PHONE_NUMBER, phone)}
        />
        <Button title="Send Code" onPress={() => actions.handleSendCode()} />
        <View style={{width: R.constants.screenWidth * 0.8}}>
          <LinkButton
            underline
            title="Or Connect with Facebook"
            onPress={() =>
              this.props.actions.connectFbAccount().then(() => {
                this.props.navigation.navigate('User');
              })
            }
          />
        </View>
      </View>
    );
  };

  renderConfirmationCodeView = () => {
    const {onBoarding, actions} = this.props;
    return (
      <View style={styles.authContainer}>
        <View style={{width: R.constants.screenWidth * 0.8}}>
          <CustomText
            style={{fontSize: 16}}
            label="Please enter the 6 digit verification code"
          />
        </View>
        <TextForm
          maxLength={6}
          placeholder="Verification code"
          value={onBoarding.phoneAuth.verificationCode}
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          onChangeText={code => actions.setValue(SET_VERIFICATION_CODE, code)}
        />
        <Button
          title="Verify Code"
          onPress={() =>
            actions.handleVerifyCode().then(() => {
              if (this.props.onBoarding.userDetails.newUser)
                this.props.navigation.navigate('UserName');
              else this.props.navigation.navigate('User');
            })
          }
        />
      </View>
    );
  };

  render() {
    const titling = R.strings.onboarding[this.props.onBoarding.mode];
    return (
      <KeyboardAvoidingView
        behavior="position"
        style={styles.inputContainer}
        keyboardVerticalOffset={R.constants.screenHeight * 0.05}>
        <DismissKeyboardView style={{flex: 1}}>
          <View style={styles.mediaContainer}>
            <Image style={styles.image} source={R.images.register} />
          </View>
          <View style={styles.title}>
            <CustomText title label={titling.title} />
            {this.props.onBoarding.phoneAuth.confirmResult
              ? this.renderConfirmationCodeView()
              : this.renderPhoneInputView(titling)}
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
    backgroundColor: R.color.primary,
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

const ActionCreators = {
  setValue,
  resetAuth,
  handleSendCode,
  handleVerifyCode,
  connectFbAccount,
};

const mapStateToProps = state => ({
  onBoarding: state.onBoarding,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneAuthScreen);
