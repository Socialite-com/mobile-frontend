import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


import Landing from "./screens/Landing";
import OAuth from "./screens/OAuth";
import phoneAuthentication from "./screens/PhoneAuthScreen";

import Home from "./screens/Home";
import Event from "./screens/Event";

import EventName from "./screens/EventName";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Root = createStackNavigator();


function Onboarding() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="OAuth" component={OAuth} />
      <Stack.Screen name="PhoneAuth" component={phoneAuthentication} />
    </Stack.Navigator>
  );
}

function User() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Event" component={Event} />
    </Tab.Navigator>
  );
}

function CreateEvent() {
  return (
    <Stack.Navigator initialRouteName="Event Name">
      <Stack.Screen name="Event Name" component={EventName} />
    </Stack.Navigator>
  )
}

function createRootNavigator(signedIn) {
  return (
    <Root.Navigator
      initialRouteName={signedIn ? "User" : "Onboarding"}
      screenOptions={{
        headerShown: false
      }}
    >
      <Root.Screen name="Onboarding" component={Onboarding}/>
      <Root.Screen name="User" component={User}/>
      <Root.Screen name="CreateEvent" component={CreateEvent}/>
    </Root.Navigator>
  )
}

export {createRootNavigator}
