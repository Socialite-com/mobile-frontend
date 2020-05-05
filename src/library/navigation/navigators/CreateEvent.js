import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screens from 'screens/screens';
import R from 'res/R';

const Stack = createStackNavigator();

export default function CreateEvent() {
  return (
    <Stack.Navigator
      initialRouteName="EventType"
      screenOptions={{
        title: '',
        gestureEnabled: false,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {paddingLeft: 20},
        headerRightContainerStyle: {paddingRight: 20},
        cardStyle: {backgroundColor: R.color.primary},
      }}>
      <Stack.Screen name="EventName" component={screens.organizer.EventName} />
      <Stack.Screen name="EventType" component={screens.organizer.EventType} />
      <Stack.Screen name="EventTime" component={screens.organizer.EventTime} />
      <Stack.Screen
        name="EventLocation"
        component={screens.organizer.EventLocation}
      />
      {/* <Stack.Screen
        name="EventPrice"
        component={screens.organizer.EventPrice}
      /> */}
      {/* <Stack.Screen name="EventUsers" component={screens.organizer.EventUsers} /> */}
    </Stack.Navigator>
  );
}

//pass data to the end
