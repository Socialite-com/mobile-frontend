const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const stripe = require('stripe')('sk_test_IrbxdzkypXWUI2TDaxgdksRY00KDIhPmD7');

exports.completePaymentWithStripe = functions.https.onRequest(
  async (request, response) => {
    if (request.body.saveCard) {
      //creates a reusable card
      console.log('saving card');
      const customer = await stripe.customers.create({
        source: request.body.tokenId,
      });
      //create the payment
      const charge = await stripe.charges.create({
        amount: request.body.price,
        currency: 'cad',
        customer: customer.id,
      });
      response.send({charge: charge, customer: customer});
    } else if (request.body.savedCardId) {
      //create the payment
      console.log('using saved card');
      const charge = await stripe.charges.create({
        amount: request.body.price,
        currency: 'cad',
        customer: request.body.savedCardId,
      });
      response.send({charge: charge});
    } else {
      //create the payment
      console.log('using one time card');
      const charge = await stripe.charges.create({
        amount: request.body.price,
        currency: 'cad',
        source: request.body.tokenId,
      });
      response.send({charge: charge});
    }
  },
);
