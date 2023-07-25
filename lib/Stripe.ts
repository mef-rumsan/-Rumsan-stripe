import constants from "../constants";
import { createIntent, obj } from "./interfaces";
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
      apiVersion: "2022-11-15",
    });
  }

  protected createIntent(
    payload: createIntent,
    options?: obj | undefined
  ): Promise<any> {
    return this.stripeInstance.paymentIntents.create(payload, options);
  }

  protected fetchIntent(
    client_secret: string,
    params?: obj | undefined,
    options?: obj | undefined
  ): Promise<any> {
    return this.stripeInstance.paymentIntents.retrieve(
      client_secret,
      params,
      options
    );
  }

  protected cancelIntent(
    client_secret: string,
    params?: obj | undefined,
    options?: obj | undefined
  ): Promise<any> {
    return this.stripeInstance.paymentIntents.cancel(
      client_secret,
      params,
      options
    );
  }

  protected confirmIntent(
    client_secret: string,
    params?: obj | undefined,
    options?: obj | undefined
  ): Promise<any> {
    return this.stripeInstance.paymentIntents.confirm(
      client_secret,
      params,
      options
    );
  }
}

export default StripeWrapper;
