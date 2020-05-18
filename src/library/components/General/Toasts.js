import Toast from 'react-native-root-toast';
import R from 'res/R';

export const showToast = (message, light, dark, top, bottom) => {
  let textColor = R.color.primary;
  let backgroundColor = R.color.secondary;
  if (dark) {
    textColor = R.color.secondary;
    backgroundColor = R.color.primary;
  }
  return Toast.show(message, {
    duration: 1500,
    position: -40,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    opacity: 1,
    shadowColor: 'grey',
    textColor: textColor,
    backgroundColor: backgroundColor,
    containerStyle: {width: R.constants.screenWidth * 0.8},
    textStyle: {
      fontFamily: R.fonts.comfortaaRegular,
      fontSize: 18,
    },
  });
};
