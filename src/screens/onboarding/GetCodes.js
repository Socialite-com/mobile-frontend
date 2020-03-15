import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

class GetCodes extends React.Component {
  state = {
    found: false
  };

  componentDidMount(): void {
  }

  _handleGetCodes() {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos'
    })
    .then(r => {
      this.setState({ photos: r.edges });
    })
    .catch((err) => {
      // Error Loading Images
    });
  }

  renderFoundCodeView = () => {
    return (
      <View>

      </View>
    )
  };

  renderNoneFoundView = () => {
    return (
      <View>

      </View>
    )
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>

      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default GetCodes;