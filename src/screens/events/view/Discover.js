import React from 'react';
import {StyleSheet, View} from 'react-native';

import R from 'res/R';

class Discover extends React.Component {
  state = {};
  render() {
    return <View style={styles.mainView} />;
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
  },
});

export default Discover;
