import React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {PaymentCardTextField} from 'tipsi-stripe';

import Modal from 'react-native-modal';
import Button from '../General/Button';
import CustomText from '../General/CustomText';
import RadioButton from '../General/RadioButton';

import R from 'res/R';
import {connect} from 'react-redux';

const payload = {
  invite: [
    {label: 'Confirm', backgroundColor: '#51a327', action: 'confirm'},
    {label: 'Decline', backgroundColor: '#db4a4a', action: 'decline'},
  ],
  manage: [
    {label: 'Edit', backgroundColor: '#413aad', action: 'edit'},
    {label: 'Publish', backgroundColor: '#b1a41c', action: 'publish'},
  ],
  public: [
    {label: 'Confirm', backgroundColor: '#51a327', action: 'confirm'},
    {label: 'Star', backgroundColor: '#45cd77', action: 'star'},
  ],
};

class Envelope extends React.Component {
  state = {
    saveCard: false,
    useNewCard: true,
    modalVisible: false,
    savedCard: {
      id: 'test_id',
      end: '0000',
    },
  };

  componentDidMount() {}

  toggleModal() {
    const visibility = this.state.modalVisible;
    this.setState({modalVisible: !visibility});
  }

  _pressButton(type) {
    switch (type) {
      case 'confirm':
        return this.toggleModal();
      default:
        return alert(type);
    }
  }

  renderModal() {
    const {modalVisible, useNewCard, savedCard, saveCard} = this.state;

    const totalPrice = '16$';

    const prices = [
      {name: 'Ticket Price', value: '15$'},
      {name: 'Transaction Fee', value: '1$'},
    ];

    return (
      <Modal
        swipeDirection="down"
        backdropOpacity={0.4}
        isVisible={modalVisible}
        onBackdropPress={() => this.toggleModal()}
        style={paymentStyles.paymentModalContainer}>
        <View style={paymentStyles.modalPaymentView}>
          <View style={paymentStyles.exitView}>
            <TouchableOpacity onPress={() => this.toggleModal()}>
              <Icon name="close" size={25} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 6}}>
            <View style={{flex: 1}}>
              <CustomText subtitle label="Confirm Payment" />
            </View>
            <View style={{flex: 2}}>
              {prices.map((item, index) => {
                return (
                  <View style={paymentStyles.row} key={index}>
                    <CustomText subtitle_4 label={item.name} />
                    <CustomText subtitle_4 label={item.value} />
                  </View>
                );
              })}
              <View style={paymentStyles.priceDataContainer} />
              <View style={paymentStyles.row}>
                <CustomText subtitle_5 label="Total" />
                <CustomText subtitle_5 label={totalPrice} />
              </View>
            </View>
            <View style={paymentStyles.btnView}>
              <Button title="Pay with  Pay" />
            </View>
          </View>
          <View style={paymentStyles.topBottomBorder}>
            <CustomText center subtitle_4 label="or pay with card" />
          </View>
          <View style={{flex: 7}}>
            <View style={{flex: 1}}>
              <RadioButton
                onSelect={() => this.setState({useNewCard: !useNewCard})}
                label="Use a new payment method"
                isSelected={useNewCard}
                disabled={useNewCard}
              />
              {savedCard.id && (
                <RadioButton
                  onSelect={() => this.setState({useNewCard: !useNewCard})}
                  label={`Visa ending in ${savedCard.end}`}
                  isSelected={!useNewCard}
                  disabled={!useNewCard}
                />
              )}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <PaymentCardTextField
                disabled={!useNewCard}
                style={[
                  paymentStyles.field,
                  !useNewCard && paymentStyles.disabledField,
                ]}
              />
              <RadioButton
                checkbox
                isSelected={saveCard}
                onSelect={() => this.setState({saveCard: !saveCard})}
                label="Save payment information to my account for future purchases"
              />
            </View>
            <View style={paymentStyles.btnView}>
              <Button title="Pay with Card" />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const {type, data} = this.props.eventPage;
    const preset = payload[type];

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
        {this.renderModal()}
      </View>
    );
  }
}

const paymentStyles = StyleSheet.create({
  paymentModalContainer: {margin: 0, justifyContent: 'flex-end'},
  btnView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  exitView: {flex: 1, flexDirection: 'row', justifyContent: 'flex-end'},
  modalPaymentView: {
    padding: '5%',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: R.constants.screenHeight * 0.9,
  },
  row: {
    flexDirection: 'row',
    marginVertical: '3%',
    justifyContent: 'space-between',
  },
  topBottomBorder: {
    flex: 1,
    borderTopWidth: 1,
    marginVertical: '5%',
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderColor: 'rgba(162,162,162,0.46)',
  },
  field: {
    borderWidth: 1,
    borderRadius: 5,
    color: '#000e78',
    borderColor: '#000',
    width: R.constants.screenWidth * 0.8,
  },
  disabledField: {
    color: '#cfcfcf',
    borderColor: '#cfcfcf',
    backgroundColor: '#ebebeb',
  },
  priceDataContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(162,162,162,0.46)',
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

const mapStateToProps = state => ({
  user: state.user,
  eventPage: state.eventPage,
});

export default connect(mapStateToProps)(Envelope);
