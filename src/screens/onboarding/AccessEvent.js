import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';

import CustomText from '../../library/components/General/CustomText';
import Button from '../../library/components/General/Button';
import R from 'res/R';

class AccessEvent extends React.Component {
  state = {};

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        style={{flex: 1}}
        behavior="padding">
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={styles.mediaArea}>
            <Image style={styles.image} source={R.images.scan} />
          </View>
          <View style={styles.textArea}>
            <CustomText title label="Access an existing event" />
            <CustomText
              label="Take a picture or a screenshot of your Socialite code and save it to your camera roll.
               We'll detect it and beam you to your event!"
            />
          </View>
          <View style={styles.buttonArea}>
            <Button
              half
              swap
              onPress={() => this.props.navigation.navigate('LinkRegister')}
              title="Type key"
            />
            <Button
              half
              onPress={() => this.props.navigation.navigate('GetCodes')}
              title="Detect code"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  mediaArea: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: R.constants.screenWidth * 0.5,
  },
  textArea: {
    flex: 2,
    justifyContent: 'center',
    width: R.constants.screenWidth * 0.8,
  },
  buttonArea: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: '5%',
  },
  image: {
    height: R.constants.screenWidth * 0.8,
    width: R.constants.screenWidth * 0.8,
  },
});

export default AccessEvent;
