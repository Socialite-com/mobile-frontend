import React from 'react';
import {View, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';

import CustomText from 'library/components/CustomText';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Animatable.View
          transition={['top']}
          duration={750}
          easing="ease-in-out-cubic"
          style={[styles.topViewStyles, this.props.isReady && styles.moveUp]}
        />
        <Animatable.View
          transition={['top']}
          duration={750}
          easing="ease-in-out-cubic"
          style={[
            styles.bottomViewStyles,
            this.props.isReady && styles.moveDown,
          ]}
        />
        <Animatable.View
          transition={['opacity']}
          duration={250}
          easing="ease-in-out-cubic"
          style={[this.props.isReady && styles.fadeOut]}>
          <CustomText splash label="Socialite" />
        </Animatable.View>
      </View>
    );
  }
}

//fix styling

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: screenWidth,
    height: screenHeight / 2,
    zIndex: 2,
  },
  topViewStyles: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'black',
    width: screenWidth,
    height: screenHeight / 2,
  },
  bottomViewStyles: {
    position: 'absolute',
    right: 0,
    top: screenHeight / 2,
    backgroundColor: 'black',
    width: screenWidth,
    height: screenHeight / 2,
  },
  moveUp: {
    top: -screenHeight / 2,
  },
  moveDown: {
    top: screenHeight,
  },
  fadeOut: {
    opacity: 0,
  },
};

export default SplashScreen;
