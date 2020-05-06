import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screens from 'screens/screens';
import R from 'res/R';

const Stack = createStackNavigator();

export default function BrowseOptions() {
  return (
    <Stack.Navigator
      initialRouteName="Browse"
      screenOptions={{
        headerTitleStyle: {
          color: R.color.secondary,
          fontFamily: R.fonts.comfortaaRegular,
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
      <Stack.Screen name="Browse" component={screens.user.Browse} />
    </Stack.Navigator>
  );
}
