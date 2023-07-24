import Stripe from "./Stripe";
import { createIntent, responseIntent } from "./interfaces";

class Methods extends Stripe {
  constructor(stripeKey: string) {
    super(stripeKey);
  }

  async PaymentIntent(payload: createIntent): Promise<any> {
    try {
      const { client_secret, status, currency, amount }: responseIntent =
        await this.createIntent(payload);
      return { client_secret, currency, amount };
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default Methods;
