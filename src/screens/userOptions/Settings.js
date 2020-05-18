import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Button from '../../library/components/General/Button';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import auth from '@react-native-firebase/auth';
import {logout} from '../../state/actions/users';

class Settings extends React.Component {
  state = {};
  componentDidMount() {
    console.log(this.props.user);
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Event Page</Text>
        <Button
          title="Log Out"
          onPress={() => {
            auth()
              .signOut()
              .then(async () => {
                await this.props.logout();
                this.props.navigation.reset({
                  index: 0,
                  routes: [{name: 'Onboarding'}],
                });
              })
              .catch(error => alert(error));
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  auth: state.authentication,
  user: state.user,
});
const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
