import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const CustomText = ({
  label,
  title,
  subtitle,
  center,
  splash,
  ...restProps
}) => {

  let textStyle = [];
  textStyle = textStyle.concat(styles.defaultStyle);

  if (title) { textStyle = textStyle.concat(styles.title); }
  if (subtitle) { textStyle = textStyle.concat(styles.subtitle); }
  if (center) { textStyle = textStyle.concat(styles.center); }
  if (splash) { textStyle = textStyle.concat(styles.splash); }

  return (
    <Text {...restProps} style={textStyle}>{label}</Text>
  )
};

const styles = StyleSheet.create({
  defaultStyle: {
    textAlign: 'left',
    fontSize: 18,
    fontFamily: 'Comfortaa-Regular',
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 24,
    marginBottom: '5%'
  },
  subtitle: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 24,
    marginBottom: '3%'
  },
  center: {
    textAlign: 'center'
  },
  splash: {
    color: 'white',
    fontSize: 45
  }
});

export default CustomText