import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import R from 'res/R';

const Tab = createBottomTabNavigator();

import UserOptions from './UserOptions';
import BrowseOptions from './BrowseOptions';
import ActivityOptions from './ActivityOptions';

export default function User() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: R.color.secondary,
        inactiveTintColor: R.color.tertiary,
        style: {
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
          backgroundColor: R.color.primaryDark,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Browse') {
            iconName = 'search1';
          } else if (route.name === 'Activity') {
            iconName = 'bells';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        gestureEnabled: false,
        cardStyle: {backgroundColor: R.color.primary},
      })}>
      <Tab.Screen name="Browse" component={BrowseOptions} />
      <Tab.Screen name="Home" component={UserOptions} />
      <Tab.Screen name="Activity" component={ActivityOptions} />
    </Tab.Navigator>
  );
}
