import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createRootNavigator} from './library/navigation/router';
import SplashScreen from './screens/onboarding/SplashScreen';
import authentication from './library/networking/authentication';
import auth from '@react-native-firebase/auth';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };
  }

  splashDelay = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 1500),
    );
  };

  async componentDidMount() {
    await this.splashDelay();
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
  }

  componentWillUnmount() {
    clearTimeout(this.splashDelay);
    this.subscriber();
  }

  render() {
    const {checkedSignIn, signedIn} = this.state;
    StatusBar.setBarStyle('dark-content', true);

    return (
      <NavigationContainer>
        {!checkedSignIn ? <SplashScreen /> : createRootNavigator(signedIn)}
      </NavigationContainer>
    );
  }
}
