import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import screens from "screens/screens";

const Stack = createStackNavigator();

export default function CreateEvent() {
  return (
    <Stack.Navigator initialRouteName="Event Name">
      <Stack.Screen name="Event Name" component={screens.organizer.EventName} />
    </Stack.Navigator>
  )
}