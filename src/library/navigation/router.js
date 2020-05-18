import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Onboarding from './navigators/Onboarding';
import CreateEvent from './navigators/CreateEvent';
import User from './navigators/User/User';
import ManageEvent from './navigators/ManageEvent';

const Root = createStackNavigator();

function createRootNavigator(signedIn) {
  return (
    <Root.Navigator
      initialRouteName={signedIn ? 'User' : 'Onboarding'}
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Root.Screen name="Onboarding" component={Onboarding} />
      <Root.Screen name="User" component={User} />
      <Root.Screen name="CreateEvent" component={CreateEvent} />
      <Root.Screen
        name="ManageEvent"
        component={ManageEvent}
        options={{...TransitionPresets.ModalTransition}}
      />
    </Root.Navigator>
  );
}

export {createRootNavigator};
