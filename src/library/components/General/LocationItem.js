import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import R from 'res/R';

import CustomText from './CustomText';

class LocationItem extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <CustomText
          customStyle={{fontSize: 14}}
          label={this.props.description}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: R.constants.screenWidth * 0.8,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 6,
    padding: 5,
    margin: 5,
    justifyContent: 'center',
  },
});

export default LocationItem;
