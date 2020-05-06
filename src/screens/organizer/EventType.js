import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import CustomText from 'library/components/General/CustomText';
import Button from 'library/components/General/Button';
import Icon from 'react-native-vector-icons/AntDesign';

import R from 'res/R';

class EventType extends React.Component {
  state = {
    private: true,
    selected: null,
    userName: this.props.route.params.user,
  };

  handleVerifyType = () => {
    // format event data
    let eventData = R.eventTypes[this.state.selected];
    eventData.private = this.state.private;
    eventData.title = this.state.userName + "'s" + ' Party';
    this.props.navigation.navigate('EventTime', {data: eventData});
  };

  _renderPrivacy = () => {
    return (
      <View style={{flex: 2}}>
        <View style={styles.buttonContainer}>
          <Button
            half
            title="Private"
            swap={!this.state.private}
            onPress={() => this.setState({private: true})}
          />
          <Button
            half
            title="Public"
            swap={this.state.private}
            onPress={() => this.setState({private: false})}
          />
        </View>
        <Button title="Next" onPress={this.handleVerifyType} />
      </View>
    );
  };

  render() {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
          <Icon name="close" size={25} />
        </TouchableOpacity>
      ),
    });

    return (
      <View style={styles.container}>
        <View style={[styles.textContainer, styles.titleContainer]}>
          <CustomText label="What type of party are you organizing?" subtitle />
        </View>
        <View style={styles.selectContainer}>
          {R.eventTypes.map((item, index) => {
            let borderWidth;
            if (index === this.state.selected) {
              borderWidth = 2;
            } else {
              borderWidth = 0;
            }
            return (
              <TouchableOpacity
                onPress={() =>
                  this.setState({selected: index, private: item.private})
                }
                style={[styles.selectView, {borderWidth: borderWidth}]}>
                <View style={{flex: 2, justifyContent: 'center'}}>
                  {/*TODO Anton add designs specifying party size*/}
                  <CustomText subtitle_2 label="Add design" />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <CustomText label={item.size} />
                  <CustomText title label={item.attendance} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {this._renderPrivacy()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
  },
  titleContainer: {
    paddingBottom: '5%',
  },
  textContainer: {
    overflow: 'scroll',
    width: R.constants.screenWidth * 0.8,
  },
  selectContainer: {
    flex: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: R.constants.screenWidth * 0.85,
  },
  selectView: {
    height: '47%',
    width: '50%',
    padding: '2%',
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '2%',
  },
});

export default EventType;

//On select image popup bottom drawer
//make possible to close/swipe down
//fix styling on the next one
