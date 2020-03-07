import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native'

const screenWidth = Math.round(Dimensions.get('window').width);

const height = 50;
const padding = 10;
const margin = 10;
const width = screenWidth * 0.8;
const backgroundColor = 'black';
const borderRadius = 6;
const color = 'black';

const Button = ({
  title,
  dark,
  light,
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
    inlineStyle = inlineStyle.concat(style.light)
  }

  if (customStyle) {
    inlineStyle = inlineStyle.concat(customStyle)
  }

  return (
    <TouchableOpacity {...restProps}>
      <View style={inlineStyle}>
        <Text style={textStyle}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
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
    justifyContent: 'center'
  },
  defaultTextStyle: {
    fontFamily: 'Roboto-Black',
    textTransform: 'uppercase',
    fontSize: 13,
    color
  },
  lightText: {
    color: 'white'
  },
  light: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  }
});

export default Button;