import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import R from "res/R";

const CustomText = ({
  label,
  title,
  subtitle,
  subtitle_2,
  center,
  splash,
  ...restProps
}) => {

  let textStyle = [];
  textStyle = textStyle.concat(styles.defaultStyle);

  if (title) { textStyle = textStyle.concat(styles.title); }
  if (subtitle) { textStyle = textStyle.concat(styles.subtitle); }
  if (subtitle_2) { textStyle = textStyle.concat(styles.subtitle_2); }
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
    fontFamily: R.fonts.comfortaaRegular,
  },
  title: {
    fontFamily: R.fonts.comfortaaBold,
    fontSize: 24,
    marginBottom: '5%'
  },
  subtitle: {
    fontFamily: R.fonts.comfortaaLight,
    fontSize: 24,
    marginBottom: '3%'
  },
  subtitle_2: {
    fontFamily: R.fonts.robotoBlack,
    textTransform: 'uppercase',
    fontSize: 13,
  },
  center: {
    textAlign: 'center'
  },
  splash: {
    color: R.colors.secondary,
    fontSize: 45
  }
});

export default CustomText