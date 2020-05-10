import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import Button from 'library/components/General/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomText from 'library/components/General/CustomText';

import R from 'res/R';
import eventTypes from '../../res/defaults/eventData';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleCreateStage, setCreatePayload} from '../../state/actions/events';

class EventType extends React.Component {
  state = {
    private: true,
    selected: null,
  };

  handleVerifyType = () => {
    // format event data
    let eventData = eventTypes[this.state.selected];

    eventData.private = this.state.private;
    eventData.title = this.props.user.profile.userName + "'s" + ' Party';

    this.props.actions.setCreatePayload(eventData);
    this.props.actions.toggleCreateStage('EventTime');

    this.props.navigation.navigate('EventTime');
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
        <Button
          title="Next"
          onPress={this.handleVerifyType}
          grey={this.state.selected === null}
          disabled={this.state.selected === null}
        />
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
      <>
        <View style={styles.progressBar} />
        <View style={styles.container}>
          <View style={[styles.textContainer, styles.titleContainer]}>
            <CustomText
              label="What type of party are you organizing?"
              subtitle
            />
          </View>
          <View style={styles.selectContainer}>
            {eventTypes.map((item, index) => {
              let opacity = 0.6;
              let backgroundColor = '#9a9a9a';
              if (index === this.state.selected) {
                opacity = 1;
                backgroundColor = item.backgroundColor;
              }
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    this.setState({selected: index, private: item.private})
                  }
                  style={styles.selectView}>
                  <View style={styles.imgContainer}>
                    <Image
                      style={[styles.image, {opacity}]}
                      source={item.localImage}
                    />
                  </View>
                  <View style={[styles.text, {backgroundColor}]}>
                    <Text style={styles.size}>{item.size}</Text>
                    <Text style={styles.attendance}>{item.attendance}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          {this._renderPrivacy()}
        </View>
      </>
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
    width: '50%',
    height: '47%',
    padding: '2%',
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '2%',
  },
  imgContainer: {
    flex: 3,
    width: '100%',
  },
  text: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  size: {
    fontSize: 20,
    color: '#fff',
    fontFamily: R.fonts.comfortaaBold,
  },
  attendance: {
    color: '#fff',
    fontFamily: R.fonts.comfortaaRegular,
  },
  progressBar: {
    width: R.constants.screenWidth * 0.33,
    backgroundColor: '#000',
    position: 'absolute',
    height: 3,
  },
});

const ActionCreators = {
  toggleCreateStage,
  setCreatePayload,
};

const mapStateToProps = state => ({
  user: state.user,
  newEvent: state.newEvent,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventType);
