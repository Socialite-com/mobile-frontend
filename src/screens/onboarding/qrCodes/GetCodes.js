import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
import CustomText from 'library/components/General/CustomText';
import Button from 'library/components/General/Button';
import {createEventTab} from 'library/components/Events/EventTab';

import R from 'res/R';

class GetCodes extends React.Component {
  state = {
    invites: [
      {
        eventName: 'Big 18',
        eventTime: 'Sat, Mar 21, 6:45 PM',
        privacy: 'Private',
        organizer: 'Stephen Lu',
      },
      {
        eventName: 'MSU End of Semester Party',
        eventTime: 'Sun, Apr 12, 6 PM',
        privacy: 'Public',
        organizer: 'Marianopolis Student Union',
      },
      {
        eventName: 'Block Party 3',
        eventTime: 'Fri, Apr 11, 9 PM',
        privacy: 'Public',
        organizer: 'MTL Nights Out',
      },
      {
        eventName: 'Janice Birthday Party',
        eventTime: 'Fri, Apr 11, 9 PM',
        privacy: 'Private',
        organizer: 'Janice Chen',
      },
    ],
    checkedCodes: true,
    foundCodes: true,
  };

  componentDidMount(): void {
    this._handleGetCodes();
  }

  _handleGetCodes() {
    // Figure out code system
    CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
    })
      .then(r => {
        this.setState({photos: r.edges});
        const uri = r.edges[0].node.image.uri;
        console.log(uri);
      })
      .catch(err => {
        alert(err);
      });
  }

  _renderSearchingView = () => {
    return (
      <>
        <View style={styles.textContainer}>
          <CustomText title label="Searching for your Socialite codes" />
          <CustomText label="This may take a few seconds" />
        </View>
        <View style={styles.mediaContainer}>
          <CustomText label="Some searching animation" />
        </View>
      </>
    );
  };

  _renderFoundCodeView = () => {
    return (
      <>
        <View style={styles.textContainer}>
          <CustomText
            title
            label="Hurrah! We found the following invitations"
          />
          <CustomText label="Let's edit your profile so people can identify you on Socialite" />
        </View>
        <View style={styles.mediaContainer}>
          <FlatList
            data={this.state.invites}
            renderItem={({item, index}) => createEventTab(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() =>
              this.props.navigation.navigate('PhoneAuth', {option: 'SignUp'})
            }
            title="Sign In"
          />
        </View>
      </>
    );
  };

  _renderNoneFoundView = () => {
    return (
      <>
        <View style={styles.textContainer}>
          <CustomText
            title
            label="Sorry, we couldn't find any Socialite codes"
          />
          <CustomText label="Please make sure your event code is saved in your camera roll and try again" />
        </View>
        <View style={styles.mediaContainer}>
          <CustomText label="Some error animation" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Search again" />
          <Button
            swap
            onPress={() => this.props.navigation.navigate('LinkRegister')}
            title="Enter key"
          />
        </View>
      </>
    );
  };

  render() {
    const {foundCodes, checkedCodes} = this.state;
    return (
      <View style={styles.mainContainer}>
        {!checkedCodes
          ? this._renderSearchingView()
          : !foundCodes
          ? this._renderNoneFoundView()
          : this._renderFoundCodeView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingLeft: '10%',
    width: R.constants.screenWidth * 0.8,
  },
  mediaContainer: {
    flex: 5,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginBottom: '5%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default GetCodes;
