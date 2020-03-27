import React from 'react';
import {
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

import db from 'library/networking/database';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import {createEventCard} from 'library/components/EventCard';
import CustomText from 'library/components/CustomText';

import R from 'res/R';

const titles = ['My Invites', 'My Events'];

class Home extends React.Component {
  state = {
    userName: '',
    eventInvites: [],
    eventCreations: [],
    activeSlide: 0,
    maxHeight: 50,
  };

  componentDidMount() {
    db.getUser()
      .then(user => {
        db.getProfileData(user.uid)
          .then(data => {
            this.setState({
              userId: user.uid,
              userName: data.userName,
            });
            db.getEvents(user.uid, 'eventCreations').then(res => {
              if (res.length === 0) {
                this.setState({eventCreations: res});
              } else {
                this.parseEventData(res).then(eventCreations =>
                  this.setState({
                    eventCreations,
                    maxHeight: this.getCarouselMaxHeight(),
                  }),
                );
              }
            });
            db.getEvents(user.uid, 'eventInvites').then(res => {
              if (res.length === 0) {
                this.setState({eventInvites: res});
              } else {
                this.parseEventData(res).then(eventInvites =>
                  this.setState({
                    eventInvites,
                    maxHeight: this.getCarouselMaxHeight(),
                  }),
                );
              }
            });
          })
          .catch(err => alert(err));
      })
      .catch(err => alert(err));
  }

  parseEventData = data =>
    new Promise(async (resolve, reject) => {
      const profileKeys = ['userName', 'profilePicture'];
      const eventKeys = [
        'title',
        'qrCode',
        'title',
        'type',
        'backgroundColor',
        'backgroundImage',
      ];
      const redux = (array, keys) =>
        array.map(o =>
          keys.reduce((acc, curr) => {
            acc[curr] = o[curr];
            return acc;
          }, {}),
        );

      const userIDs = data.map(val => val.creator);
      const profileData = redux(
        await Promise.all(userIDs.map(id_ => db.getProfileData(id_))),
        profileKeys,
      );
      const eventDetails = redux(
        data.map(val => val.details),
        eventKeys,
      );

      let finalData = profileData.map((item, index) =>
        Object.assign({}, item, eventDetails[index]),
      );

      resolve(finalData);
    });

  renderCards(cardArray) {
    return cardArray.item.map((item, index) => {
      return createEventCard(item, index);
    });
  }

  get pagination() {
    const {eventInvites, eventCreations, activeSlide} = this.state;
    const data = [eventInvites, eventCreations];
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{width: 20, height: 0, paddingVertical: '3%'}}
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

  getCarouselMaxHeight() {
    const invitesList = this.state.eventInvites.length;
    const hostList = this.state.eventCreations.length;
    if (invitesList >= hostList) {
      return invitesList * 82 + 170;
    } else {
      return hostList * 82 + 176;
    }
  }

  render() {
    const {eventInvites, eventCreations} = this.state;
    const data = [eventInvites, eventCreations];

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1, paddingTop: '5%'}}>
          <View style={styles.profileContainer}>
            <TouchableHighlight style={styles.profileImgContainer}>
              <CustomText
                splash
                center
                label={this.state.userName.charAt(0).toUpperCase()}
              />
            </TouchableHighlight>
            <CustomText subtitle center label={this.state.userName} />
            <CustomText subtitle_2 center label="Montreal, CA" />
          </View>
          <View style={styles.inviteView}>
            <View
              style={{
                paddingTop: '2%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <CustomText subtitle_2 label={titles[this.state.activeSlide]} />
              {this.pagination}
            </View>
            <View style={styles.cardView}>
              <Carousel
                data={data}
                renderItem={this.renderCards}
                sliderWidth={R.constants.screenWidth * 2}
                itemWidth={R.constants.screenWidth * 0.9}
                containerCustomStyle={{height: this.state.maxHeight}}
                onSnapToItem={index => this.setState({activeSlide: index})}
              />
            </View>
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
    justifyContent: 'center',
  },
  inviteView: {
    flex: 5,
    paddingTop: '5%',
    paddingLeft: '1%',
    alignSelf: 'center',
    width: R.constants.screenWidth * 0.9,
  },
  cardView: {
    alignItems: 'center',
    marginTop: '2%',
    flex: 1,
    height: 300, //added since couldn't see cards
  },
  profileImgContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    marginBottom: 15,
  },
});

export default Home;
