import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from 'react-native';

import Button from 'library/components/Button';
import CustomText from 'library/components/CustomText';
import TextForm from 'library/components/TextInput';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const keyboardOffset = screenHeight * 0.2;
class EventType extends React.Component {
  state = {
    private: true,
    free: true,
    price: '',
  };

  handleType(value) {
    this.setState({private: value});
  }

  handlePrice(value) {
    this.setState({free: value});
  }

  handleVerifyType = () => {
    if (
      (!this.state.free && parseInt(this.state.price, 0) > 0) ||
      this.state.free
    ) {
      this.props.navigation.navigate('EventTime', {
        name: this.props.route.params.name,
        private: this.state.private,
        free: this.state.free,
        price: this.state.price,
      });
    } else {
      alert('Your event must have a valid price');
    }
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

        {this.state.free ? (
          <View style={styles.buttonContainer}>
            <Button title="Free" dark half />
            <Button
              title="Paid"
              light
              half
              onPress={() => this.handlePrice(false)}
            />
          </View>
        ) : (
          <View>
            <View style={styles.buttonContainer}>
              <Button
                title="Free"
                light
                half
                onPress={() => this.handlePrice(true)}
              />
              <Button title="Paid" dark half />
            </View>

            <KeyboardAvoidingView
              styles={{flexDirection: 'row', alignItems: 'center'}}
              keyboardVerticalOffset={keyboardOffset}
              behavior="padding">
              <TextForm
                placeholder="Set your price (in CAD)"
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
    paddingBottom: '10%',
  },
  textContainer: {
    width: screenWidth * 0.9,
    overflow: 'scroll',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '2%',
  },
});

export default EventType;

//On select image popup bottom drawer
//make possible to close/swipe down
//fix styling on the next one
