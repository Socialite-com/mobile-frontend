import React from 'react';
import {View, Image, TouchableHighlight, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import screens from 'screens/screens';

import R from 'res/R';
import Envelope from '../../components/Events/EventEnvelope';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function ViewEvent() {
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator
        mode="modal"
        initialRouteName="Event Page"
        screenOptions={{
          headerTitleStyle: {
            color: R.color.secondary,
            fontFamily: R.fonts.comfortaaRegular,
          },
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {paddingLeft: 20},
          headerRightContainerStyle: {paddingRight: 20},
          cardStyle: {backgroundColor: R.color.primary},
        }}>
        <Stack.Screen
          name="Event Page"
          options={{headerShown: false}}
          component={EventPage}
        />
        <Stack.Screen
          name="Payment"
          options={{headerLeft: null}}
          component={screens.events.view.Payment}
        />
      </Stack.Navigator>
      <Envelope navigation={useNavigation()} />
    </View>
  );
}

function EventPage() {
  return (
    <Tab.Navigator
      initialRouteName="EventPage"
      tabBarOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: '#787878',
        showLabel: true,
        showIcon: true,
        renderIndicator: () => null,
        labelStyle: {
          fontFamily: R.fonts.robotoBold,
          textTransform: 'capitalize',
          fontSize: 14,
        },
        style: styles.tabStyle,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'GuestList') {
            iconName = 'user';
          } else if (route.name === 'EventPage') {
            return (
              <TouchableHighlight style={styles.logoContainer}>
                <Image style={styles.logo} source={R.images.logo_dark} />
              </TouchableHighlight>
            );
          } else if (route.name === 'Discover') {
            iconName = 'th-list';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} color={color} size={25} />;
        },
        gestureEnabled: false,
        swipeEnabled: false,
        cardStyle: {backgroundColor: R.color.primary},
      })}>
      <Tab.Screen
        name="GuestList"
        options={{tabBarLabel: 'Guests'}}
        component={screens.events.view.GuestList}
      />
      <Tab.Screen
        name="EventPage"
        options={{tabBarLabel: ''}}
        component={screens.events.view.EventPage}
      />
      <Tab.Screen name="Discover" component={screens.events.view.Discover} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    marginTop: R.constants.screenHeight * 0.045,
    backgroundColor: 'transparent',
    position: 'absolute',
    height: 70,
    right: 0,
    left: 0,
    top: 0,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: -5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});
