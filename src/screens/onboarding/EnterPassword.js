import React from 'react';
import { StyleSheet, View } from 'react-native';

import db from "library/networking/database";
import auth from "library/networking/auth";

import CustomText from "library/components/CustomText";
import TextForm from "library/components/TextInput";
import Button from "library/components/Button";

import R from "res/R";

class EnterPassword extends React.Component {
  state = {
    password: "",
    truePassword: "",
    userId: "",
  };

  _handlePassword() {
    if (this.state.password === this.state.truePassword) {
      auth.onSignIn(this.state.userId);
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: this.props.route.params.finalRoute }],
      });
    } else {
      alert("Wrong Password")
    }
  }

  componentDidMount() {
    db.getUser().then(user => {
      db.getProfileData(user.uid).then(data => {
        this.setState({
          userId: user.uid,
          userName: data.userName,
          truePassword: data.password
        })
      }).catch(err => alert(err))
    }).catch(err => alert(err))
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.textContainer}>
          <CustomText title label={`Welcome back ${this.state.userName}!`} />
          <CustomText label="Please enter your password to access your Socialite account" />
        </View>
        <View style={styles.inputContainer}>
          <TextForm
            value={this.state.password}
            onChangeText={password => { this.setState({ password }) }}
            autoFocus
          />
          <Button dark onPress={ () => this._handlePassword() } title="Sign In" />
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

export default EnterPassword;
