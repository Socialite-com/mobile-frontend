import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {facebookLogin} from 'library/networking/FBauthentication';
import authentication from '../../../library/networking/authentication';
import Button from 'library/components/General/Button';
import CustomText from 'library/components/General/CustomText';

import R from 'res/R';

class OAuth extends React.Component {
  state = {
    titling: {},
  };

  handleFBLogin() {
    facebookLogin().then(r => {
      if (r === 200) {
        authentication
          .onSignIn('fb-key')
          .then(this.props.navigation.navigate('User'));
      } else {
        alert('Authentication failed.');
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={styles.textContainer}>
          <CustomText title label="Create a new event" />
          <CustomText
            style={{fontSize: 18}}
            label="Sign into your social media account or enter your phone number to get started!"
          />
        </View>
        <View style={styles.mediaContainer}>
          <Text>Some picture ...</Text>
        </View>
        <View style={styles.actionContainer}>
          <Button
            dark
            title="Sign up with phone number"
            onPress={() =>
              this.props.navigation.navigate('PhoneAuth', {
                finalRoute: 'CreateEvent',
              })
            }
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
    justifyContent: 'flex-end',
  },
  mediaContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  actionContainer: {
    flex: 1,
    marginBottom: '5%',
    alignItems: 'center',
  },
});

export default OAuth;
