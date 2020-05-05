import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import R from 'res/R';

const height = 50;
const margin = 10;
const padding = 10;
const fontSize = 18;
const borderWidth = 1;
const borderRadius = 6;
const color = R.color.secondary;
const borderColor = R.color.secondary;
const backgroundColor = 'transparent';
const width = R.constants.screenWidth * 0.8;
const fontFamily = R.fonts.comfortaaRegular;

const TextForm = ({icon, searchbar, customStyle, ...restProps}) => {
  let defaultStyle = [];
  defaultStyle = defaultStyle.concat(styles.defaultStyle);

  if (searchbar) {
    defaultStyle = defaultStyle.concat(styles.searchbar);
  }

  if (customStyle) {
    defaultStyle = defaultStyle.concat(customStyle);
  }

  return (
    <TextInput
      placeholderTextColor={R.color.tertiary}
      {...restProps}
      style={defaultStyle}
    />
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor,
    borderRadius,
    borderColor,
    borderWidth,
    fontFamily,
    fontSize,
    padding,
    height,
    margin,
    width,
    color,
  },
  searchbar: {
    height: 35,
    color: '#fff',
    borderWidth: 0,
    borderRadius: 12,
    marginVertical: 5,
    marginHorizontal: 0,
    backgroundColor: '#393939',
    width: R.constants.screenWidth * 0.86,
  },
});

export default TextForm;
