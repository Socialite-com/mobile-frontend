import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Onboarding from './navigators/Onboarding';
import CreateEvent from './navigators/CreateEvent';
import User from './navigators/User';

const Root = createStackNavigator();

function createRootNavigator(signedIn) {
  return (
    <Root.Navigator
      initialRouteName={signedIn ? 'User' : 'Onboarding'}
      screenOptions={{headerShown: false}}>
      <Root.Screen name="Onboarding" component={Onboarding} />
      <Root.Screen name="User" component={User} />
      <Root.Screen name="CreateEvent" component={CreateEvent} />
    </Root.Navigator>
  );
}

export {createRootNavigator};
