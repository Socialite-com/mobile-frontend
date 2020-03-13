import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {onSignOut} from "library/networking/auth";
import Button from "library/components/Button";

class Event extends React.Component {
  state = {};
  componentDidMount(): void {}
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Event Page</Text>
        <Button
          dark
          title="Log Out"
          onPress={() => onSignOut().then(this.props.navigation.navigate('Onboarding'))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Event;
