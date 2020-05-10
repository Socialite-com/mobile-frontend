import stripe from 'tipsi-stripe';

export const handleApplePay = async (ticketPrice, ticketFee) => {
  //get token
  try {
    const token = await stripe.paymentRequestWithNativePay({}, [
      {
        label: 'Ticket Price',
        amount: String(ticketPrice.toFixed(2)),
      },
      {
        label: 'Fee',
        amount: String((ticketPrice * ticketFee).toFixed(2)),
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
          price: (ticketPrice + ticketPrice * ticketFee).toFixed(2) * 100, //so stripe can read it
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

export const handleCardPay = async (
  useNew,
  cardParams,
  saveCard,
  savedCard,
  ticketPrice,
  ticketFee,
) => {
  //get token
  try {
    if (useNew) {
      if (!cardParams.valid) {
        return;
      }

      // this.setState({isLoading: true});
      const token = await stripe.createTokenWithCard(cardParams.cardDetails);

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
            saveCard: saveCard,
            price: (ticketPrice + ticketPrice * ticketFee).toFixed(2) * 100, //so stripe can read it
          }),
        },
      );

      let json = await response.json();
      // this.setState({isLoading: false});
      console.log('New Card Success');
      if (saveCard) {
        console.log('Customer');
        console.log(json.customer);
        alert('Payment Succeeded. Card Saved');
      } else {
        alert('Payment Succeeded');
      }
      console.log(json);
    } else {
      // this.setState({isLoading: true});
      let response = await fetch(
        'https://us-central1-socialite-com.cloudfunctions.net/completePaymentWithStripe',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            savedCardId: savedCard.id,
            price: (ticketPrice + ticketPrice * ticketFee).toFixed(2) * 100, //so stripe can read it
          }),
        },
      );

      let json = await response.json();
      // this.setState({isLoading: false});
      console.log('Saved Card Success');
      alert('Payment Succeeded. Used Saved Card');
      console.log(json);
    }
  } catch (error) {
    console.log('Card Fail');
    console.error(error);
    // this.setState({isLoading: false});
    alert('There was an error. Please try again later.');
  }
};
