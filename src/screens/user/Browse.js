import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

class Browse extends React.Component {
  state = {};
  componentDidMount(): void {}
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Browse Public Events</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Browse;
