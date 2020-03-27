import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createRootNavigator} from './library/navigation/router';
import SplashScreen from './screens/onboarding/SplashScreen';
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

  splashDelay = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        this.setState({delayedRemove: true});
        resolve('result');
      }, 750),
    );
  };

  async componentDidMount() {
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
          <SplashScreen isReady={this.state.checkedSignIn} />
        )}

        {this.state.checkedSignIn && createRootNavigator(this.state.signedIn)}
      </NavigationContainer>
    );
  }
}
