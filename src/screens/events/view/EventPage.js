import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import stripe, {PaymentCardTextField} from 'tipsi-stripe';

import {
  Invite,
  Field,
  Details,
  CountDown,
  Map,
} from 'library/components/Events/EventInvite';

import R from 'res/R';
import Button from 'library/components/General/Button';
import CustomText from 'library/components/General/CustomText';
import RadioButton from 'library/components/General/RadioButton';
import Loading from 'library/components/General/Loading';
import Icon from 'react-native-vector-icons/AntDesign';
import {UrlTile} from 'react-native-maps';

class EventPage extends React.Component {
  constructor() {
    super();
    this.panels = {
      details: <Details text="Test" />,
      time: <CountDown timeLeft="2:00" />,
      location: <Map />,
    };
  }

  state = {
    activePanel: 'details',
    isModalVisible: false,
    isPaymentModalVisible: false,
    isLoading: false,
    ticketPrice: 20.0,
    ticketFee: 0.05,
    savedCard: {
      id: 'test_id',
      cardEnd: '0000',
    },
    useNew: true,
    saveCard: false,
    isPaymentComplete: false,
    cardParams: {},
  };

  async componentDidMount() {}

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
      isPaymentModalVisible: false,
    });
  }

  onConfirm = () => {
    this.setState({
      isPaymentModalVisible: true,
    });
  };

  handleApplePay = async () => {
    //get token
    try {
      const token = await stripe.paymentRequestWithNativePay({}, [
        {
          label: 'Ticket Price',
          amount: String(this.state.ticketPrice.toFixed(2)),
        },
        {
          label: 'Fee',
          amount: String(
            (this.state.ticketPrice * this.state.ticketFee).toFixed(2),
          ),
        },
        {
          label: 'Socialite',
          amount: String(
            (
              this.state.ticketPrice +
              this.state.ticketPrice * this.state.ticketFee
            ).toFixed(2),
          ),
        },
      ]);

      console.log(token.tokenId);

      //fetch
      let response = await fetch(
        'https://us-central1-socialite-com.cloudfunctions.net/completePaymentWithStripe',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenId: token.tokenId,
            price:
              (
                this.state.ticketPrice +
                this.state.ticketPrice * this.state.ticketFee
              ).toFixed(2) * 100, //so stripe can read it
          }),
        },
      );

      let json = await response.json();
      console.log(json);
      if (json.charge.amount) {
        console.log('Apple Pay Success');
        stripe.completeNativePayRequest();
      } else {
        console.log('Apple Pay fail');
        stripe.cancelNativePayRequest();
        alert('There was an error. Please try again later.');
      }
    } catch (error) {
      console.log('Apple Pay fail');
      console.error(error);
      stripe.cancelNativePayRequest();
      alert('There was an error. Please try again later.');
    }
  };

  handleCardPay = async () => {
    //get token
    try {
      if (this.state.useNew) {
        if (!this.state.cardParams.valid) {
          return;
        }

        this.setState({isLoading: true});
        const token = await stripe.createTokenWithCard(
          this.state.cardParams.cardDetails,
        );

        let response = await fetch(
          'https://us-central1-socialite-com.cloudfunctions.net/completePaymentWithStripe',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tokenId: token.tokenId,
              saveCard: this.state.saveCard,
              price:
                (
                  this.state.ticketPrice +
                  this.state.ticketPrice * this.state.ticketFee
                ).toFixed(2) * 100, //so stripe can read it
            }),
          },
        );

        let json = await response.json();
        this.setState({isLoading: false});
        console.log('New Card Success');
        if (this.state.saveCard) {
          console.log('Customer');
          console.log(json.customer);
          alert('Payment Succeeded. Card Saved');
        } else {
          alert('Payment Succeeded');
        }
        console.log(json);
      } else {
        this.setState({isLoading: true});
        let response = await fetch(
          'https://us-central1-socialite-com.cloudfunctions.net/completePaymentWithStripe',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              savedCardId: this.state.savedCard.id,
              price:
                (
                  this.state.ticketPrice +
                  this.state.ticketPrice * this.state.ticketFee
                ).toFixed(2) * 100, //so stripe can read it
            }),
          },
        );

        let json = await response.json();
        this.setState({isLoading: false});
        console.log('Saved Card Success');
        alert('Payment Succeeded. Used Saved Card');
        console.log(json);
      }
    } catch (error) {
      console.log('Card Fail');
      console.error(error);
      this.setState({isLoading: false});
      alert('There was an error. Please try again later.');
    }
  };

  handleFieldParamsChange = (valid, params) => {
    this.setState({
      cardParams: {
        valid: valid,
        cardDetails: {
          number: params.number,
          expMonth: params.expMonth,
          expYear: params.expYear,
          cvc: params.cvc,
        },
      },
    });
  };

  render() {
    return (
      <>
        <Loading loading={this.state.isLoading} />
        <ImageBackground
          style={styles.backgroundView}
          imageStyle={styles.bgImage}
          source={R.images.party2}>
          <Modal
            isVisible={this.state.isModalVisible}
            swipeDirection="down"
            animationIn="slideInDown"
            backdropOpacity={0.4}
            onSwipeComplete={() => this._closePanel()}
            onBackdropPress={() => this._closePanel()}
            style={styles.modalContainer}>
            {this.panels[this.state.activePanel]}
          </Modal>
          <Modal
            isVisible={this.state.isPaymentModalVisible}
            swipeDirection="down"
            backdropOpacity={0.4}
            onSwipeComplete={() => this._closePanel()}
            onBackdropPress={() => this._closePanel()}
            style={styles.paymentModalContainer}>
            <View style={styles.modalPaymentView}>
              {/* Close Button */}
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => this._closePanel()}
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                  }}>
                  <Icon name="close" size={25} />
                </TouchableOpacity>
              </View>
              {/* Rest of container */}
              <CustomText
                subtitle
                customStyle={{marginTop: 20, marginBottom: 30}}
                label="Confirm Payment"
              />

              <View>
                <View style={styles.priceDataContainer}>
                  <View style={styles.row}>
                    <CustomText
                      subtitle_4
                      customStyle={{
                        marginTop: 10,
                        flex: 1,
                        alignItems: 'flex-start',
                      }}
                      label="Ticket Price"
                    />
                    <CustomText
                      subtitle_4
                      customStyle={{
                        marginTop: 10,
                        alignItems: 'flex-end',
                      }}
                      label={'$' + String(this.state.ticketPrice.toFixed(2))}
                    />
                  </View>

                  <View style={styles.row}>
                    <CustomText
                      subtitle_4
                      customStyle={{
                        marginTop: 10,
                        marginBottom: 20,
                        flex: 1,
                        alignItems: 'flex-start',
                      }}
                      label="Fees"
                    />
                    <CustomText
                      subtitle_4
                      customStyle={{
                        marginTop: 10,
                        marginBottom: 20,
                        alignItems: 'flex-end',
                      }}
                      label={
                        '$' +
                        String(
                          (
                            this.state.ticketPrice * this.state.ticketFee
                          ).toFixed(2),
                        )
                      }
                    />
                  </View>
                </View>
                <View style={styles.row}>
                  <CustomText
                    subtitle_4
                    customStyle={{
                      marginTop: 10,
                      marginBottom: 20,
                      flex: 1,
                      alignItems: 'flex-start',
                    }}
                    label="Total"
                  />
                  <CustomText
                    subtitle_5
                    customStyle={{
                      marginTop: 10,
                      marginBottom: 20,
                      alignItems: 'flex-end',
                    }}
                    label={
                      '$' +
                      String(
                        (
                          this.state.ticketPrice +
                          this.state.ticketPrice * this.state.ticketFee
                        ).toFixed(2),
                      )
                    }
                  />
                </View>
              </View>

              <View>
                <View style={styles.centerContainer}>
                  <Button
                    light
                    title="Pay with  Pay"
                    onPress={this.handleApplePay}
                    customStyle={{
                      margin: 10,
                    }}
                  />
                </View>

                <View style={[styles.row, styles.topBottomBorder]}>
                  <CustomText
                    subtitle_4
                    customStyle={{
                      flex: 1,
                      alignItems: 'flex-start',
                      margin: 10,
                    }}
                    label="or pay with card"
                    center
                  />
                </View>

                <View style={{marginBottom: 10}}>
                  <RadioButton
                    label="Use a new payment method"
                    isSelected={this.state.useNew}
                    disabled={this.state.useNew}
                    onSelect={() =>
                      this.setState(prevState => ({
                        useNew: !prevState.useNew,
                      }))
                    }
                  />

                  {this.state.savedCard.id && (
                    <RadioButton
                      label="Visa ending in 0005"
                      isSelected={!this.state.useNew}
                      disabled={!this.state.useNew}
                      onSelect={() =>
                        this.setState(prevState => ({
                          useNew: !prevState.useNew,
                        }))
                      }
                    />
                  )}
                </View>

                <View style={styles.centerContainer}>
                  <PaymentCardTextField
                    ref={ref => {
                      this.paymentCardInput = ref;
                    }}
                    style={[
                      styles.field,
                      !this.state.useNew && styles.disabledField,
                    ]}
                    disabled={!this.state.useNew}
                    onParamsChange={this.handleFieldParamsChange}
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <RadioButton
                    checkbox
                    label="Save payment information to my account for future purchases"
                    isSelected={this.state.saveCard}
                    onSelect={() =>
                      this.setState(prevState => ({
                        saveCard: !prevState.saveCard,
                      }))
                    }
                  />
                </View>

                <View style={styles.centerContainer}>
                  <Button
                    title="Pay with Card"
                    dark
                    onPress={this.handleCardPay}
                  />
                </View>
              </View>
              {/*  */}
            </View>
          </Modal>
        </ImageBackground>
        <Invite navigator={this.props.navigation} onConfirm={this.onConfirm}>
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
  paymentModalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalPaymentView: {
    width: R.constants.screenWidth,
    backgroundColor: 'white',
    borderRadius: 8,
    height: R.constants.screenHeight * 0.9,
    padding: 20,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  priceDataContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(162,162,162,0.46)',
  },
  field: {
    width: R.constants.screenWidth * 0.8,
    color: '#000e78',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
  },
  disabledField: {
    color: '#cfcfcf',
    borderColor: '#cfcfcf',
    backgroundColor: '#ebebeb',
  },
  centerContainer: {
    alignItems: 'center',
  },
  topBottomBorder: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(162,162,162,0.46)',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default EventPage;
