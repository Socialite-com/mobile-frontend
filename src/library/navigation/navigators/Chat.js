import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screens from 'screens/screens';
import R from 'res/R';

const Stack = createStackNavigator();

export default function Chat() {
  return (
    <Stack.Navigator
      initialRouteName="SelectChat"
      screenOptions={{
        title: 'Chats',
        gestureEnabled: true,
        headerBackTitleVisible: true,
        headerStyle: {
          backgroundColor: '#1a1a1a',
          borderBottomWidth: 0,
          shadowColor: 'transparent',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="SelectChat" component={screens.chat.SelectChat} />
      <Stack.Screen name="Chat" component={screens.chat.Chat} />
    </Stack.Navigator>
  );
}

//back button and complications
