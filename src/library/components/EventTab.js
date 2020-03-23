import React from 'react';
import {
  TouchableHighlight,
  StyleSheet,

  View,
  Text,
  Image
} from 'react-native';

import R from "res/R";



export function createEventTab(item, index) {
  return (
    <View style={styles.eventContainer} key={index}>
      <TouchableHighlight style={styles.imageContainer}>
        <Image style={styles.image} source={R.images.logo_white} />
      </TouchableHighlight>
      <View style={styles.eventInfo}>
        <Text style={styles.eventTime}>{item.eventTime}</Text>
        <Text style={styles.eventName}>{item.eventName}</Text>
        <Text style={styles.eventType}>{item.privacy} event organized by {item.organizer}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  eventContainer: {
    height: 100,
    marginBottom: '5%',
    width: R.constants.screenWidth * 0.8,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: R.colors.tertiary
  },
  eventInfo: {
    width: 'auto',
    height: 100,
    paddingTop: '1.5%',
    paddingLeft: '4%',
    flexShrink: 1
  },
  imageContainer: {
    height: 80,
    width: 80,
    borderRadius: 6,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  eventTime: {
    fontFamily: R.fonts.robotoBlack,
    textTransform: 'uppercase',
    fontSize: 12
  },
  eventName: {
    fontFamily: R.fonts.comfortaaBold,
    marginTop: '1%',
    fontSize: 16
  },
  eventType: {
    fontFamily: R.fonts.comfortaaRegular,
    marginTop: '2%',
    fontSize: 13
  }
});
