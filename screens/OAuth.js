import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import {facebookLogin} from "../networking/FBauthentication";
import Button from '../components/Button';
import CustomText from "../components/CustomText";

const screenWidth = Math.round(Dimensions.get('window').width);

class OAuth extends React.Component {

  handleFBLogin() {
    facebookLogin()
      .then(r => {
        console.log(r);
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
            title="Sign in with Facebook"
            onPress={this.handleFBLogin}
          />
          <Button
            dark
            title="Sign in with phone number"
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
    flex: 1
  }
});

export default OAuth;