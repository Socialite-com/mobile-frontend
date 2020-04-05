import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Button from 'library/components/General/Button';
import CustomText from 'library/components/General/CustomText';

class Landing extends React.Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <CustomText title center label="All your social events" />
          <CustomText
            subtitle
            center
            label="In one place, instantly accessible"
          />
        </View>
        <View style={styles.slideShowContainer}>
          <Text>SlideShow...</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            dark
            title="Access an existing event"
            onPress={() => this.props.navigation.navigate('LinkRegister')}
          />
          <View style={{flexDirection: 'row'}}>
            <Button
              light
              half
              title="Sign up"
              onPress={() =>
                this.props.navigation.navigate('PhoneAuth', {option: 'signUp'})
              }
            />
            <Button
              light
              half
              title="Sign In"
              onPress={() =>
                this.props.navigation.navigate('PhoneAuth', {option: 'signIn'})
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideShowContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Landing;
