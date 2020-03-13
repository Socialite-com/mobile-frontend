import React from 'react';
import {
  Dimensions,
  StyleSheet, Text,
  View
} from 'react-native';

import Button from "library/components/Button";
import CustomText from "library/components/CustomText";
import {facebookLogin} from "library/networking/FBauthentication";
import {onSignIn} from "../../library/networking/auth";

const screenWidth = Math.round(Dimensions.get('window').width);

class SignIn extends React.Component {

  handleFBLogin() {
    facebookLogin()
      .then(r => {
        if (r === 200) { onSignIn('fb-key').then(this.props.navigation.navigate('User')) }
        else {alert('Authentication failed.')}
      })
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.textContainer}>
          <CustomText title label="Having trouble finding your event?" />
          <CustomText
            label="Sign in to your social media account or enter your phone number
            and we’ll gather all your Socialite invitations!" />
        </View>
        <View style={styles.mediaContainer}>
          <Text>Some picture ...</Text>
        </View>
        <View style={styles.actionContainer}>
          <Button
            dark
            title="Sign in with Facebook"
            onPress={() => this.handleFBLogin()}
          />
          <Button
            dark
            title="Sign in with phone number"
            onPress={() => this.props.navigation.navigate('PhoneAuth', {routing: 'User'})}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    width: screenWidth * 0.75,
    justifyContent: 'flex-end'
  },
  mediaContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  actionContainer: {
    flex: 1
  }
});

export default SignIn;