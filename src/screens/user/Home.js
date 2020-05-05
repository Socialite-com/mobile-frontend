import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import db from 'state/database';

import ProfileCircle from 'library/components/User/profileCircle';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CustomText from 'library/components/General/CustomText';
import EventCard from 'library/components/Events/EventCard';
import Button from 'library/components/General/Button';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

// import * as Animatable from 'react-native-animatable';

import R from 'res/R';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUserProfileIfNeeded} from '../../state/actions/users';
import {
  toggleCarousel,
  changeCarouselHeight,
  fetchUserEventsIfNeeded,
} from '../../state/actions/events';

const titles = ['My Invites', 'My Events'];
const eventPaths = ['ViewEvent', 'ManageEvent'];

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
  constructor(props) {
    super(props);

    this.state = {
      addModalVisible: false,
    };

    //refs
    this.card = [];
  }

  componentDidMount() {
    const {uid} = this.props.user;
    this._handlePendingInvites(uid)
      .then(msg => console.log(msg))
      .catch(err => alert(err));
    this._onRefresh();
  }

  _onRefresh = () => {
    const {uid} = this.props.user;
    Promise.all([
      this.props.actions
        .fetchUserProfileIfNeeded(uid)
        .then(() => console.log('fetched user profile')),

      this.props.actions
        .fetchUserEventsIfNeeded(uid, 'eventCreations')
        .then(() => console.log('fetched event creations')),

      this.props.actions
        .fetchUserEventsIfNeeded(uid, 'eventInvites')
        .then(() => console.log('fetched invites')),
    ]).then(() => {
      console.log('Finished Loading');
      const {eventInvites, eventCreations} = this.props.userEvents;
      this.props.actions.changeCarouselHeight(
        eventInvites.data.length,
        eventCreations.data.length,
      );
    });
  };

  handleEvent = index => {
    this.card[index]
      .animate(slideDown, 750)
      .then(() => this.props.navigation.navigate('Settings')) //modal
      .then(() => this.card[index].animate(slideUp, 500, 250));
  };

  _handleInviteCardPress() {
    const route = eventPaths[this.props.userEvents.activeSlide];
    // add params to route to specify event id
    this.props.navigation.navigate(route);
  }

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
          key={index}
          onPress={() => this._handleInviteCardPress(item)}>
          <View>
            <EventCard data={item} />
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

  pagination(activeSlide, dataLength) {
    return (
      <Pagination
        dotsLength={dataLength}
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

  _handleModal = modal => {
    const visible = this.state[modal];
    this.setState({[modal]: !visible});
  };

  render() {
    const {profile, isFetching} = this.props.user;
    const {
      activeSlide,
      carouselHeight,
      eventInvites,
      eventCreations,
    } = this.props.userEvents;

    const data = [eventInvites.data, eventCreations.data];
    const refreshing = [
      eventInvites.isFetching,
      eventCreations.isFetching,
      isFetching,
    ].some(x => x === true);

    this.props.navigation.setOptions({
      title: profile.userName,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Settings')}>
          <Icon name="menu" size={25} color={R.color.secondary} />
        </TouchableOpacity>
      ),
    });

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              tintColor={R.color.secondary}
              onRefresh={this._onRefresh}
              refreshing={refreshing}
            />
          }
          style={{flex: 1, paddingTop: '5%'}}>
          {refreshing ? (
            <></>
          ) : (
            <>
              <View style={styles.profileContainer}>
                <ProfileCircle main profile={profile} />
                <CustomText subtitle center label={profile.userName} />
                <CustomText subtitle_2 center label="Montreal, CA" />
                <Button long title="Edit Profile" />
              </View>
              <View style={styles.inviteView}>
                <View
                  style={{
                    paddingTop: '2%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText subtitle_2 label={titles[activeSlide]} />
                  {this.pagination(activeSlide, data.length)}
                </View>
                <View style={styles.cardView}>
                  <Carousel
                    data={data}
                    renderItem={this.renderCards}
                    behaviour={{firstItem: activeSlide}}
                    sliderWidth={R.constants.screenWidth * 2}
                    itemWidth={R.constants.screenWidth * 0.9}
                    containerCustomStyle={{height: carouselHeight}}
                    onSnapToItem={index =>
                      this.props.actions.toggleCarousel(index)
                    }
                  />
                </View>
              </View>
            </>
          )}
        </ScrollView>
        <View style={styles.moreButton}>
          <Button
            onPress={() => this._handleModal('addModalVisible')}
            customStyle={{
              shadowOpacity: 0.4,
              elevation: 1,
            }}
            icon
            round>
            <Icon name="plus" size={40} color={R.color.primary} />
          </Button>
          <Modal
            isVisible={this.state.addModalVisible}
            swipeDirection="down"
            onSwipeComplete={() => this._handleModal('addModalVisible')}
            onBackdropPress={() => this._handleModal('addModalVisible')}
            style={styles.modalContainer}>
            <View style={styles.modalCreateView}>
              <Button
                swap
                customStyle={{marginTop: 0}}
                title="Find existing event"
              />
              <Button
                onPress={() => {
                  this._handleModal('addModalVisible');
                  this.props.navigation.navigate('CreateEvent', {
                    screen: 'EventType',
                    params: {user: profile.userName},
                  });
                }}
                title="Create new event"
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
    backgroundColor: R.color.secondary,
    justifyContent: 'center',
    marginBottom: 15,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalCreateView: {
    backgroundColor: R.color.primary,
    width: R.constants.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: 200,
  },
});

const ActionCreators = {
  toggleCarousel,
  changeCarouselHeight,
  fetchUserEventsIfNeeded,
  fetchUserProfileIfNeeded,
};

const mapStateToProps = state => ({
  user: state.user,
  userEvents: state.userEvents,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
