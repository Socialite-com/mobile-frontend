import {Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const constants = {
  screenHeight: screenHeight,
  screenWidth: screenWidth,
};

export default constants;
