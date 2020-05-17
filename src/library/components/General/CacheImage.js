import React from 'react';
import {ImageBackground, Image, Platform} from 'react-native';

let RNFS = require('react-native-fs');
import shorthash from 'shorthash';

class CacheImage extends React.Component {
  state = {source: null};

  loadFile = path => {
    this.setState({source: {uri: path}});
  };

  downloadFile = (uri, path) => {
    RNFS.downloadFile({fromUrl: uri, toFile: path}).promise.then(res =>
      this.loadFile(path),
    );
  };

  componentDidMount() {
    const {uri} = this.props;
    if (uri) {
      const name = shorthash.unique(uri);
      const extension = Platform.OS === 'android' ? 'file://' : '';
      const path = `${extension}${RNFS.CachesDirectoryPath}/${name}.png`;
      RNFS.exists(path)
        .then(exists => {
          if (exists) this.loadFile(path);
          else this.downloadFile(uri, path);
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    if (this.props.background) {
      return (
        <ImageBackground
          style={this.props.style}
          imageStyle={this.props.imageStyle}
          source={this.state.source}>
          {this.props.children}
        </ImageBackground>
      );
    }
    return <Image style={this.props.style} source={this.state.source} />;
  }
}
export default CacheImage;
