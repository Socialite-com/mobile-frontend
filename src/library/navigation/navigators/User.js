import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import screens from 'screens/screens';

const Tab = createBottomTabNavigator();

import UserOptions from './UserOptions';

export default function User() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: false,
        cardStyle: {backgroundColor: '#ffffff'},
      }}>
      <Tab.Screen name="Browse" component={screens.user.Browse} />
      <Tab.Screen name="Home" component={UserOptions} />
    </Tab.Navigator>
  );
}
