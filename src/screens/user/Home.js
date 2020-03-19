import React from 'react';
import {
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';

import { getUser, getProfileData } from "library/networking/database";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { createEventCard } from "../../library/components/EventCard";
import CustomText from "library/components/CustomText";

import R from "res/R";

const titles = ["My Invites", "My Events"];

class Home extends React.Component {
  state = {
    userName: "",
    data: [
      [
        { eventName: "Janice Birthday Party", color: '#00af9e', eventTime: "Fri, Apr 11, 9 PM", privacy: 'Private', organizer: "Janice Chen" },
        { eventName: "Block Party 3", color: '#61a4ff', imageIcon: R.images.oscars, eventTime: "Fri, Apr 11, 9 PM", privacy: 'Public', organizer: "MTL Nights Out" },
        { eventName: "MSU Party", color: '#ffa031', imageIcon: R.images.party, eventTime: "Sun, Apr 12, 6 PM", privacy: 'Public', organizer: "Marianopolis Student Union", qrCode: R.images.qrCode },
      ],
      [
        { eventName: "Big 18", color: 'black', eventTime: "Sat, Mar 21, 6:45 PM", privacy: 'Private', organizer: "Stephen Lu", qrCode: R.images.qrCode },
      ]
    ],
    activeSlide: 0,
    maxHeight: 500
  };

  async componentDidMount() {
    let user = await getUser();
    let profile = await getProfileData(user.uid);
    this.setState({
      userId: user.uid,
      userName: profile.userName,
      maxHeight: this.getCarouselMaxHeight()
    })
  }

  renderCards(cardArray) {
    return cardArray.item.map((item, index) => {
      return (createEventCard(item, index))
    })
  }

  get pagination () {
    const { data, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{ width: 20, height: 0, paddingVertical: '3%'}}
        dotStyle={{
            width: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(0,0,0,0.92)'
        }}
        inactiveDotStyle={{
            // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  getCarouselMaxHeight() {
    const invitesList = this.state.data[0].length;
    const hostList = this.state.data[1].length;
    if ( invitesList >= hostList ) { return invitesList * 82 + 170 }
    else { return hostList * 82 + 170 }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1, paddingTop: '5%'}}>
          <View style={styles.profileContainer}>
            <TouchableHighlight style={styles.profileImgContainer}>
              <CustomText splash center label={this.state.userName.charAt(0).toUpperCase()} />
            </TouchableHighlight>
            <CustomText subtitle center label={this.state.userName} />
            <CustomText subtitle_2 center label="Montreal, CA" />
          </View>
          <View style={styles.inviteView}>
            <View style={{paddingTop: '2%', flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomText subtitle_2 label={titles[this.state.activeSlide]} />
              { this.pagination }
            </View>
            <View style={styles.cardView}>
              <Carousel
                data={this.state.data}
                renderItem={this.renderCards}
                sliderWidth={R.constants.screenWidth * 2}
                itemWidth={R.constants.screenWidth * 0.9}
                containerCustomStyle={{ height: this.state.maxHeight }}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
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
    justifyContent: 'center'
  },
  inviteView: {
    flex: 5,
    paddingTop: '5%',
    paddingLeft: '1%',
    alignSelf: 'center',
    width: R.constants.screenWidth * 0.9
  },
  cardView: {
    alignItems: 'center',
    marginTop: '2%',
    flex: 1
  },
  profileImgContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    marginBottom: 15
  }
});

export default Home;
