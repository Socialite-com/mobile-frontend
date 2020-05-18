import React from 'react';
import {TouchableOpacity, StyleSheet, ScrollView, View} from 'react-native';

import CustomText from '../../../library/components/General/CustomText';
import EventCard from '../../../library/components/Events/EventCard';
import Icon from 'react-native-vector-icons/Feather';

import R from 'res/R';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
  links,
  shareLink,
} from '../../../library/components/Events/actions/shareActions';

class ShareEvent extends React.Component {
  state = {};

  render() {
    const {selected, type} = this.props.eventPage;
    const data = this.props.userEvents[type].data[selected];
    return (
      <ScrollView>
        <View style={styles.input}>
          <EventCard data={data} edit />
        </View>
        <View style={styles.input}>
          {links.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.shareTab}
                onPress={() =>
                  shareLink(item.name, data)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                }>
                <View style={{flex: 8}}>
                  <CustomText label={item.name} />
                  {item.details ? (
                    <CustomText
                      customStyle={{fontSize: 12}}
                      label={item.details}
                    />
                  ) : null}
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Icon name={item.icon} size={30} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={[styles.input, {paddingHorizontal: '3%'}]}>
          <CustomText
            customStyle={{fontSize: 14, textAlign: 'justify'}}
            label="All share actions will send your party card and a link directing your invitees to your event page."
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
    justifyContent: 'space-between',
  },
  shareTab: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    alignSelf: 'center',
    marginVertical: '2%',
    width: R.constants.screenWidth * 0.85,
  },
});

const ActionCreators = {};

const mapStateToProps = state => ({
  user: state.user,
  eventPage: state.eventPage,
  userEvents: state.userEvents,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareEvent);
