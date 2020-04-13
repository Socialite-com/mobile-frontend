import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
// import * as Animatable from 'react-native-animatable';

import AsyncStorage from '@react-native-community/async-storage';
import db from 'library/networking/database';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import Button from 'library/components/General/Button';
import EventCard from 'library/components/Events/EventCard';
import CustomText from 'library/components/General/CustomText';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

import R from 'res/R';

const titles = ['My Invites', 'My Events'];
const events = [{name: 'ViewEvent'}, {name: 'ManageEvent'}];

const slideDown = {
  0: {
    top: 0,
  },
  1: {
    top: R.constants.screenHeight,
  },
};

const slideUp = {
  0: {
    top: R.constants.screenHeight,
  },
  1: {
    top: 0,
  },
};

class Home extends React.Component {
  state = {
    userName: '',
    eventInvites: [],
    eventCreations: [],
    activeSlide: 0,
    maxHeight: 50,
    refreshing: false,

    addModalVisible: false,
  };

  //refs
  card = [];

  _onRefresh = () => {
    db.getUser().then(user => this._standardFetch(user));
  };

  componentDidMount() {
    db.getUser()
      .then(user => {
        this._handlePendingInvites(user.uid)
          .then(msg => {
            console.log(msg);
            this._standardFetch(user);
          })
          .catch(err => alert(err));
      })
      .catch(err => alert(err));
  }

  _standardFetch = user => {
    db.getProfileData(user.uid)
      // pull user profile data
      .then(data => {
        this.setState({
          userId: user.uid,
          userName: data.userName,
        });
      });
    // get event data for user
    Promise.all(
      ['eventCreations', 'eventInvites'].map(subtype => {
        db.getEvents(user.uid, subtype).then(res => {
          if (res.length === 0) {
            this.setState({[subtype]: res});
          } else {
            db.parseEventData(res)
              .then(eventData => this.setState({[subtype]: eventData}))
              .then(() =>
                this.setState({
                  maxHeight: this.getCarouselMaxHeight(),
                  refreshing: false,
                }),
              );
          }
        });
      }),
    );
  };

  _handleInviteCardPress() {
    console.log(this.state.activeSlide);
    const route = events[this.state.activeSlide];
    // add params to route to specify event id
    this.props.navigation.reset({
      index: 1,
      routes: [{name: 'User'}, route],
    });
  }

  handleEvent = index => {
    this.card[index]
      .animate(slideDown, 750)
      .then(() => this.props.navigation.navigate('Settings')) //modal
      .then(() => this.card[index].animate(slideUp, 500, 250));
  };

  _handlePendingInvites = uid =>
    new Promise(async (resolve, reject) => {
      const eid = await AsyncStorage.getItem('newInvite');
      if (eid !== null) {
        db.getEventData(eid)
          .then(invite => {
            if (invite.creator === uid) {
              resolve('You are hosting this event');
            } else {
              db.addEventToProfile(eid, uid, 'eventInvites')
                .then(msg => resolve(msg))
                .catch(err => reject(err));
            }
          })
          .then(() => AsyncStorage.removeItem('newInvite'))
          .catch(err => reject(err.message));
      } else {
        resolve('No pending invites.');
      }
    });

  renderCards = cardArray => {
    // let indexCategory = 0;
    return cardArray.item.map((item, index) => {
      return (
        <TouchableWithoutFeedback
          onPress={() => this._handleInviteCardPress(item)}>
          <View>
            <EventCard item={item} key={index} />
          </View>
        </TouchableWithoutFeedback>
      );
      // indexCategory += 1;
      // return (
      //   <TouchableWithoutFeedback
      //     onPress={() => this.handleEvent(index + indexCategory)}>
      //     <Animatable.View
      //       ref={ref => (this.card[index + indexCategory] = ref)}>
      //       <EventCard item={item} key={index} index={index} />
      //     </Animatable.View>
      //   </TouchableWithoutFeedback>
      // );
    });
  };

  get pagination() {
    const {eventInvites, eventCreations, activeSlide} = this.state;
    const data = [eventInvites, eventCreations];
    return (
      <Pagination
        dotsLength={data.length}
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

  getCarouselMaxHeight() {
    const invitesList = this.state.eventInvites.length;
    const hostList = this.state.eventCreations.length;
    if (invitesList >= hostList) {
      return invitesList * 266 + 20;
    } else {
      return hostList * 266 + 20;
    }
  }

  _handleModal = modal => {
    const visible = this.state[modal];
    this.setState({[modal]: !visible});
  };

  render() {
    const {eventInvites, eventCreations} = this.state;
    const data = [eventInvites, eventCreations];

    this.props.navigation.setOptions({
      title: this.state.userName,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Settings')}>
          <Icon name="menu" size={25} />
        </TouchableOpacity>
      ),
    });

    console.disableYellowBox = true;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          style={{flex: 1, paddingTop: '5%'}}>
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
            <Button long dark title="Edit Profile" />
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
        <View style={styles.moreButton}>
          <Button
            onPress={() => this._handleModal('addModalVisible')}
            customStyle={{
              shadowOpacity: 0.4,
              elevation: 1,
            }}
            icon
            round
            dark>
            <Icon name="plus" size={40} color="#FFF" />
          </Button>
          <Modal
            isVisible={this.state.addModalVisible}
            swipeDirection="down"
            onSwipeComplete={() => this._handleModal('addModalVisible')}
            onBackdropPress={() => this._handleModal('addModalVisible')}
            style={styles.modalContainer}>
            <View style={styles.modalCreateView}>
              <Button
                light
                customStyle={{marginTop: 0}}
                title="Find existing event"
              />
              <Button
                onPress={() => {
                  this._handleModal();
                  this.props.navigation.reset({
                    index: 1,
                    routes: [{name: 'User'}, {name: 'CreateEvent'}],
                  });
                }}
                title="Create new event"
                dark
              />
            </View>
          </Modal>
        </View>
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
    paddingTop: '2%',
    paddingLeft: '1%',
    alignSelf: 'center',
    width: R.constants.screenWidth * 0.9,
  },
  cardView: {
    alignItems: 'center',
    marginTop: '2%',
    flex: 1,
  },
  moreButton: {
    position: 'absolute',
    padding: '2.5%',
    bottom: 0,
    right: 0,
  },
  profileImgContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    marginBottom: 15,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalCreateView: {
    width: R.constants.screenWidth,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: 200,
  },
});

export default Home;
