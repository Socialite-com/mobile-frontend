import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from 'react-native';

import Button from 'library/components/Button';
import TextForm from 'library/components/TextInput';
import CustomText from 'library/components/CustomText';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const keyboardOffset = screenHeight * 0.2;

class EventPrice extends React.Component {
  state = {
    free: true,
    price: '',
  };

  handlePrice(value) {
    this.setState({free: value});
  }

  handleVerifyPrice = () => {
    if (
      (!this.state.free && parseInt(this.state.price, 0) > 0) ||
      this.state.free
    ) {
      alert('Done!');
    } else {
      alert('Your event must have a valid price');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.textContainer, styles.titleContainer]}>
          <CustomText label="How much will tickets cost?" subtitle />
        </View>

        {this.state.free ? (
          <View style={styles.buttonContainer}>
            <Button title="Free" dark half />
            <Button
              title="Public"
              light
              half
              onPress={() => this.handlePrice(false)}
            />
          </View>
        ) : (
          <View>
            <View style={styles.buttonContainer}>
              <Button
                title="Paid"
                light
                half
                onPress={() => this.handlePrice(true)}
              />
              <Button title="Public" dark half />
            </View>

            <KeyboardAvoidingView
              styles={{flexDirection: 'row', alignItems: 'center'}}
              keyboardVerticalOffset={keyboardOffset}
              behavior="padding">
              <TextForm
                placeholder="Set your price"
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                returnKeyType={'next'}
                value={this.state.price.toString()}
                onChangeText={price => {
                  this.setState({price});
                }}
                onSubmitEditing={this.handleVerifyPrice}
              />
            </KeyboardAvoidingView>
          </View>
        )}

        <Button title="Next" dark onPress={this.handleVerifyPrice} />
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
    width: screenWidth * 0.9,
    overflow: 'scroll',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
    marginBottom: '2%',
  },
});

export default EventPrice;
