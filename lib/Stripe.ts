import { createIntent } from "./interfaces";
import Stripe from "stripe";

class StripeWrapper {
  private stripeKey: string;
  private stripeInstance: Stripe;

  constructor(key: string) {
    this.stripeKey = key;
    this.init();
  }

  private init(): void {
    this.stripeInstance = new Stripe(this.stripeKey, {
      apiVersion: `2022-11-15`,
    });
  }

  createIntent(payload: createIntent): Promise<any> {
    return this.stripeInstance.paymentIntents.create(payload);
  }

  checkout(payload: any) {}
}

export default StripeWrapper;
