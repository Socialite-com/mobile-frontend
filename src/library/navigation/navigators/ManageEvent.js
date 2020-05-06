import React from 'react';
import {View, Image, TouchableHighlight, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import screens from 'screens/screens';

import R from 'res/R';
import Envelope from '../../components/Events/EventEnvelope';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator();

export default function ManageEvent() {
  return (
    <View style={{flex: 1}}>
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
        />
        <Tab.Screen
          name="EditEventPage"
          options={{tabBarLabel: ''}}
          component={screens.events.manage.EditEventPage}
        />
        <Tab.Screen
          name="Manage"
          options={{tabBarLabel: 'Manage'}}
          component={screens.events.manage.ManageEvent}
        />
      </Tab.Navigator>
      <Envelope />
    </View>
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
