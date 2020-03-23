import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screens from 'screens/screens';

const Stack = createStackNavigator();

export default function Onboarding() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        title: '',
        gestureEnabled: false,
        headerBackTitleVisible: false,
        cardStyle: {backgroundColor: '#FFFFFF'},
        headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0},
        headerLeftContainerStyle: {paddingLeft: 20},
        headerRightContainerStyle: {paddingRight: 20},
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
      <Stack.Screen name="GetCodes" component={screens.onboarding.GetCodes} />
      <Stack.Screen name="SignUp" component={screens.onboarding.SignUp} />
      <Stack.Screen name="UserName" component={screens.onboarding.UserName} />
      <Stack.Screen
        name="CreatePassword"
        component={screens.onboarding.CreatePassword}
      />
      <Stack.Screen
        name="EnterPassword"
        component={screens.onboarding.EnterPassword}
      />
      <Stack.Screen name="OAuth" component={screens.onboarding.OAuth} />
      <Stack.Screen
        name="PhoneAuth"
        component={screens.onboarding.PhoneAuthScreen}
      />
    </Stack.Navigator>
  );
}
