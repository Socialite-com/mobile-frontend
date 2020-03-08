import React from 'react';
import { View } from 'react-native';
import CustomText from "../components/CustomText";

class SplashScreen extends React.Component {

  async componentDidMount() {}

  render() {
    return (
      <View style={styles.viewStyles}>
        <CustomText splash label="Socialite" />
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  }
};

export default SplashScreen;