import React from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';

import Button from '../../library/components/General/Button';
import TextForm from '../../library/components/General/TextInput';
import CustomText from '../../library/components/General/CustomText';

import R from 'res/R';

const keyboardOffset = R.constants.screenHeight * 0.2;

class EventName extends React.Component {
  state = {
    name: '',
  };

  handleVerifyName = () => {
    if (this.state.name.length > 3) {
      this.props.navigation.navigate('EventType');
    } else {
      alert('Your event name is too short');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.textContainer, styles.titleContainer]}>
          <CustomText label="What's the name of your event?" subtitle />
        </View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={keyboardOffset}
          behavior="padding">
          <TextForm
            placeholder="Ex: Birthday party or Big 18"
            returnKeyType={'next'}
            value={this.state.name}
            onChangeText={name => {
              this.setState({name});
            }}
            onSubmitEditing={this.handleVerifyName}
          />
          <Button title="Next" dark onPress={this.handleVerifyName} />
        </KeyboardAvoidingView>

        <View style={styles.textContainer}>
          <CustomText
            label="By continuing, you’re agreeing to our Customer Terms of Service, Privacy Policy, and Cookie Policy."
            subtitle_3
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
  },
  titleContainer: {
    paddingBottom: '5%',
  },
  textContainer: {
    width: R.constants.screenWidth * 0.8,
    overflow: 'scroll',
  },
});

export default EventName;
