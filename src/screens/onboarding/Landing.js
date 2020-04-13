import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import Button from 'library/components/General/Button';
import CustomText from 'library/components/General/CustomText';

import R from 'res/R';

console.disableYellowBox = true; //for flatlist error testing with carousel

class Landing extends React.Component {
  state = {
    slides: [
      {
        title: 'All your social events',
        subtitle: 'In one place, instantly accessible',
        image: R.images.intro,
      },
      {
        title: 'Browse Events',
        subtitle: 'Search and attend exciting and new events',
        image: R.images.browse,
      },
      {
        title: 'Join Events',
        subtitle: 'Attend events within minutes',
        image: R.images.join,
      },
      {
        title: 'Organize Events',
        subtitle: 'Plan parties with ease',
        image: R.images.organize,
      },
    ],
    activeSlide: 0,
  };

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.container} key={index}>
        <View style={styles.textContainer}>
          <CustomText title center label={item.title} />
          <CustomText subtitle center label={item.subtitle} />
        </View>
        <View style={styles.slideShowContainer}>
          <Image style={styles.image} source={item.image} />
        </View>
      </View>
    );
  };

  get pagination() {
    const {slides, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={slides.length}
        activeDotIndex={activeSlide}
        containerStyle={{width: 20, height: 0, paddingVertical: '2%'}}
        dotStyle={{
          width: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(0,0,0,0.92)',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.pagination}

        <Carousel
          data={this.state.slides}
          renderItem={this._renderItem}
          sliderWidth={R.constants.screenWidth}
          itemWidth={R.constants.screenWidth * 0.9}
          containerCustomStyle={{height: 300}}
          onSnapToItem={index => this.setState({activeSlide: index})}
        />

        <View style={styles.buttonContainer}>
          <Button
            dark
            title="Access an existing event"
            onPress={() => this.props.navigation.navigate('LinkRegister')}
          />
          <View style={{flexDirection: 'row'}}>
            <Button
              light
              half
              title="Sign up"
              onPress={() =>
                this.props.navigation.navigate('PhoneAuth', {option: 'signUp'})
              }
            />
            <Button
              light
              half
              title="Sign In"
              onPress={() =>
                this.props.navigation.navigate('PhoneAuth', {option: 'signIn'})
              }
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

export default Landing;
