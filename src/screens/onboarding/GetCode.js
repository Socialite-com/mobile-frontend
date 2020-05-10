import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

import CustomText from 'library/components/General/CustomText';
import Button from 'library/components/General/Button';
import EventCard from 'library/components/Events/EventCard';

import Animation from 'lottie-react-native';
import anim from '../../res/data/loading/data.json';

import R from 'res/R';

import {connect} from 'react-redux';

class GetCode extends React.Component {
  componentDidMount() {
    if (this.props.findEvent.searching) this.animation.play();
  }

  _renderSearchingView = () => {
    return (
      <>
        <View style={styles.textContainer}>
          <CustomText title label="Searching for your Socialite codes" />
          <CustomText label="This may take a few seconds" />
        </View>
        <View style={styles.mediaContainer}>
          <Animation
            loop={true}
            source={anim}
            style={styles.image}
            ref={animation => (this.animation = animation)}
          />
        </View>
      </>
    );
  };

  _renderFoundCodeView = data => {
    return (
      <>
        <View style={styles.textContainer}>
          <CustomText title label="Hurrah! We found the following invitation" />
          <CustomText label="Let's edit your profile so people can identify you on Socialite" />
        </View>
        <View style={styles.mediaContainer}>
          <EventCard data={data} small />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('PhoneAuth')}
            title="Continue"
          />
        </View>
      </>
    );
  };

  _renderNoneFoundView = error => {
    return (
      <>
        <View style={styles.textContainer}>
          <CustomText
            title
            label="Sorry, we couldn't find any Socialite event linked to that code"
          />
          <CustomText label={error} />
        </View>
        <View style={styles.mediaContainer}>
          <Image style={styles.image} source={R.images.error} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('LinkRegister')}
            title="Search again"
          />
        </View>
      </>
    );
  };

  render() {
    const {queryError, searching, data} = this.props.findEvent;
    return (
      <View style={styles.mainContainer}>
        {searching
          ? this._renderSearchingView()
          : queryError !== null
          ? this._renderNoneFoundView(queryError)
          : this._renderFoundCodeView(data)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
    width: R.constants.screenWidth * 0.8,
  },
  mediaContainer: {
    flex: 4,
    alignItems: 'center',
    width: R.constants.screenWidth * 0.8,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '5%',
  },
  image: {
    height: R.constants.screenWidth * 0.8,
    width: R.constants.screenWidth * 0.8,
  },
});

const mapStateToProps = state => ({
  findEvent: state.findEvent,
});

export default connect(mapStateToProps)(GetCode);
