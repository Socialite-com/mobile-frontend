import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screens from 'screens/screens';

const Stack = createStackNavigator();

export default function CreateEvent() {
  return (
    <Stack.Navigator
      initialRouteName="EventName"
      screenOptions={{
        title: '',
        gestureEnabled: false,
        headerBackTitleVisible: false,
        cardStyle: {backgroundColor: '#FFFFFF'},
        headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0},
        headerLeftContainerStyle: {paddingLeft: 20},
        headerRightContainerStyle: {paddingRight: 20},
      }}>
      <Stack.Screen name="EventName" component={screens.organizer.EventName} />
      <Stack.Screen name="EventType" component={screens.organizer.EventType} />
      <Stack.Screen name="EventTime" component={screens.organizer.EventTime} />
      <Stack.Screen
        name="EventLocation"
        component={screens.organizer.EventLocation}
      />
      <Stack.Screen
        name="EventPrice"
        component={screens.organizer.EventPrice}
      />
      {/* <Stack.Screen name="EventUsers" component={screens.organizer.EventUsers} /> */}
      <Stack.Screen
        options={{headerShown: false}}
        name="EventPage"
        component={screens.organizer.EventPage}
      />
    </Stack.Navigator>
  );
}

//pass data to the end
