import React from 'react';
import {StyleSheet, View} from 'react-native';

import Button from '../../library/components/General/Button';
import CustomText from '../../library/components/General/CustomText';

import R from 'res/R';

class EventType extends React.Component {
  state = {
    private: true,
  };

  handleType(value) {
    this.setState({private: value});
  }

  handleVerifyType = () => {
    this.props.navigation.navigate('EventTime');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.textContainer, styles.titleContainer]}>
          <CustomText label="What type of event are you organizing?" subtitle />
        </View>

        {this.state.private ? (
          <View style={styles.buttonContainer}>
            <Button title="Private" dark half />
            <Button
              title="Public"
              light
              half
              onPress={() => this.handleType(false)}
            />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              title="Private"
              light
              half
              onPress={() => this.handleType(true)}
            />
            <Button title="Public" dark half />
          </View>
        )}

        <Button title="Next" dark onPress={this.handleVerifyType} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
  },
  titleContainer: {
    paddingBottom: '5%',
  },
  textContainer: {
    width: R.constants.screenWidth * 0.8,
    overflow: 'scroll',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
    marginBottom: '2%',
  },
});

export default EventType;

//On select image popup bottom drawer
//make possible to close/swipe down
//fix styling on the next one
