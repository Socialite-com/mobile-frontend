import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';

import R from 'res/R';

const height = 50;
const padding = 10;
const margin = 10;
const width = R.constants.screenWidth * 0.9;
const backgroundColor = R.colors.primary;
const borderRadius = 6;
const color = R.colors.primary;

const Button = ({
  title,
  dark,
  light,
  grey,
  noBorder,
  half,
  customStyle,
  ...restProps
}) => {
  let inlineStyle = [];
  let textStyle = [];

  inlineStyle = inlineStyle.concat(style.defaultStyle);
  textStyle = textStyle.concat(style.defaultTextStyle);

  if (dark) {
    textStyle = textStyle.concat(style.lightText);
  }
  if (light) {
    inlineStyle = inlineStyle.concat(style.light);
  }
  if (grey) {
    inlineStyle = inlineStyle.concat(style.grey);
  }
  if (noBorder) {
    inlineStyle = inlineStyle.concat(style.noBorder);
  }
  if (half) {
    inlineStyle = inlineStyle.concat(style.half);
  }
  if (customStyle) {
    inlineStyle = inlineStyle.concat(customStyle);
  }

  return (
    <TouchableOpacity {...restProps}>
      <View style={inlineStyle}>
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  defaultStyle: {
    height,
    padding,
    margin,
    width,
    backgroundColor,
    borderRadius,
    borderColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultTextStyle: {
    fontFamily: R.fonts.robotoBlack,
    textTransform: 'uppercase',
    fontSize: 13,
    color,
  },
  lightText: {
    color: R.colors.secondary,
  },
  light: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  grey: {
    backgroundColor: '#DADADA',
  },
  noBorder: {
    borderWidth: 0,
  },
  half: {
    width: (R.constants.screenWidth * 0.85) / 2,
  },
});

export default Button;
