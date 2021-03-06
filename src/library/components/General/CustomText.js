import React from 'react';
import {StyleSheet, Text} from 'react-native';
import R from 'res/R';

const CustomText = ({
  pad,
  label,
  error,
  title,
  center,
  splash,
  subtitle,
  subtitle_2,
  subtitle_3,
  subtitle_4,
  subtitle_5,
  subtitle_6,
  customStyle,
  ...restProps
}) => {
  let textStyle = [];
  textStyle = textStyle.concat(styles.defaultStyle);
  if (pad) {
    textStyle = textStyle.concat({paddingLeft: '3%'});
  }
  if (title) {
    textStyle = textStyle.concat(styles.title);
  }
  if (subtitle) {
    textStyle = textStyle.concat(styles.subtitle);
  }
  if (subtitle_2) {
    textStyle = textStyle.concat(styles.subtitle_2);
  }
  if (subtitle_3) {
    textStyle = textStyle.concat(styles.subtitle_3);
  }
  if (subtitle_4) {
    textStyle = textStyle.concat(styles.subtitle_4);
  }
  if (subtitle_5) {
    textStyle = textStyle.concat(styles.subtitle_5);
  }
  if (subtitle_6) {
    textStyle = textStyle.concat(styles.subtitle_6);
  }
  if (center) {
    textStyle = textStyle.concat(styles.center);
  }
  if (splash) {
    textStyle = textStyle.concat(styles.splash);
  }
  if (error) {
    textStyle = textStyle.concat(styles.error);
  }
  if (customStyle) {
    textStyle = textStyle.concat(customStyle);
  }

  return (
    <Text {...restProps} style={textStyle}>
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 18,
    textAlign: 'left',
    color: R.color.secondary,
    fontFamily: R.fonts.comfortaaRegular,
  },
  title: {
    fontFamily: R.fonts.comfortaaBold,
    fontSize: 24,
    marginBottom: '5%',
  },
  subtitle: {
    fontFamily: R.fonts.comfortaaLight,
    fontSize: 24,
    marginBottom: '3%',
  },
  subtitle_2: {
    fontFamily: R.fonts.robotoBlack,
    textTransform: 'uppercase',
    fontSize: 13,
  },
  subtitle_3: {
    fontFamily: R.fonts.robotoRegular,
    fontSize: 13,
  },
  subtitle_4: {
    fontFamily: R.fonts.robotoMedium,
    textTransform: 'uppercase',
    fontSize: 13,
  },
  subtitle_5: {
    fontFamily: R.fonts.robotoMedium,
    textTransform: 'uppercase',
    fontSize: 18,
  },
  subtitle_6: {
    fontFamily: R.fonts.robotoRegular,
    fontSize: 16,
  },
  center: {
    textAlign: 'center',
  },
  splash: {
    color: R.color.primary,
    fontSize: 45,
  },
  error: {
    fontSize: 13,
    color: R.color.tertiary,
    textTransform: 'uppercase',
    fontFamily: R.fonts.robotoBlack,
  },
});

export default CustomText;
