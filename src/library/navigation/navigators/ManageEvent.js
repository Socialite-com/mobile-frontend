import React from 'react';
import {View, Image, TouchableHighlight, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {
  setEventAction,
  setDefaultAction,
} from '../../../state/actions/eventPage';
import store from '../../../../index';

import R from 'res/R';
import screens from 'screens/screens';
import Envelope from '../../components/Events/EventEnvelope';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function ManageEvent() {
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
        }}>
        <Stack.Screen
          name="Event Page"
          options={{headerShown: false}}
          component={EventPage}
        />
        <Stack.Screen
          name="Edit Event"
          options={{headerLeft: null}}
          component={screens.events.manage.EditEvent}
        />
        <Stack.Screen
          name="Share Event"
          options={{headerLeft: null}}
          component={screens.events.manage.ShareEvent}
        />
      </Stack.Navigator>
      <Envelope navigation={useNavigation()} />
    </View>
  );
}

function EventPage() {
  return (
    <Tab.Navigator
      initialRouteName="EditEventPage"
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        activeTintColor: '#fff',
        inactiveTintColor: '#787878',
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

          if (route.name === 'Guests') {
            iconName = 'user';
          } else if (route.name === 'EditEventPage') {
            return (
              <TouchableHighlight style={styles.logoContainer}>
                <Image style={styles.logo} source={R.images.logo_dark} />
              </TouchableHighlight>
            );
          } else if (route.name === 'Manage') {
            iconName = 'th-list';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} color={color} size={25} />;
        },
        gestureEnabled: false,
        swipeEnabled: false,
        initialLayout: {height: R.constants.screenHeight * 0.9},
      })}>
      <Tab.Screen
        name="Guests"
        options={{tabBarLabel: 'Guests'}}
        component={screens.events.manage.InviteGuests}
        listeners={{
          focus: e => {
            store.dispatch(setEventAction('share'));
          },
        }}
      />
      <Tab.Screen
        name="EditEventPage"
        options={{tabBarLabel: ''}}
        component={screens.events.manage.EditEventPage}
        listeners={{
          focus: e => {
            const {data, type} = store.getState().eventPage;
            store.dispatch(setDefaultAction(type, data));
          },
        }}
      />
      <Tab.Screen
        name="Manage"
        options={{tabBarLabel: 'Manage'}}
        component={screens.events.manage.ManageEvent}
      />
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
