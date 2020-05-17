import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import CustomText from 'library/components/General/CustomText';

import R from 'res/R';

class Announcement extends React.Component {
  timeConverter(timestamp) {
    var a = new Date(timestamp);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time =
      month +
      ' ' +
      date +
      ' ' +
      ('0' + hour).slice(-2) +
      ':' +
      ('0' + min).slice(-2);
    return time;
  }

  render() {
    return (
      <View style={{marginTop: 20}}>
        <CustomText
          label={this.timeConverter(this.props.time)}
          customStyle={styles.timeText}
        />
        <View style={styles.container}>
          <CustomText label={this.props.text} customStyle={styles.postText} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 6,
    padding: 15,
    margin: 5,
    backgroundColor: '#333333',
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '15%',
  },
  postText: {
    paddingLeft: 10,
    width: '100%',
    color: '#fff',
  },
  timeText: {
    paddingLeft: 10,
    width: '80%',
    color: '#656565',
    fontSize: 14,
    fontFamily: R.fonts.comfortaaBold,
  },
});

export default Announcement;
