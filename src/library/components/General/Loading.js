import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';

import R from 'res/R';

class Loading extends React.Component {
  render() {
    return (
      <Animatable.View
        transition="opacity"
        style={[
          styles.container,
          {
            opacity: this.props.loading ? 1 : 0,
            zIndex: this.props.loading ? 100 : -100,
          },
        ]}>
        <View style={styles.background} />
        <LottieView
          source={require('res/data/loading/data.json')}
          autoPlay
          loop
          style={styles.loader}
        />
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: R.constants.screenWidth,
    height: R.constants.screenHeight,
  },
  background: {
    backgroundColor: '#fff',
    width: R.constants.screenWidth,
    height: R.constants.screenHeight,
    opacity: 0.85,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 150,
  },
});

export default Loading;
