import React from 'react';
import {StyleSheet, View} from 'react-native';

import CustomText from 'library/components/General/CustomText';
import Button from 'library/components/General/Button';
import EventCard from 'library/components/Events/EventCard';

import AsyncStorage from '@react-native-community/async-storage';
import db from '../../library/networking/database';

import R from 'res/R';

class GetCode extends React.Component {
  state = {
    invite: {},
    eventKey: '',
    checkedCodes: false,
    foundCodes: false,
  };

  componentDidMount() {
    this._handleVerifyCode();
  }

  _handleVerifyCode = () => {
    const {eventKey} = this.props.route.params;
    db.getEventData(eventKey)
      .then(invite => db.parseEventData([invite]))
      .then(inviteData => {
        this.setState({
          eventKey: eventKey,
          invite: inviteData[0],
          checkedCodes: true,
          foundCodes: true,
        });
      })
      .catch(() => {
        this.setState({
          checkedCodes: true,
          foundCodes: false,
        });
      });
  };

  _handleOnCodeFound = () => {
    const eid = this.state.eventKey;
    AsyncStorage.setItem('newInvite', eid).then(() =>
      this.props.navigation.navigate('PhoneAuth', {option: 'signUp'}),
    );
  };

  _renderSearchingView = () => {
    return (
      <>
        <View style={styles.textContainer}>
          <CustomText title label="Searching for your Socialite codes" />
          <CustomText label="This may take a few seconds" />
        </View>
        <View style={styles.mediaContainer}>
          <CustomText label="Some searching animation" />
        </View>
      </>
    );
  };

  _renderFoundCodeView = () => {
    return (
      <>
        <View style={styles.textContainer}>
          <CustomText title label="Hurrah! We found the following invitation" />
          <CustomText label="Let's edit your profile so people can identify you on Socialite" />
        </View>
        <View style={styles.mediaContainer}>
          <EventCard item={this.state.invite} small />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            dark
            onPress={() => this._handleOnCodeFound()}
            title="Continue"
          />
        </View>
      </>
    );
  };

  _renderNoneFoundView = () => {
    const {origin} = this.props.route.params;
    return (
      <>
        <View style={styles.textContainer}>
          <CustomText
            title
            label="Sorry, we couldn't find any Socialite event linked to that code"
          />
          <CustomText label={R.strings.onboarding.getCode[origin]} />
        </View>
        <View style={styles.mediaContainer}>
          <CustomText label="Some error animation" />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            dark
            onPress={() => this.props.navigation.navigate('LinkRegister')}
            title="Search again"
          />
        </View>
      </>
    );
  };

  render() {
    const {foundCodes, checkedCodes} = this.state;
    return (
      <View style={styles.mainContainer}>
        {!checkedCodes
          ? this._renderSearchingView()
          : !foundCodes
          ? this._renderNoneFoundView()
          : this._renderFoundCodeView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
    width: R.constants.screenWidth * 0.8,
  },
  mediaContainer: {
    flex: 4,
    width: R.constants.screenWidth * 0.8,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '5%',
  },
});

export default GetCode;
