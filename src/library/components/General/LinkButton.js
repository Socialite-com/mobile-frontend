import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';

import R from 'res/R';

const fontFamily = R.fonts.comfortaaRegular;

const LinkButton = ({title, header, underline, customStyle, ...restProps}) => {
  let textStyle = [];
  textStyle = textStyle.concat(style.defaultStyle);

  if (header) {
    textStyle = textStyle.concat(style.header);
  }
  if (underline) {
    textStyle = textStyle.concat(style.underline);
  }

  return (
    <TouchableOpacity {...restProps}>
      <View>
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  defaultStyle: {
    color: R.color.secondary,
    fontFamily,
  },
  header: {
    fontFamily: R.fonts.comfortaaBold,
    color: R.color.blue,
    fontSize: 17,
  },
  underline: {
    textDecorationLine: 'underline',
    color: R.color.secondary,
    marginTop: '3%',
    fontSize: 13,
  },
});

export default LinkButton;
