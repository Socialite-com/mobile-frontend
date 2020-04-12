import React from 'react';
import Modal from 'react-native-modal';
import {ImageBackground, StyleSheet} from 'react-native';

import {
  Invite,
  Field,
  Details,
  CountDown,
  Map,
} from 'library/components/Events/EventInvite';

import R from 'res/R';

class EditEventPage extends React.Component {
  constructor() {
    super();
    this.panels = {
      details: <Details text="Test" />,
      time: <CountDown timeLeft="2:00" />,
      location: <Map />,
    };
    this.state = {
      activePanel: 'details',
      isModalVisible: false,
    };
  }

  componentDidMount(): void {}

  _openPanel(panel) {
    this.setState({
      activePanel: panel,
      isModalVisible: true,
    });
  }

  _closePanel() {
    this.setState({
      activePanel: '',
      isModalVisible: false,
    });
  }

  render() {
    return (
      <>
        <ImageBackground
          style={styles.backgroundView}
          imageStyle={styles.bgImage}
          source={R.images.party2}>
          <Modal
            isVisible={this.state.isModalVisible}
            swipeDirection="down"
            animationIn="slideInDown"
            backdropOpacity={0.2}
            onSwipeComplete={() => this._closePanel()}
            onBackdropPress={() => this._closePanel()}
            style={styles.modalContainer}>
            {this.panels[this.state.activePanel]}
          </Modal>
        </ImageBackground>
        <Invite navigator={this.props.navigation}>
          <Field
            onPress={() => this._openPanel('location')}
            header="Where"
            body="Marianopolis College, Westmount"
          />
          <Field
            onPress={() => this._openPanel('time')}
            header="When"
            body="May 11th, 2020 at 8:00 pm"
          />
          <Field
            onPress={() => this._openPanel('details')}
            header="Details"
            body="Marianopolis Student Union end of semester party."
          />
          <Field header="Entry" body="5$" />
        </Invite>
      </>
    );
  }
}

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bgImage: {
    width: R.constants.screenWidth * 1.2,
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-start',
  },
});

export default EditEventPage;
