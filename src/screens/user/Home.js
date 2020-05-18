import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
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

import eventTypes from '../../res/defaults/eventTypes';

class Home extends React.Component {
  state = {
    addModalVisible: false,
    enableScrollView: true,
  };

  componentDidMount() {
    this.props.actions._handlePendingInvites().then(() => this._onRefresh());
  }

  _onRefresh = async () => {
    const {uid} = this.props.user;
    this.props.actions
      .fetchUserProfileIfNeeded(uid)
      .then(() => console.log('fetched user profile'));
    await Promise.all(
      eventTypes.map(async (item, index) => {
        await this.props.actions
          .fetchUserEventsIfNeeded(uid, item.id_)
          .then(() => console.log(`Fetched ${item.id_}`));
      }),
    );

    console.log('Finished Loading');
    const {activeSlide} = this.props.userEvents;
    this.props.actions.changeCarouselHeight(
      this.props.userEvents[eventTypes[activeSlide].id_].data.length,
    );
  };

  _handleInviteCardPress(i) {
    const index = this.props.userEvents.activeSlide;
    this.props.actions.selectEvent(eventTypes[index].id_, i).then(() => {
      this.props.navigation.navigate('ManageEvent');
    });
  }

  renderProfile(profile) {
    return (
      <View style={styles.profileContainer}>
        <ProfileCircle main profile={profile} />
        <CustomText subtitle label={profile.userName} />
        <CustomText subtitle_2 label="Montreal, CA" />
        {/*<Button long title="Edit Profile" />*/}
      </View>
    );
  }

  pagination(activeSlide, data) {
    const width = (100 / data.length).toString() + '%';
    return (
      <View style={styles.pagination}>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          carouselRef={this.carouselRef}
          tappableDots={!!this.carouselRef}
          renderDots={activeIndex =>
            eventTypes.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {width, borderBottomWidth: activeIndex === index ? 2 : 0},
                ]}
                onPress={() => {
                  this.props.actions.toggleCarousel(index);
                  this.props.actions.changeCarouselHeight(data[index].length);
                }}>
                <Icon
                  color={index === activeIndex ? '#000' : '#c6c6c6'}
                  name={item.icon}
                  size={30}
                />
                <CustomText customStyle={{fontSize: 12}} label={item.label} />
              </TouchableOpacity>
            ))
          }
        />
      </View>
    );
  }

  renderEvents(data, activeSlide, carouselHeight) {
    return (
      <View style={styles.inviteView}>
        <View style={styles.cardView}>
          <Carousel
            data={data}
            renderItem={this.renderCards}
            behaviour={{firstItem: activeSlide}}
            ref={ref => (this.carouselRef = ref)}
            sliderWidth={R.constants.screenWidth * 2}
            itemWidth={R.constants.screenWidth * 0.9}
            containerCustomStyle={{height: carouselHeight}}
            firstItem={this.props.userEvents.activeSlide}
            onSnapToItem={index => {
              this.props.actions.toggleCarousel(index);
              this.props.actions.changeCarouselHeight(data[index].length);
            }}
          />
        </View>
      </View>
    );
  }

  renderCards = cardArray => {
    const eventType = eventTypes[cardArray.index];
    if (cardArray.item.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Icon name={eventType.icon} size={40} />
          <CustomText
            customStyle={{marginTop: '6%', textAlign: 'center'}}
            label={eventType.placeholder}
          />
        </View>
      );
    } else {
      return (
        <View style={{height: '100%'}}>
          <FlatList
            data={cardArray.item}
            scrollEnabled={false}
            initialNumToRender={2}
            scrollEventThrottle={0}
            renderItem={({item, index}) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this._handleInviteCardPress(index)}>
                <View>
                  <EventCard data={item} />
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      );
      // return cardArray.item.map((item, index) => {
      //   return (
      //   );
      // });
    }
  };

  _handleModal = modal => {
    const visible = this.state[modal];
    this.setState({[modal]: !visible});
  };

  render() {
    const {profile, isFetching} = this.props.user;
    const {activeSlide, carouselHeight} = this.props.userEvents;

    const data = eventTypes.map(item => this.props.userEvents[item.id_].data);
    const refreshing = eventTypes
      .map(item => this.props.userEvents[item.id_].isFetching)
      .concat([isFetching])
      .some(x => x === true);

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
          stickyHeaderIndices={[1]}
          // onScroll={event => {
          //   const y = event.nativeEvent.contentOffset.y;
          //   if (y > R.constants.screenHeight * 0.15) {
          //     this.setState({enableScrollView: false});
          //   } else {
          //     this.setState({enableScrollView: true});
          //   }
          // }}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={0}
          refreshControl={
            <RefreshControl
              tintColor={R.color.secondary}
              onRefresh={this._onRefresh}
              refreshing={refreshing}
            />
          }
          style={{flex: 1}}>
          {isFetching ? null : this.renderProfile(profile)}
          {this.pagination(activeSlide, data)}
          {refreshing
            ? null
            : this.renderEvents(data, activeSlide, carouselHeight)}
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
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: R.constants.screenHeight * 0.15,
  },
  inviteView: {
    // flex: 5,
    paddingTop: '2%',
    minHeight: '100%',
    alignSelf: 'center',
    width: R.constants.screenWidth * 0.9,
  },
  cardView: {
    alignItems: 'center',
    marginTop: '2%',
    // flex: 1,
  },
  moreButton: {
    position: 'absolute',
    padding: '2.5%',
    bottom: 0,
    right: 0,
  },
  dot: {
    margin: 0,
    height: 65,
    padding: 0,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    height: 65,
    marginTop: 20,
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#c6c6c6',
    backgroundColor: '#fff',
    width: R.constants.screenWidth,
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
