import React from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createRootNavigator} from './library/navigation/router';
import authentication from './library/networking/authentication';
import auth from '@react-native-firebase/auth';
import SplashScreenComponent from './screens/onboarding/SplashScreen';
import stripe from 'tipsi-stripe';

stripe.setOptions({
  publishableKey: 'pk_test_c2DloqNiEyFo4knCXInHJ7UH00eAJ2hTtH',
  merchantId: 'merchant.com.socialite',
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
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
    authentication
      .isSignedIn()
      .then(res => this.setState({signedIn: res, checkedSignIn: true}))
      .catch(err => alert(err));

    this.subscriber = auth().onAuthStateChanged(user => {
      if (user !== null) {
        console.log('Signed In');
        authentication
          .isSignedIn()
          .then(res => this.setState({signedIn: res, checkedSignIn: true}));
      }
    });
    await this.splashDelay();
  }

  componentWillUnmount() {
    clearTimeout(this.splashDelay);
    this.subscriber();
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);

    return (
      <NavigationContainer>
        {!this.state.delayedRemove && (
          <SplashScreenComponent isReady={this.state.checkedSignIn} />
        )}

        {this.state.checkedSignIn && createRootNavigator(this.state.signedIn)}
      </NavigationContainer>
    );
  }
}
