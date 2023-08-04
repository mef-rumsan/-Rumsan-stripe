import { obj } from "../interfaces";
import Stripe from "stripe";

class StripeSession {
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

  protected add(
    success_url: string,
    line_items: Array<obj> | undefined,
    mode: Stripe.Checkout.SessionCreateParams.Mode,
    optionalArgs?: Stripe.Checkout.SessionCreateParams
  ): Promise<any> {
    return this.stripeInstance.checkout.sessions.create({
      success_url,
      line_items,
      mode,
      ...optionalArgs,
    });
  }

  protected fetchSession(sessionId: string): Promise<any> {
    return this.stripeInstance.checkout.sessions.retrieve(sessionId);
  }

  protected cancelSession(sessionId: string): Promise<any> {
    return this.stripeInstance.checkout.sessions.expire(sessionId);
  }

  protected listCheckoutItems(sessionId: string): Promise<any> {
    return this.stripeInstance.checkout.sessions.listLineItems(sessionId);
  }
}

export default StripeSession;
