import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screens from 'screens/screens';
import R from 'res/R';

const Stack = createStackNavigator();

export default function UserOptions() {
  return (
    <Stack.Navigator
      initialRouteName="User"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: R.fonts.comfortaaRegular,
          color: R.color.secondary,
        },
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {paddingLeft: 20},
        headerRightContainerStyle: {paddingRight: 20},
        cardStyle: {backgroundColor: R.color.primary},
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: R.color.primaryDark,
        },
      }}>
      <Stack.Screen name="User" component={screens.user.Home} />
      <Stack.Screen name="Settings" component={screens.user.options.Settings} />
    </Stack.Navigator>
  );
}
