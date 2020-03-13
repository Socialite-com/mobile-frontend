import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


import Landing from "./screens/onboarding/Landing";
import OAuth from "./screens/onboarding/OAuth";
import phoneAuthentication from "./screens/onboarding/PhoneAuthScreen";
import AccessEvent from "./screens/onboarding/AccessEvent";
import SignIn from "./screens/onboarding/SignIn";

import Home from "./screens/user/Home";
import Event from "./screens/user/Event";

import EventName from "./screens/organizer/EventName";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Root = createStackNavigator();


function Onboarding() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        title: "",
        cardStyle: { backgroundColor: "#FFFFFF" },
        headerStyle: { elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 }
      }}
    >
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="AccessEvent" component={AccessEvent} />
      <Stack.Screen name="SignIn" component={SignIn} />
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
