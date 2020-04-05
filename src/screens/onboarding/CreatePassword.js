import React from 'react';
import {StyleSheet, View} from 'react-native';

import db from 'library/networking/database';
import auth from 'library/networking/authentication';

import CustomText from 'library/components/General/CustomText';
import TextForm from 'library/components/General/TextInput';
import Button from 'library/components/General/Button';

import R from 'res/R';

class CreatePassword extends React.Component {
  state = {
    password: '',
    userId: '',
    phoneNumber: '',
  };

  _handlePassword() {
    // Add password restrictions
    const data = {
      userName: this.props.route.params.userName,
      password: this.state.password,
    };
    db.setupAccount(this.state.userId, data)
      .then(success => {
        console.log(success);
        auth.onSignIn(this.state.userId);
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'User'}],
        });
      })
      .catch(err => alert(err.message));
  }

  componentDidMount() {
    db.getUser()
      .then(user => {
        this.setState({
          userId: user.uid,
          phoneNumber: user.phoneNumber,
        });
      })
      .catch(err => alert(err));
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.textContainer}>
          <CustomText title label="Pick a password" />
          <CustomText
            label={`You'll use a phone number (${this.state.phoneNumber}) and a password to sign into Socialite`}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextForm
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => {
              this.setState({password});
            }}
          />
          <Button dark onPress={() => this._handlePassword()} title="Next" />
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
    width: R.constants.screenWidth * 0.8,
  },
  inputContainer: {
    flex: 3,
    marginTop: '5%',
    alignItems: 'center',
  },
});

export default CreatePassword;
