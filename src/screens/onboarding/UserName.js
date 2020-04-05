import React from 'react';
import {StyleSheet, View} from 'react-native';

import CustomText from 'library/components/General/CustomText';
import TextForm from 'library/components/General/TextInput';
import Button from 'library/components/General/Button';

import R from 'res/R';

class UserName extends React.Component {
  state = {
    username: '',
    error: '',
  };

  _handleUserName() {
    // Add username restrictions
    if (this.state.username === '') {
      this.setState({error: "Username can't be blank!"});
    } else {
      this.props.navigation.navigate('CreatePassword', {
        userName: this.state.username,
      });
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.textContainer}>
          <CustomText title label="Pick a username" />
          <CustomText label="Your username is how you'll appear to other people at your events, pick something others will recognize." />
        </View>
        <View style={styles.inputContainer}>
          <TextForm
            value={this.state.username}
            onChangeText={username => {
              this.setState({username});
            }}
          />
          <Button dark onPress={() => this._handleUserName()} title="Next" />
          <CustomText error label={this.state.error} />
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

export default UserName;
