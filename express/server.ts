import app from "./index";
const event = app(process.env.STRIPE_KEY);

//check event handlers ///
event.on("webhook-payment-success", function (res) {
  console.log({ res });
});

event.on("webhook-payment-default", function (res) {
  console.log({ res });
});
