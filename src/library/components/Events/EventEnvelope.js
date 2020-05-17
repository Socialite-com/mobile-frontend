import React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Modal from 'react-native-modal';
import actions from './actions/envelopeActions';
import responses from './actions/responseActions';
import CustomText from '../General/CustomText';
import RadioButton from '../General/RadioButton';
import Icon from 'react-native-vector-icons/Feather';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import R from 'res/R';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  setEventAction,
  setDefaultAction,
} from '../../../state/actions/eventPage';

class Envelope extends React.Component {
  state = {
    modalVisible: false,
    modal: null,
  };

  toggleModal() {
    const visibility = this.state.modalVisible;
    this.setState({modalVisible: !visibility});
  }

  async _pressButton(action) {
    const {type, data} = this.props.eventPage;
    switch (action) {
      case 'save':
      case 'cancel':
        this.props.actions.setDefaultAction(type, data);
        this.props.navigation.navigate('Event Page');
        break;
      case 'edit':
        this.props.actions.setEventAction('save');
        this.props.navigation.navigate('Edit Event');
        break;
      case 'share':
        this.props.actions.setEventAction('cancel');
        this.props.navigation.navigate('Share Event');
        break;
      case 'respond':
        this.setState({modal: action});
        this.toggleModal();
        break;
      case 'Pay':
        this.toggleModal();
        this.props.actions.setEventAction('cancel');
        this.props.navigation.navigate('Payment');
        break;
      default:
        return alert(action);
    }
  }

  respond = () => {
    const data = this.props.eventPage.data;
    const response = data.details.paid ? responses.paid : responses.free;
    return (
      <View>
        <View style={modalStyles.header}>
          <CustomText customStyle={modalStyles.bold} label="Your Response" />
        </View>
        <View style={{marginVertical: 15}}>
          {response.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={modalStyles.responseView}
                onPress={() => this._pressButton(item.label)}>
                <View style={modalStyles.label}>
                  <Icon name={item.icon} size={25} />
                  <View>
                    <CustomText
                      customStyle={{marginLeft: 15}}
                      label={item.label}
                    />
                  </View>
                </View>
                <View>
                  {item.action === 'go' ? (
                    <Icon5 name="chevron-right" size={20} />
                  ) : item.action === 'radio' ? (
                    <RadioButton disabled />
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  renderModal(content) {
    const {modalVisible} = this.state;
    return (
      <Modal
        swipeDirection="down"
        backdropOpacity={0.4}
        isVisible={modalVisible}
        onBackdropPress={() => this.toggleModal()}
        style={modalStyles.modalContainer}>
        <View style={modalStyles.modalView}>
          {content === 'respond' ? this.respond() : null}
        </View>
      </Modal>
    );
  }

  render() {
    const {type, action, data} = this.props.eventPage;
    let preset = actions[action];

    return (
      <View
        style={[
          styles.envelope,
          {backgroundColor: data.details.backgroundColor},
        ]}>
        <View style={{flex: 2}}>
          <Text style={styles.title}>{data.details.title}</Text>
          <Text style={styles.eventType}>
            {data.details.private ? 'Private' : 'Public'} •{' '}
            {data.details.paid ? 'Paid' : 'Free'}
          </Text>
        </View>
        <View style={{flex: 1}}>
          {preset.map((item, index) => {
            const customStyle = {
              height: `${100 / preset.length}%`,
              backgroundColor: item.backgroundColor,
            };
            return (
              <TouchableOpacity
                key={index}
                style={[styles.actionBtn, customStyle]}
                onPress={() => this._pressButton(item.action)}>
                <CustomText label={item.label} customStyle={{color: '#fff'}} />
              </TouchableOpacity>
            );
          })}
        </View>
        {this.renderModal(this.state.modal)}
      </View>
    );
  }
}

const modalStyles = StyleSheet.create({
  modalContainer: {margin: 0, justifyContent: 'flex-end'},
  modalView: {
    padding: '5%',
    height: 'auto',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  header: {
    paddingBottom: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#c6c6c6',
    justifyContent: 'center',
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {
    fontFamily: R.fonts.comfortaaBold,
  },
  responseView: {
    height: 50,
    width: '100%',
    marginVertical: 5,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
});

const styles = StyleSheet.create({
  envelope: {
    paddingLeft: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    width: R.constants.screenWidth,
    justifyContent: 'space-between',
    height: R.constants.screenHeight * 0.1,
  },
  eventType: {
    fontSize: 14,
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: R.fonts.robotoLight,
  },
  actionBtn: {
    flex: 1,
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {fontSize: 20, color: 'white', fontFamily: R.fonts.comfortaaBold},
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

export default connect(mapStateToProps, mapDispatchToProps)(Envelope);
