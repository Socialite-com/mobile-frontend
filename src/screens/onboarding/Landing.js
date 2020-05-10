import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import slides from '../../res/defaults/landingSlides';
import Button from 'library/components/General/Button';
import CustomText from 'library/components/General/CustomText';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setValue} from '../../state/actions/onboarding';
import {SET_MODE, TOGGLE_LANDING_CAROUSEL} from '../../state';

import R from 'res/R';

class Landing extends React.Component {
  _renderItem = ({item, index}) => {
    return (
      <View style={styles.container} key={index}>
        <View style={styles.textContainer}>
          <CustomText title center label={item.title} />
          <CustomText subtitle center label={item.subtitle} />
        </View>
        <View style={styles.slideShowContainer}>
          {/*TODO Preload image using this method in https://github.com/DylanVann/react-native-fast-image/issues/160*/}
          <Image style={styles.image} source={item.image} />
        </View>
      </View>
    );
  };

  get pagination() {
    const {activeSlide} = this.props.onBoarding;
    return (
      <Pagination
        dotsLength={slides.length}
        activeDotIndex={activeSlide}
        containerStyle={{width: 20, height: 0, paddingVertical: '2%'}}
        dotStyle={{
          width: 10,
          borderRadius: 5,
          backgroundColor: R.color.secondary,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  setAuthMode = option => {
    this.props.setValue(SET_MODE, option);
    this.props.navigation.navigate('PhoneAuth');
  };

  render() {
    return (
      <View style={styles.container}>
        {this.pagination}

        <Carousel
          data={slides}
          renderItem={this._renderItem}
          sliderWidth={R.constants.screenWidth}
          itemWidth={R.constants.screenWidth * 0.9}
          containerCustomStyle={{height: 300}}
          onSnapToItem={index =>
            this.props.setValue(TOGGLE_LANDING_CAROUSEL, index)
          }
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Access an existing event"
            onPress={() => this.props.navigation.navigate('LinkRegister')}
          />
          <View style={{flexDirection: 'row'}}>
            <Button
              swap
              half
              title="Sign up"
              onPress={() => this.setAuthMode('register')}
            />
            <Button
              swap
              half
              title="Sign In"
              onPress={() => this.setAuthMode('signIn')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 50,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideShowContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: R.constants.screenWidth * 0.8,
    width: R.constants.screenWidth * 0.8,
  },
});

const mapStateToProps = state => ({
  onBoarding: state.onBoarding,
});

const mapDispatchToProps = dispatch => ({
  setValue: bindActionCreators(setValue, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
