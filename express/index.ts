import express, { Request, Response } from "express";
import { StripeWebhooks } from "./WebhookHandler";
import { EventEmitter } from "events";
import dotenv from "dotenv";
import { getLogger } from "../utils/logger";
const serverLogger = getLogger("express:server", "Info");
const stripeError = getLogger("express:stripeWebhook", "Error");
dotenv.config();
const port = process.env.PORT || 4242;
const app = express();
function init(secretKey: string) {
  const endpointSecret = process.env.ENDPOINT_SECRET;
  const stripeWebhooks = new StripeWebhooks(secretKey);
  const paymentEvents = new EventEmitter();

  app.post(
    "/stripe_webhooks",
    express.raw({ type: "application/json" }),
    async (request: Request, response: Response) => {
      const { body } = request;
      if (endpointSecret) {
        const signature = request.headers["stripe-signature"];

        try {
          // Verify the webhook signature
          const event = stripeWebhooks.verifySignature(
            body,
            signature,
            endpointSecret
          );

          switch (event.type) {
            case "payment_intent.succeeded":
              paymentEvents.emit(
                stripeWebhooks.handleEvent(event, "success"),
                event.data.object
              );
              break;
            case "payment_intent.failed":
              paymentEvents.emit(
                stripeWebhooks.handleEvent(event, "error"),
                event.data.object
              );
              break;
            case "charge.succeeded":
              paymentEvents.emit(
                stripeWebhooks.handleEvent(event, "success"),
                event.data.object
              );
              break;
            default:
              paymentEvents.emit(
                stripeWebhooks.handleEvent(event, "default"),
                event.data.object
              );
          }
        } catch (err) {
          stripeError("⚠️ Webhook signature verification failed.");
          return response.status(400).send(`Webhook Error: ${err.message}`);
        }
      }

      response.send();
    }
  );

  const paymentEventsMethods = {
    on: (event, listener) => paymentEvents.on(event, listener),
    removeListner: (event, listener) =>
      paymentEvents.removeListener(event, listener),
    once: (event, listener) => paymentEvents.once(event, listener),
  };
  return paymentEventsMethods;
}

try {
  app.listen(port, () => {
    console.log(`Stripe Webhook Server is listening on port ${port}`);
  });
} catch (error) {
  console.error("An error occurred while starting the server:", error);
}

export default init;
