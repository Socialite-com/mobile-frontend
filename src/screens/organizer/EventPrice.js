import React from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native';

import Button from '../../library/components/General/Button';
import TextForm from '../../library/components/General/TextInput';
import CustomText from '../../library/components/General/CustomText';

import R from 'res/R';

const keyboardOffset = R.constants.screenHeight * 0.2;

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
            <Button title="Free" half />
            <Button
              title="Public"
              swap
              half
              onPress={() => this.handlePrice(false)}
            />
          </View>
        ) : (
          <View>
            <View style={styles.buttonContainer}>
              <Button
                title="Paid"
                swap
                half
                onPress={() => this.handlePrice(true)}
              />
              <Button title="Public" half />
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

        <Button title="Next" onPress={this.handleVerifyPrice} />
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

export default EventPrice;
