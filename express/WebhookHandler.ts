import Stripe from "stripe"; // Assuming you have installed the Stripe npm package
import { stripeEvent } from "../lib/interfaces";

export class StripeWebhooks {
  private stripeKey: string;
  private stripeInstance: Stripe;
  constructor(key: string) {
    this.stripeKey = key;
    this.init();
  }

  private init(): void {
    this.stripeInstance = new Stripe(this.stripeKey, {
      apiVersion: "2022-11-15",
    });
  }

  verifySignature(
    body: string | Buffer,
    signature: string,
    endpointSecret: string
  ) {
    return this.stripeInstance.webhooks.constructEvent(
      body,
      signature,
      endpointSecret
    );
  }

  handleEvent(event: stripeEvent, status: "success" | "error" | "default") {
    const eventName = `webhook-payment-${status}`;
    return eventName;
  }
}
