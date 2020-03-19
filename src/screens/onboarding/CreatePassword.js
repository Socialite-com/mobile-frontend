import React from 'react';
import { StyleSheet, View } from 'react-native';

import { getUser, setupAccount } from "library/networking/database";
import { onSignIn } from "library/networking/auth";

import CustomText from "library/components/CustomText";
import TextForm from "library/components/TextInput";
import Button from "library/components/Button";

import R from "res/R";

class CreatePassword extends React.Component {
  state = {
    password: "",
    userId: "",
    phoneNumber: ""
  };

  async _handlePassword() {
    // Add password restrictions
    const data = { userName: this.props.route.params.userName, password: this.state.password };
    await setupAccount(this.state.userId, data);
    onSignIn(this.state.userId);
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: this.props.route.params.finalRoute }],
    });
  }

  async componentDidMount() {
    let user = await getUser();
    this.setState({
      userId: user.uid,
      phoneNumber: user.phoneNumber
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.textContainer}>
          <CustomText title label="Pick a password" />
          <CustomText label={`You'll use a phone number (${(this.state.phoneNumber)}) and a password to sign into Socialite`} />
        </View>
        <View style={styles.inputContainer}>
          <TextForm
            value={this.state.password}
            onChangeText={password => { this.setState({ password }) }}
            autoFocus
          />
          <Button dark onPress={ () => this._handlePassword() } title="Next" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    marginLeft: '10%',
    justifyContent: 'flex-end',
    width: R.constants.screenWidth * 0.8
  },
  inputContainer: {
    flex: 3,
    marginTop: '5%',
    alignItems: 'center'
  }
});

export default CreatePassword;
