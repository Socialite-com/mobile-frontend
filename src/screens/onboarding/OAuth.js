import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';

import {facebookLogin} from "library/networking/FBauthentication";
import {onSignIn} from "library/networking/auth";
import Button from 'library/components/Button';
import CustomText from "library/components/CustomText";

const screenWidth = Math.round(Dimensions.get('window').width);

class OAuth extends React.Component {

  handleFBLogin() {
    facebookLogin()
      .then(r => {
        if (r === 200) { onSignIn('fb-key').then(this.props.navigation.navigate('CreateEvent')) }
        else {alert('Authentication failed.')}
      })
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.textContainer}>
          <CustomText title label="Create a new event" />
          <CustomText style={{fontSize: 18}} label="Sign into your social media account or enter your phone number to get started!" />
        </View>
        <View style={styles.mediaContainer}>
          <Text>Some picture ...</Text>
        </View>
        <View style={styles.actionContainer}>
          <Button
            dark
            title="Sign up with phone number"
            onPress={() => this.props.navigation.navigate('PhoneAuth', {finalRoute: 'CreateEvent'})}
          />
          <CustomText subtitle_2 label="Or" />
          <Button
            light
            title="Connect using a social account"
            onPress={() => this.handleFBLogin()}
          />
        </View>
      </View>
    )
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
    flex: 1,
    marginBottom: '5%',
    alignItems: 'center'
  }
});

export default OAuth;