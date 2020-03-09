import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions
} from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);

const height = 50;
const padding = 10;
const margin = 10;
const width = screenWidth * 0.8;
const backgroundColor = 'transparent';
const borderWidth = 1;
const borderRadius = 6;
const fontFamily = 'Comfortaa-Regular';
const fontSize = 18;

const TextForm = ({
  icon,
  ...restProps
}) => {

  let defaultStyle = [];
  defaultStyle = defaultStyle.concat(styles.defaultStyle);

  return (
    <TextInput {...restProps} style={defaultStyle} />
  )
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
    fontSize
  }
});

export default TextForm;
