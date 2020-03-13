import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createRootNavigator} from "./router";
import SplashScreen from "./screens/onboarding/SplashScreen";
import {isSignedIn} from "library/networking/auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  splashDelay = async() => {
    return new Promise((resolve) =>
      setTimeout(() => { resolve('result') }, 1500 )
    )
  };

  async componentDidMount() {
    await this.splashDelay();
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  componentWillUnmount(): void {
    clearTimeout(this.splashDelay);
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    return (
      <NavigationContainer>
        { !checkedSignIn ? <SplashScreen/> : createRootNavigator(signedIn) }
      </NavigationContainer>
    )
  }
}
