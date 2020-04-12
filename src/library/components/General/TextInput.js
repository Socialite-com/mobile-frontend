import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import R from 'res/R';

const height = 50;
const padding = 10;
const margin = 10;
const width = R.constants.screenWidth * 0.8;
const backgroundColor = 'transparent';
const borderWidth = 1;
const borderRadius = 6;
const fontFamily = R.fonts.comfortaaRegular;
const fontSize = 18;

const TextForm = ({icon, ...restProps}) => {
  let defaultStyle = [];
  defaultStyle = defaultStyle.concat(styles.defaultStyle);

  return (
    <View>
      <TextInput {...restProps} style={defaultStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    height,
    padding,
    margin,
    width,
    backgroundColor,
    borderRadius,
    borderWidth,
    fontFamily,
    fontSize,
  },
});

export default TextForm;
