import React, {useRef} from 'react';
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {invertColor} from '../networking/qrGen';

import R from 'res/R';

const screenHeight = Math.round(Dimensions.get('window').height);

const fadeOut = {
  0: {
    marginTop: 0,
  },
  1: {
    marginTop: screenHeight,
  },
};

export function createEventCard(item, index) {
  const organizer = item.userName;
  const textColor = invertColor(item.backgroundColor, true);
  var logoImg = R.images.logo_white;
  let cardView = null; //cardview ref

  function handlePress() {
    cardView.animate(fadeOut, 500);
  }

  if (textColor === '#000000') {
    logoImg = R.images.logo_dark;
  } else if (textColor === '#ffffff') {
    logoImg = R.images.logo_white;
  }

  const styles = StyleSheet.create({
    eventContainer: {
      position: 'absolute',
      top: 65 * index,
      height: 250,
      width: '100%',
      marginTop: 0,
      elevation: 4,
      borderRadius: 6,
      shadowRadius: 20,
      shadowOpacity: 0.4,
      marginBottom: -176,
      shadowColor: textColor,
      backgroundColor: item.backgroundColor,
      shadowOffset: {width: 0, height: -0.25},
      transform: [{rotateX: '-5deg'}, {perspective: 50}],
    },
    textContainer: {
      flex: 1,
      width: '100%',
      padding: '5%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    eventTitle: {
      color: textColor,
      fontFamily: R.fonts.comfortaaBold,
      flexWrap: 'wrap',
      marginBottom: '1%',
      fontSize: 15,
    },
    organizer: {
      color: textColor,
      fontFamily: R.fonts.comfortaaMedium,
      fontSize: 12,
    },
    rsvp: {
      color: textColor,
      fontFamily: R.fonts.robotoBlack,
      fontSize: 14,
    },
    cardBody: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardFooter: {
      flex: 1,
      alignItems: 'flex-end',
      flexDirection: 'row',
      paddingBottom: '7%',
      padding: '4%',
    },
    profileImgContainer: {
      height: 25,
      width: 25,
      marginRight: 10,
      borderRadius: 40,
      borderColor: textColor,
      borderWidth: 1,
    },
    backgroundImage: {
      borderRadius: 6,
      opacity: 0.7,
    },
    logoImage: {
      height: 25,
      width: 25,
      marginRight: 10,
      resizeMode: 'contain',
    },
    logoText: {
      fontFamily: R.fonts.comfortaaRegular,
      color: textColor,
      fontSize: 24,
    },
    cardImage: {
      flex: 1,
      width: '100%',
      resizeMode: 'cover',
    },
    qrContainer: {
      height: 75,
      width: 75,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
    },
    qrCode: {
      height: 70,
      width: 70,
      borderRadius: 6,
    },
    row: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
    },
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress} key={index}>
      <Animatable.View
        style={styles.eventContainer}
        // easing="ease-in-out-cubic" // for diffrent time of easing
        ref={ref => (cardView = ref)}>
        <ImageBackground
          source={{uri: item.backgroundImage}}
          imageStyle={styles.backgroundImage}
          style={{width: '100%', height: '100%'}}>
          <View style={styles.textContainer}>
            <View style={{flex: 1, flexShrink: 1}}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.organizer}>{item.type}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={styles.rsvp}>RSVP</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <Image style={styles.logoImage} source={logoImg} />
            <Text style={styles.logoText}>Socialite</Text>
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.row}>
              <TouchableHighlight style={styles.profileImgContainer}>
                <Text />
              </TouchableHighlight>
              <Text style={styles.organizer}>{organizer}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              {/*<TouchableHighlight style={styles.qrContainer}>*/}
              <Image style={styles.qrCode} source={{uri: item.qrCode}} />
              {/*</TouchableHighlight>*/}
            </View>
          </View>
        </ImageBackground>
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
}
