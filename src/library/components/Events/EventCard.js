import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';

import CacheImage from '../General/CacheImage';
import ProfileCircle from '../User/profileCircle';
import {invertColor} from '../../networking/qrGen';

import R from 'res/R';

const EventCard = ({data, small, ...children}) => {
  const item = data.details;
  const user = data.creator;

  const textColor = invertColor(item.backgroundColor, true);
  let logoImg = R.images.logo_white;
  let cardHeight = 300;
  let sizing = 1;

  if (textColor === '#000000') {
    logoImg = R.images.logo_dark;
  } else if (textColor === '#ffffff') {
    logoImg = R.images.logo_white;
  }

  if (small) {
    cardHeight = 270;
    sizing = 0.9;
  }

  const styles = StyleSheet.create({
    eventContainer: {
      height: cardHeight,
      padding: 0,
      width: '100%',
      marginTop: 6,
      elevation: 4,
      borderRadius: 6,
      shadowRadius: 2,
      shadowOpacity: 0.4,
      marginBottom: 10,
      shadowColor: '#000000',
      backgroundColor: item.backgroundColor,
      shadowOffset: {width: 0, height: -0.25},
      transform: [{rotateX: '-5deg'}, {perspective: 50}],
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: '2.5%',
      paddingHorizontal: '3%',
    },
    eventTitle: {
      fontFamily: R.fonts.comfortaaBold,
      color: textColor,
      marginBottom: '1%',
      flexWrap: 'wrap',
      fontSize: 15 * sizing,
    },
    organizer: {
      color: textColor,
      fontFamily: R.fonts.comfortaaMedium,
      fontSize: 12 * sizing,
    },
    rsvp: {
      color: textColor,
      fontFamily: R.fonts.robotoBlack,
      fontSize: 14 * sizing,
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      borderTopRightRadius: 6,
      borderTopLeftRadius: 6,
    },
    logoImage: {
      height: 20,
      width: 20,
      resizeMode: 'contain',
    },
    logoText: {
      fontFamily: R.fonts.comfortaaSemiBold,
      color: textColor,
      fontSize: 24 * sizing,
    },
    cardImage: {
      flex: 1,
      width: '100%',
      resizeMode: 'cover',
    },
    row: {
      flexDirection: 'row',
    },
  });

  return (
    <View style={styles.eventContainer}>
      <View style={{flex: 4}}>
        <CacheImage
          background={true}
          uri={item.backgroundImage}
          style={{width: '100%', height: '100%'}}
          imageStyle={styles.backgroundImage}>
          <View
            style={{
              padding: '3%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <ProfileCircle textStyle={styles.organizer} card profile={user} />
            <Image source={logoImg} style={styles.logoImage} />
          </View>
        </CacheImage>
      </View>
      <View style={styles.textContainer}>
        <View
          style={{flex: 3, flexWrap: 'wrap', justifyContent: 'space-around'}}>
          <Text style={styles.organizer}>
            {item.startTime.toDate().toDateString()}
          </Text>
          <Text style={styles.logoText}>{item.title}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'flex-end',
          }}>
          <Text style={styles.organizer}>
            {item.private ? 'private' : 'public'}
            {item.paid ? ' • paid' : null}
          </Text>
          <Text style={styles.logoText}>18</Text>
        </View>
      </View>
    </View>
  );
};

export default EventCard;
