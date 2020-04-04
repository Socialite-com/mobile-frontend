import React from 'react';
import {View, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';

import CustomText from 'library/components/CustomText';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const fadeOut = {
  0: {
    opacity: 1,
  },
  1: {
    opacity: 0,
  },
};

const slideUp = {
  0: {
    top: 0,
  },
  1: {
    top: -screenHeight / 2,
  },
};

const slideDown = {
  0: {
    top: screenHeight / 2,
  },
  1: {
    top: screenHeight,
  },
};

class SplashScreen extends React.Component {
  handleTopViewRef = ref => (this.topView = ref);
  handleBottomViewRef = ref => (this.bottomView = ref);
  handleTextViewRef = ref => (this.TextView = ref);

  //used for testing
  componentDidMount() {
    if (this.props.isReady) {
      this.topView.animate(slideUp, 750, 600);
      this.bottomView.animate(slideDown, 750, 600);
      this.TextView.animate(fadeOut, 500);
    }
  }

  //on props update
  componentDidUpdate() {
    if (this.props.isReady) {
      this.topView.animate(slideUp, 750, 600);
      this.bottomView.animate(slideDown, 750, 600);
      this.TextView.animate(fadeOut, 500);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Animatable.View
          ref={this.handleTopViewRef}
          style={styles.topViewStyles}
        />
        <Animatable.View
          ref={this.handleBottomViewRef}
          style={styles.bottomViewStyles}
        />
        <Animatable.View ref={this.handleTextViewRef}>
          <CustomText splash label="Socialite" />
        </Animatable.View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: screenWidth,
    height: screenHeight,
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

//Splash screen for ios
//add logo in the middle
//animate logo
