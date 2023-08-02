# -Rumsan-stripe

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The `package` a part of the Stripe Node.js package and is designed to facilitate the creation of payment intents, retrieval of payment intents, confirmation of payments and listening the stripe webhooks using the Stripe API.

## Getting Started

To use the `package` in your project, you need to have this package installed. You can install it using npm

```bash
npm install rumsan@stripe --save
```

or yarn

```bash
yarn add rumsan@stripe
```

To use stripe webhook please add endpoint secret provided by stripe to .env file

```bash
ENDPOINT_SECRET = 'Your_stripe_endpoint_secret'
```

Set endpoint URL to your google stripe as `YOUR_HOST/stripe_webhooks`.

## Usage

Import the package to your modules

```
import StripePayment from 'rumsan@stripe'
```

The package needs to be configured with your account's secret key, which is available in the Stripe Dashboard. Require it with the key's value:

```
const { paymentMethods, paymentEvents }= StripePayment("your_secret_key")
```

### Payment Intent methods

All the methods for Payment intent are callbale from `paymentMethods` module.

#### Create Intent

The `create` method is used to create a new payment intent on the Stripe server.

```
  const payload = {
      amount: 100,
      currency: "usd",
      params: { payment_method: "pm_card_visa" },
       metaData: {
        name: "test",
      },
    };

 const response = await paymentMethods.create(payload)
```

The response contains

#### Retrieve Payment Informaation

The `retrieve` method is used to retrieve an existing payment intent from the Stripe server.

```
  const payload = {
      id:"id", // received after  creating intent as id
      params :{}, // (optional)
      options:{}, // (optional)
    };

 const response = await paymentMethods.retrieve(payload)
```

Here params and options in payload are optional object ,references to google stripe params and option of `retrieve` method.

#### confirm Payment

The `confirm` method is used to confirm payment intent from the Stripe server.

```
  const payload = {
      id:"id", // received after  creating intent as id
      params :{}, // (optional)
      options:{}, // (optional)
    };

 const response = await paymentMethods.confirm(payload)
```

Here params and options in payload are optional object ,references to google stripe params and option of `confirm` method.

### PaymentEvents

Google stripe provides webhook to post the event of payment

`PaymentEvents` is a event listner which listens on google stripe webhooks on payment intent success or errors.

```
PaymentEvents.on(Eventname,function(err,res){
    // .... code  to handle response
})
```

Eventname `webhook-payment-success` listens event on success of payment Intent

Eventname `webhook-payment-error` listens event on error of payment Intent

Eventname `webhook-payment-default` listens on other events
