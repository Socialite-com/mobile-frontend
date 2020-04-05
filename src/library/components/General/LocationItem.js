import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import CustomText from './CustomText';

class LocationItem extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <CustomText label={this.props.description} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '95%',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 6,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
  },
});

export default LocationItem;
