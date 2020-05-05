import React from 'react';
import {StyleSheet, View} from 'react-native';

import R from 'res/R';

class GuestList extends React.Component {
  state = {};
  componentDidMount(): void {}
  render() {
    return <View style={styles.mainView}></View>;
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
  },
});

export default GuestList;
