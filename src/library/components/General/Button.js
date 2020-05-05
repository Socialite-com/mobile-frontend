import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';

import R from 'res/R';

const height = 50;
const margin = 10;
const padding = 10;
const shadowRadius = 2;
const borderRadius = 6;
const shadowOpacity = 0.5;
const alignItems = 'center';
const color = R.color.primary;
const justifyContent = 'center';
const shadowOffset = {height: 0.2};
const shadowColor = R.color.secondary;
const borderColor = R.color.secondary;
const backgroundColor = R.color.secondary;
const width = R.constants.screenWidth * 0.8;

const Button = ({
  children,
  title,
  swap,
  grey,
  round,
  long,
  noBorder,
  half,
  icon,
  customStyle,
  ...restProps
}) => {
  let inlineStyle = [];
  let textStyle = [];

  inlineStyle = inlineStyle.concat(style.defaultStyle);
  textStyle = textStyle.concat(style.defaultTextStyle);

  if (swap) {
    textStyle = textStyle.concat({color: R.color.secondary});
    inlineStyle = inlineStyle.concat(style.swap);
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
  if (round) {
    inlineStyle = inlineStyle.concat(style.round);
  }
  if (long) {
    inlineStyle = inlineStyle.concat(style.long);
    textStyle = textStyle.concat({fontSize: 11});
  }
  if (icon) {
    textStyle = textStyle.concat({height: 0});
  }
  if (customStyle) {
    inlineStyle = inlineStyle.concat(customStyle);
  }

  return (
    <TouchableOpacity {...restProps}>
      <View style={inlineStyle}>
        {children}
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  defaultStyle: {
    width,
    height,
    margin,
    padding,
    alignItems,
    borderColor,
    shadowColor,
    shadowRadius,
    shadowOffset,
    borderRadius,
    shadowOpacity,
    justifyContent,
    backgroundColor,
  },
  defaultTextStyle: {
    fontFamily: R.fonts.robotoBlack,
    textTransform: 'uppercase',
    fontSize: 13,
    color,
  },
  round: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  swap: {
    backgroundColor: R.color.primaryDark,
    borderWidth: 1,
  },
  grey: {
    backgroundColor: '#DADADA',
  },
  noBorder: {
    borderWidth: 0,
  },
  long: {
    width: R.constants.screenWidth * 0.85,
    height: 30,
    marginTop: 10,
  },
  half: {
    width: (R.constants.screenWidth * 0.75) / 2,
  },
});

export default Button;
