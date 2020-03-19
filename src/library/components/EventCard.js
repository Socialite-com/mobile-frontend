import React from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground
} from 'react-native';

import R from "res/R";

export function createEventCard(item, index) {

  const eventContainer = {
    borderRadius: 6,
    backgroundColor: item.color,
    marginBottom: -170,
    width: '100%',
    height: 250,
  };

  const textContainer = {
    flex: 1,
    width: '100%',
    padding: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  };

  const cardBody = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardFooter = {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: '7%',
    padding: '4%'
  };

  return (
    <View style={eventContainer} key={index}>
      <ImageBackground source={item.imageIcon} imageStyle={styles.backgroundImage} style={{width: '100%', height: '100%'}}>
      <View style={textContainer}>
        <View style={{flex: 1, flexShrink: 1}}>
          <Text style={styles.eventTitle}>{item.eventName}</Text>
          <Text style={styles.organizer}>{item.privacy}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={styles.rsvp}>RSVP</Text>
        </View>
      </View>
      <View style={cardBody}>
        <Image style={styles.logoImage} source={R.images.logo_white}/>
        <Text style={styles.logoText}>Socialite</Text>
      </View>
      <View style={cardFooter}>
        <View style={styles.row}>
          <TouchableHighlight style={styles.profileImgContainer}>
            <Text/>
          </TouchableHighlight>
          <Text style={styles.organizer}>{item.organizer}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          {/*<TouchableHighlight style={styles.qrContainer}>*/}
            <Image style={styles.qrCode} source={item.qrCode} />
          {/*</TouchableHighlight>*/}
        </View>
      </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  eventTitle: {
    color: R.colors.secondary,
    fontFamily: R.fonts.comfortaaBold,
    flexWrap: 'wrap',
    marginBottom: "1%",
    fontSize: 15
  },
  organizer: {
    color: R.colors.secondary,
    fontFamily: R.fonts.comfortaaMedium,
    fontSize: 12
  },
  rsvp: {
    color: R.colors.secondary,
    fontFamily: R.fonts.robotoBlack,
    fontSize: 14
  },
  profileImgContainer: {
    height: 25,
    width: 25,
    marginRight: 10,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 1
  },
  backgroundImage: {
    borderRadius: 6,
    opacity: 0.7
  },
  logoImage: {
    height: 25,
    width: 25,
    marginRight: 10,
    resizeMode: 'contain'
  },
  logoText: {
    fontFamily: R.fonts.comfortaaRegular,
    color: R.colors.secondary,
    fontSize: 24
  },
  cardImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover'
  },
  qrContainer: {
    height: 75,
    width: 75,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  qrCode: {
    height: 70,
    width: 70,
    borderRadius: 6
  },
  row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  }
});
