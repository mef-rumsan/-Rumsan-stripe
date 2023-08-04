import StripeSession from "./StripeSesssion";

class SessionMethods extends StripeSession {
  constructor(stripeKey: string) {
    super(stripeKey);
  }

  async create(payload: any): Promise<any> {
    const { success_url, items, mode, ...restArgs } = payload;
    return this.add(success_url, items, mode, restArgs);
  }

  async retrieve(id: string): Promise<any> {
    return this.fetchSession(id);
  }

  async expire(id: string): Promise<any> {
    return this.cancelSession(id);
  }

  async listItems(id: string): Promise<any> {
    return this.listCheckoutItems(id);
  }
}
export default SessionMethods;
