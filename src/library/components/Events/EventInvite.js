import React from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import R from 'res/R';

import Button from '../General/Button';

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
      <Text style={{color: 'white'}}>{text}</Text>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    height: 200,
    backgroundColor: 'white',
    width: R.constants.screenWidth,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  countdown: {
    fontFamily: R.fonts.robotoBold,
    fontSize: 40,
    color: R.colors.secondary,
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

export const Invite = ({children, navigator, onConfirm}) => {
  return (
    <View style={styles.bottomView}>
      <View style={styles.card}>
        <View style={styles.toolbar}>
          <View style={styles.row}>
            <TouchableHighlight style={styles.profileImgContainer}>
              <Text />
            </TouchableHighlight>
            <View>
              <Text style={styles.organizer}>Marianopolis Student Union</Text>
              <Text style={styles.status}>Verified</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigator.pop()}
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <Icon name="close" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formView}>{children}</View>
      </View>
      <View style={styles.envelope}>
        <View>
          <Text style={styles.title}>MSU Party</Text>
          <Text style={styles.eventType}>Private • Paid</Text>
        </View>
        <Button title="Confirm" light half onPress={onConfirm} />
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
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    backgroundColor: R.colors.secondary,
    width: R.constants.screenWidth,
  },
  organizer: {
    fontFamily: R.fonts.comfortaaSemiBold,
    fontSize: 12,
  },
  status: {
    fontFamily: R.fonts.comfortaaLight,
    fontSize: 12,
  },
  envelope: {
    flex: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: R.constants.screenWidth,
    backgroundColor: R.colors.primary,
  },
  profileImgContainer: {
    height: 30,
    width: 30,
    marginRight: 10,
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 1,
  },
  infoBox: {
    marginTop: '3%',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontFamily: R.fonts.comfortaaBold,
    color: R.colors.secondary,
    fontSize: 20,
  },
  header: {
    fontFamily: R.fonts.robotoBold,
    textTransform: 'uppercase',
    fontSize: 13,
  },
  body: {
    fontFamily: R.fonts.comfortaaRegular,
    fontSize: 13,
  },
  eventType: {
    fontFamily: R.fonts.robotoLight,
    textTransform: 'uppercase',
    fontSize: 14,
    color: 'white',
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
