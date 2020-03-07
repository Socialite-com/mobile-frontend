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
  ...restProps
}) => {

  let textStyle = [];
  textStyle = textStyle.concat(styles.defaultStyle);

  if (title) { textStyle = textStyle.concat(styles.title); }
  if (subtitle) { textStyle = textStyle.concat(styles.subtitle); }
  if (center) { textStyle = textStyle.concat(styles.center); }

  return (
    <View {...restProps}>
      <Text style={textStyle}>{label}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  defaultStyle: {
    textAlign: 'left',
    fontFamily: 'Comfortaa-Regular',
    marginBottom: '5%'
  },
  title: {
    fontFamily: 'Comfortaa-Bold',
    fontSize: 24
  },
  subtitle: {
    fontFamily: 'Comfortaa-Light',
    fontSize: 24,
    marginBottom: '3%'
  },
  center: {
    textAlign: 'center'
  }
});

export default CustomText