import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from "library/components/Button";
import CustomText from "library/components/CustomText";
import { facebookLogin } from "library/networking/FBauthentication";
import { onSignIn } from "library/networking/auth";

import R from "res/R";

class SignUp extends React.Component {

  handleFBLogin() {
    facebookLogin()
      .then(r => {
        if (r === 200) { onSignIn('fb-key').then(this.props.navigation.navigate('User')) }
        else {alert('Authentication failed.')}
      })
  }

  render() {

    this.props.navigation.setOptions({ headerLeft: null });
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.textContainer}>
          <CustomText title label="Connect your account" />
          <CustomText
            label="Enter your phone number or connect your social media account
            and we’ll gather all your Socialite invitations!" />
        </View>
        <View style={styles.mediaContainer}>
          <Text>Some picture ...</Text>
        </View>
        <View style={styles.actionContainer}>
          <Button
            dark
            title="Sign in with phone number"
            onPress={() => this.props.navigation.navigate('PhoneAuth', { finalRoute: 'User' })}
          />
          <CustomText subtitle_2 label="Or" />
          <Button
            light
            title="Connect using a social account"
            onPress={() => this.handleFBLogin()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    width: R.constants.screenWidth * 0.75,
    justifyContent: 'flex-end'
  },
  mediaContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  actionContainer: {
    flex: 1,
    marginBottom: '5%',
    alignItems: 'center'
  }
});

export default SignUp;
