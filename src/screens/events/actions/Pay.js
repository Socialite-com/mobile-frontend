import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import R from 'res/R';
import {PaymentCardTextField} from 'tipsi-stripe';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../../../library/components/General/Button';
import CustomText from '../../../library/components/General/CustomText';
import RadioButton from '../../../library/components/General/RadioButton';

class Payment extends React.Component {
  state = {
    useNewCard: true,
    saveCard: false,
    savedCard: {
      id: 'test_id',
      end: '0000',
    },
  };

  render() {
    const totalPrice = '16$';
    const prices = [
      {name: 'Ticket Price', value: '15$'},
      {name: 'Transaction Fee', value: '1$'},
    ];
    const {useNewCard, savedCard, saveCard} = this.state;
    return (
      <View style={{flex: 1, padding: '5%'}}>
        <View style={{flex: 6, padding: '3%'}}>
          <View style={{flex: 1}}>
            <CustomText subtitle label="Confirm Payment" />
          </View>
          <View style={{flex: 2}}>
            {prices.map((item, index) => {
              return (
                <View style={styles.row} key={index}>
                  <CustomText subtitle_4 label={item.name} />
                  <CustomText subtitle_4 label={item.value} />
                </View>
              );
            })}
            <View style={styles.priceDataContainer} />
            <View style={styles.row}>
              <CustomText subtitle_5 label="Total" />
              <CustomText subtitle_5 label={totalPrice} />
            </View>
          </View>
          <View style={styles.btnView}>
            <Button title="Pay with  Pay" />
          </View>
        </View>
        <View style={styles.topBottomBorder}>
          <CustomText center subtitle_4 label="or pay with card" />
        </View>
        <View style={{flex: 7, padding: '3%'}}>
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
              style={[styles.field, !useNewCard && styles.disabledField]}
            />
            <RadioButton
              checkbox
              isSelected={saveCard}
              onSelect={() => this.setState({saveCard: !saveCard})}
              label="Save payment information to my account for future purchases"
            />
          </View>
          <View style={styles.btnView}>
            <Button title="Pay with Card" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  exitView: {flex: 1, flexDirection: 'row', justifyContent: 'flex-end'},
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

export default Payment;
