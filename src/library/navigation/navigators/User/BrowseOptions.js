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
          fontFamily: R.fonts.comfortaaRegular,
        },
        headerBackTitleVisible: false,
        cardStyle: {backgroundColor: '#FFFFFF'},
        headerLeftContainerStyle: {paddingLeft: 20},
        headerRightContainerStyle: {paddingRight: 20},
      }}>
      <Stack.Screen name="Browse" component={screens.user.Browse} />
    </Stack.Navigator>
  );
}
