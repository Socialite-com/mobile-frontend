import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import screens from "screens/screens";

const Tab = createBottomTabNavigator();

export default function User() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: false,
        cardStyle: { backgroundColor: "#ffffff" }
      }}
    >
      <Tab.Screen name="Home" component={screens.user.Home} />
      <Tab.Screen name="Event" component={screens.user.Event} />
    </Tab.Navigator>
  );
}
