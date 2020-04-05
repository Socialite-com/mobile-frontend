import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import authentication from '../../library/networking/authentication';
import Button from '../../library/components/General/Button';

class Settings extends React.Component {
  state = {};
  componentDidMount(): void {}
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Event Page</Text>
        <Button
          dark
          title="Log Out"
          onPress={() =>
            authentication.onSignOut().then(
              this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Onboarding'}],
              }),
            )
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Settings;
