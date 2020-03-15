import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';

import LinkButton from "library/components/LinkButton";
import TextForm from "library/components/TextInput";
import CustomText from "library/components/CustomText";

const screenWidth = Math.round(Dimensions.get('window').width);

class LinkRegister extends React.Component {
  state = {};

  render() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <LinkButton header
          onPress={() => this.props.navigation.navigate('User')}
          title="Next"
        />
      )
    });

    return (
      <KeyboardAvoidingView keyboardVerticalOffset={100} style={{flex: 1}} behavior="padding">
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={styles.mediaArea}>
            <CustomText label="Some image..." />
          </View>
          <View style={styles.textArea}>
            <CustomText title label="Access an existing event" />
            <CustomText
              label="Enter your Socialite invite key to access your event" />
          </View>
          <View style={styles.buttonArea}>
            <TextForm placeholder="Paste your key..." />
            <View style={{width: screenWidth * 0.8}}>
              <LinkButton
                underline
                title="Don't have an invite?"
                onPress={() => this.props.navigation.navigate('SignIn')}
              />
            </View>
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
    alignItems: 'center'
  },
  textArea: {
    flex: 1,
    justifyContent: 'flex-end',
    width: screenWidth * 0.8
  },
  buttonArea: {
    marginTop: '5%',
    flex: 2,
    alignItems: 'center',
  }
});

export default LinkRegister;