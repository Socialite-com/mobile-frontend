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

const TextForm = ({
  icon,
  empty,
  settings,
  searchbar,
  multiline,
  customStyle,
  ...restProps
}) => {
  let defaultStyle = [];
  defaultStyle = defaultStyle.concat(styles.defaultStyle);

  if (searchbar) {
    defaultStyle = defaultStyle.concat(styles.searchbar);
  }

  if (settings) {
    defaultStyle = defaultStyle.concat(styles.settings);
  }

  if (empty) {
    defaultStyle = defaultStyle.concat(styles.empty);
  }

  if (customStyle) {
    defaultStyle = defaultStyle.concat(customStyle);
  }

  return (
    <TextInput
      placeholderTextColor={R.color.tertiary}
      {...restProps}
      style={defaultStyle}
      multiline={multiline}
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
  empty: {
    margin: 0,
    padding: 0,
    fontSize: 16,
    width: '100%',
    height: '100%',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  settings: {
    height: 40,
    fontSize: 16,
    color: '#000',
    width: '100%',
    borderWidth: 0,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 0,
    backgroundColor: '#fff',
  },
  searchbar: {
    height: 35,
    color: '#fff',
    width: '100%',
    borderWidth: 0,
    borderRadius: 12,
    marginVertical: 5,
    marginHorizontal: 0,
    backgroundColor: '#393939',
  },
});

export default TextForm;
