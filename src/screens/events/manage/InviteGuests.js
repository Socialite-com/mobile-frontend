import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import UserTab from 'library/components/User/UserTab';
import TextForm from 'library/components/General/TextInput';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  setEventAction,
  setDefaultAction,
} from '../../../state/actions/eventPage';

class InviteGuests extends React.Component {
  state = {
    search: '',
    guests: [
      {userName: 'Michael Lu', status: 'Going', score: '1950'},
      {userName: 'Stephen Lu', status: 'Going', score: '178'},
      {userName: 'Anton Otaner', status: 'Going', score: '2032'},
      {userName: 'Justin Lacoste', status: 'Going', score: '100'},
      {userName: 'Kim Jun Un', status: 'Maybe', score: '0'},
      {userName: 'Donald Trump', status: 'Maybe', score: '10300'},
      {userName: 'Justin Trudeau', status: 'Declined', score: '738'},
      {userName: 'MemeLord', status: 'Declined', score: '112'},
    ],
  };

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.actionTab}>
          <View style={styles.searchTab}>
            <TextForm
              onChangeText={search => this.setState({search})}
              value={this.state.search}
              placeholder="Search"
              searchbar
            />
          </View>
        </View>
        <View style={styles.guestList}>
          <ScrollView>
            {this.state.guests.map((item, index) => {
              return <UserTab item={item} key={index} />;
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
  },
  actionTab: {
    flex: 3,
    marginBottom: '2%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'flex-end',
    paddingHorizontal: '3%',
    borderBottomColor: '#262626',
    justifyContent: 'space-between',
  },
  searchTab: {
    height: 40,
    width: '100%',
    // paddingBottom: '4%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  guestList: {
    flex: 10,
  },
});

const ActionCreators = {
  setEventAction,
  setDefaultAction,
};

const mapStateToProps = state => ({
  user: state.user,
  eventPage: state.eventPage,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteGuests);
