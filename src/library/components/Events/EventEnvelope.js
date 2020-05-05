import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import R from 'res/R';

const Envelope = (
  {
    // TODO Use redux to get props for this envelope component
    // TODO Add payment options on bottom right of envelope
  },
) => {
  return (
    <View style={styles.envelope}>
      <View>
        <Text style={styles.title}>MSU Party</Text>
        <Text style={styles.eventType}>Private • Paid</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  envelope: {
    paddingLeft: '5%',
    paddingRight: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: R.constants.screenWidth,
    backgroundColor: '#407eb4', // change to custom event color
    height: R.constants.screenHeight * 0.1,
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
});

export default Envelope;
