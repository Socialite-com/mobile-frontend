import React from 'react';
import {
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';

import CustomText from "library/components/CustomText";

class Home extends React.Component {
  state = {};
  componentDidMount(): void {}
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.profileContainer}>
            <TouchableHighlight style={styles.profileImgContainer}>
              <CustomText splash center label="S" />
            </TouchableHighlight>
            <CustomText subtitle center label="Stephen" />
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
