import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import R from 'res/R';

import CacheImage from '../General/CacheImage';
import CustomText from '../General/CustomText';

const width = 80;
const height = 80;
const borderRadius = 40;
const alignItems = 'center';
const justifyContent = 'center';
const backgroundColor = R.color.secondary;

const ProfileCircle = ({profile, main, card, invite, guestList, textStyle}) => {
  let displayName = false;
  let profileContainer = [];
  let nameStyle = [];
  let nameSize = 16;
  profileContainer = profileContainer.concat(styles.defaultStyle);

  if (main) {
    nameSize = 42;
    profileContainer = profileContainer.concat(styles.mainProfile);
  } else if (card) {
    nameSize = 16;
    displayName = true;
    profileContainer = profileContainer.concat(styles.cardProfile);
  } else if (invite) {
    nameSize = 20;
    profileContainer = profileContainer.concat(styles.inviteProfile);
  }

  if (textStyle) {
    nameStyle = nameStyle.concat(textStyle);
  }

  const mainHighlight = (
    <TouchableHighlight style={profileContainer}>
      {profile.profilePicture ? (
        <CacheImage
          uri={profile.profilePicture}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 40,
          }}
        />
      ) : (
        <CustomText
          splash
          center
          customStyle={{fontSize: nameSize}}
          label={profile.userName.charAt(0).toUpperCase()}
        />
      )}
    </TouchableHighlight>
  );

  const textView = (
    <View style={{justifyContent: 'center'}}>
      <Text style={nameStyle}>{profile.userName}</Text>
      <Text style={styles.status}>
        {profile.verified ? 'Verified' : 'Unverified'}
      </Text>
    </View>
  );

  if (main) return mainHighlight;
  else {
    return (
      <TouchableOpacity style={styles.row}>
        {mainHighlight}
        {displayName ? (
          <View style={{justifyContent: 'center'}}>
            <Text style={nameStyle}>{profile.userName}</Text>
          </View>
        ) : invite ? (
          textView
        ) : null}
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  defaultStyle: {
    width,
    height,
    alignItems,
    borderRadius,
    justifyContent,
    backgroundColor,
  },
  row: {
    flexDirection: 'row',
  },
  mainProfile: {
    marginBottom: 15,
  },
  cardProfile: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  inviteProfile: {
    width: 35,
    height: 35,
    borderWidth: 1,
    marginRight: 10,
    borderColor: R.color.secondary,
  },
  status: {
    fontFamily: R.fonts.comfortaaLight,
    color: R.color.secondary,
    fontSize: 12,
  },
});

export default ProfileCircle;
