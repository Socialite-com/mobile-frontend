import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {onSignOut} from "../networking/auth";
import Button from "../components/Button";

class Home extends React.Component {
  state = {};
  componentDidMount(): void {}
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home Page</Text>
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

export default Home;
