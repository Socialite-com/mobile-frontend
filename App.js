import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from "./screens/Onboarding";
import OAuth from "./screens/OAuth";
import Event from "./screens/Event";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="OAuth" component={OAuth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
