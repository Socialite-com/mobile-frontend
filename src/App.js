import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createRootNavigator} from './library/navigation/router';
import SplashScreenComponent from './screens/onboarding/SplashScreen';
import auth from './library/networking/auth';

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
    auth
      .isSignedIn()
      .then(res => this.setState({signedIn: res, checkedSignIn: true}))
      .catch(err => alert(err));
    await this.splashDelay();
  }

  componentWillUnmount() {
    clearTimeout(this.splashDelay);
  }

  render() {
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