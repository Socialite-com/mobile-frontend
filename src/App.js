import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createRootNavigator} from './library/navigation/router';

import SplashScreen from 'react-native-splash-screen';
import SplashScreenComponent from './screens/onboarding/SplashScreen';
import stripe from 'tipsi-stripe';

import R from 'res/R';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import auth from '@react-native-firebase/auth';
import {login, saveUid} from './state/actions/users';
import {checkUserExists} from './state/actions/onboarding';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      delayedRemove: false,
    };
  }

  //to remove splash screen and allow touches
  splashDelay = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        this.setState({delayedRemove: true});
        resolve('result');
      }, 1750),
    );
  };

  async componentDidMount() {
    SplashScreen.hide();

    stripe.setOptions({
      publishableKey: R.keys.publishableKey,
      merchantId: R.keys.merchantId,
    });

    this.authListener = auth().onAuthStateChanged(user => {
      let result = false;
      if (user) {
        result = true; // user is logged in
        // save user id and check if user exists
        this.props.actions.saveUid(user.uid);
        this.props.actions.checkUserExists(user.uid).then(() => {
          this.props.actions.login(result);
        });
      } else {
        this.props.actions.login(result);
      }
    });

    await this.splashDelay();
  }

  componentWillUnmount() {
    clearTimeout(this.splashDelay);
    this.authListener();
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);
    const {checkedLoggedIn, loggedIn} = this.props.auth;
    return (
      <NavigationContainer>
        {!this.state.delayedRemove && (
          <SplashScreenComponent isReady={checkedLoggedIn} />
        )}

        {checkedLoggedIn && createRootNavigator(loggedIn)}
      </NavigationContainer>
    );
  }
}

const ActionCreators = {
  checkUserExists,
  saveUid,
  login,
};

const mapStateToProps = state => ({
  auth: state.authentication,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
