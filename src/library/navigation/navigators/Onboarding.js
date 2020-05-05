import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screens from 'screens/screens';
import R from 'res/R';

const Stack = createStackNavigator();

export default function Onboarding() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        title: '',
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {paddingLeft: 20},
        headerRightContainerStyle: {paddingRight: 20},
        cardStyle: {backgroundColor: R.color.primary},
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: R.color.primary,
        },
      }}>
      <Stack.Screen name="Landing" component={screens.onboarding.Landing} />
      <Stack.Screen
        name="AccessEvent"
        component={screens.onboarding.AccessEvent}
      />
      <Stack.Screen
        name="LinkRegister"
        component={screens.onboarding.LinkRegister}
      />
      <Stack.Screen name="GetCode" component={screens.onboarding.GetCode} />
      <Stack.Screen name="UserName" component={screens.onboarding.UserName} />
      <Stack.Screen
        name="PhoneAuth"
        component={screens.onboarding.PhoneAuthScreen}
      />
    </Stack.Navigator>
  );
}
