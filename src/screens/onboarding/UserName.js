import React from 'react';
import {StyleSheet, View} from 'react-native';

import CustomText from 'library/components/General/CustomText';
import TextForm from 'library/components/General/TextInput';
import Button from 'library/components/General/Button';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from '../../state/actions/users';
import {setValue, createUserAccount} from '../../state/actions/onboarding';
import {CREATE_USERNAME} from '../../state/constants';

import R from 'res/R';

class UserName extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.textContainer}>
          <CustomText title label="Pick a username" />
          <CustomText label="Your username is how you'll appear to other people at your events, pick something others will recognize." />
        </View>
        <View style={styles.inputContainer}>
          <TextForm
            value={this.props.onBoarding.userDetails.profile.userName}
            onChangeText={username =>
              this.props.setValue(CREATE_USERNAME, username)
            }
          />
          <Button
            onPress={() =>
              this.props.createAccount().then(() => {
                if (this.props.onBoarding.userDetails.error === null) {
                  this.props.navigation.navigate('User');
                }
              })
            }
            title="Next"
          />
          <CustomText error label={this.props.onBoarding.userDetails.error} />
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

const mapStateToProps = state => ({
  onBoarding: state.onBoarding,
});

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch),
  setValue: bindActionCreators(setValue, dispatch),
  createAccount: bindActionCreators(createUserAccount, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserName);
