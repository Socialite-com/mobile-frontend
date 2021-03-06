import React from 'react';
import {View, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

import R from 'res/R';

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
    top: -R.constants.screenHeight / 2,
  },
};

const slideDown = {
  0: {
    top: R.constants.screenHeight / 2,
  },
  1: {
    top: R.constants.screenHeight,
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
      this.TextView.animate(fadeOut, 500, 250);
    }
  }

  //on props update
  componentDidUpdate() {
    if (this.props.isReady) {
      this.topView.animate(slideUp, 750, 850);
      this.bottomView.animate(slideDown, 750, 850);
      this.TextView.animate(fadeOut, 500, 250);
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
          <Image
            style={styles.logo}
            source={R.images.logo_white}
            resizeMode="contain"
          />
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
    width: R.constants.screenWidth,
    height: R.constants.screenHeight,
    zIndex: 2,
  },
  topViewStyles: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'black',
    width: R.constants.screenWidth,
    height: R.constants.screenHeight / 2,
  },
  bottomViewStyles: {
    position: 'absolute',
    right: 0,
    top: R.constants.screenHeight / 2,
    backgroundColor: 'black',
    width: R.constants.screenWidth,
    height: R.constants.screenHeight / 2,
  },
  logo: {
    height: 80,
  },
};

export default SplashScreen;
