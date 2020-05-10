import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import ProfileCircle from '../User/profileCircle';
import Icon from 'react-native-vector-icons/AntDesign';

import R from 'res/R';

export const Map = ({map}) => {
  return (
    <View style={cardStyles.card}>
      <Text>{map}</Text>
    </View>
  );
};

export const CountDown = ({timeLeft}) => {
  return (
    <View style={cardStyles.card}>
      <Text style={cardStyles.countdown}>{timeLeft}</Text>
    </View>
  );
};

export const Details = ({text}) => {
  return (
    <View style={cardStyles.card}>
      <Text style={{color: R.color.primary}}>{text}</Text>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    height: 200,
    backgroundColor: R.color.primary,
    width: R.constants.screenWidth,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  countdown: {
    fontFamily: R.fonts.robotoBold,
    color: R.color.secondary,
    fontSize: 40,
  },
});

export const Field = ({header, body, ...restprops}) => {
  return (
    <TouchableOpacity {...restprops}>
      <View style={styles.infoBox}>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Invite = ({children, data, navigator}) => {
  return (
    <View style={styles.bottomView}>
      <View style={styles.card}>
        <View style={styles.toolbar}>
          <View style={styles.row}>
            <ProfileCircle
              textStyle={styles.organizer}
              profile={data.creator}
              invite={true}
            />
            <TouchableOpacity
              onPress={() => navigator.pop()}
              style={{flex: 1, alignItems: 'flex-end'}}>
              <Icon name="close" color={R.color.secondary} size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formView}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    flex: 1,
    marginTop: -20,
    alignItems: 'center',
  },
  card: {
    flex: 4,
    padding: '5%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: R.constants.screenWidth,
    backgroundColor: R.color.primary,
  },
  organizer: {
    fontFamily: R.fonts.comfortaaSemiBold,
    color: R.color.secondary,
    fontSize: 13,
  },
  envelope: {
    flex: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: R.constants.screenWidth,
    backgroundColor: '#407eb4', // change to custom event color
  },
  infoBox: {
    marginTop: '3%',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    fontFamily: R.fonts.robotoBold,
    textTransform: 'uppercase',
    color: R.color.secondary,
    fontSize: 13,
  },
  body: {
    fontFamily: R.fonts.comfortaaRegular,
    color: R.color.secondary,
    fontSize: 13,
  },
  title: {
    fontFamily: R.fonts.comfortaaBold,
    color: 'white',
    fontSize: 20,
  },
  eventType: {
    fontFamily: R.fonts.robotoLight,
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 14,
  },
  toolbar: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(162,162,162,0.46)',
  },
  formView: {
    flex: 7,
  },
});
