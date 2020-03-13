import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';

import TextForm from "library/components/TextInput";
import CustomText from "library/components/CustomText";

const screenWidth = Math.round(Dimensions.get('window').width);

class AccessEvent extends React.Component {
  state = {};
  componentDidMount(): void {}
  render() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={100} style={{flex: 1}} behavior="padding">
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={styles.mediaArea}>
            <CustomText label="Some image..." />
          </View>
          <View style={styles.textArea}>
            <CustomText title label="Access an existing event" />
            <CustomText label="Please enter a socialite key or scan a socialite code to access your event" />
          </View>
          <View style={styles.buttonArea}>
            <TextForm placeholder="Paste your key..." />
            <View style={{width: screenWidth * 0.8}}>
              <CustomText
                link
                onPress={() => this.props.navigation.navigate('SignIn')}
                label="Don't know your Socialite key?"
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

export default AccessEvent;