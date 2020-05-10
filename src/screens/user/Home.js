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

import ProfileCircle from 'library/components/User/profileCircle';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CustomText from 'library/components/General/CustomText';
import EventCard from 'library/components/Events/EventCard';
import Button from 'library/components/General/Button';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

import R from 'res/R';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectEvent} from '../../state/actions/eventPage';
import {fetchUserProfileIfNeeded} from '../../state/actions/users';
import {
  toggleCarousel,
  changeCarouselHeight,
  _handlePendingInvites,
  fetchUserEventsIfNeeded,
} from '../../state/actions/events';

const eventTypes = ['invite', 'manage'];
const titles = ['My Invites', 'My Parties'];
const eventPaths = ['ViewEvent', 'ManageEvent'];
const placeholders = [
  'You currently have no invites.',
  'You have not organized any parties yet.',
];

class Home extends React.Component {
  state = {
    addModalVisible: false,
  };

  componentDidMount() {
    this.props.actions._handlePendingInvites().then(() => this._onRefresh());
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

  _handleInviteCardPress(item) {
    const index = this.props.userEvents.activeSlide;
    const route = eventPaths[index];
    this.props.actions.selectEvent(eventTypes[index], item).then(() => {
      this.props.navigation.navigate(route);
    });
  }

  renderCards = cardArray => {
    if (cardArray.item.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Icon name="slash" size={40} />
          <CustomText
            customStyle={{marginTop: '6%', textAlign: 'center'}}
            label={placeholders[cardArray.index]}
          />
        </View>
      );
    } else {
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
      });
    }
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
      eventInvites,
      carouselHeight,
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
                    paddingLeft: '3%',
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
                    firstItem={this.props.userEvents.activeSlide}
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
    alignItems: 'center',
    justifyContent: 'center',
    height: R.constants.screenHeight * 0.2,
  },
  inviteView: {
    flex: 5,
    paddingTop: '2%',
    alignSelf: 'center',
    width: R.constants.screenWidth * 0.9,
    minHeight: R.constants.screenHeight * 0.6,
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
  emptyView: {
    alignItems: 'center',
    marginVertical: '10%',
    marginHorizontal: '25%',
    justifyContent: 'center',
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
  selectEvent,
  toggleCarousel,
  changeCarouselHeight,
  _handlePendingInvites,
  fetchUserEventsIfNeeded,
  fetchUserProfileIfNeeded,
};

const mapStateToProps = state => ({
  user: state.user,
  newEvent: state.newEvent,
  userEvents: state.userEvents,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
