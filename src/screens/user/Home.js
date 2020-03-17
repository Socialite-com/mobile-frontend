import React from 'react';
import {
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';

import {getUser, getProfileData} from "library/networking/database";

import CustomText from "library/components/CustomText";

class Home extends React.Component {
  state = {
    userName: "",
    invites: []
  };

  async componentDidMount() {
    let user = await getUser();
    let profile = await getProfileData(user.uid);
    this.setState({
      userId: user.uid,
      userName: profile.userName
    })
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.profileContainer}>
            <TouchableHighlight style={styles.profileImgContainer}>
              <CustomText splash center label={this.state.userName.charAt(0).toUpperCase()} />
            </TouchableHighlight>
            <CustomText subtitle center label={this.state.userName} />
            <CustomText subtitle_2 center label="Montreal, CA" />
          </View>
          <View style={styles.inviteView}>
            <CustomText subtitle_2 label="My Invites" />

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inviteView: {
    flex: 5,
    padding: 25
  },
  profileImgContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    marginBottom: 15
  }
});

export default Home;
