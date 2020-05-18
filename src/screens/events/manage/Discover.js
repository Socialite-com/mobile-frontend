import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import R from 'res/R';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Discover extends React.Component {
  state = {
    message: '',
    modalVisible: false,
  };

  componentDidMount() {
    console.log(this.props.eventPage);
  }

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  //open new window
  //show announcements

  render() {
    const {type, selected} = this.props.eventPage;
    const data = this.props.userEvents[type].data[selected];
    return (
      <View style={styles.mainView}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    padding: 10,
  },
});

const ActionCreators = {};

const mapStateToProps = state => ({
  eventPage: state.eventPage,
  userEvents: state.userEvents,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
