import { obj } from "../interfaces";
import Invoice from "./Invoice";

class InvoiceMethods extends Invoice {
  constructor(stripeKey: string) {
    super(stripeKey);
  }

  async create(payload: obj): Promise<any> {
    return this.add(payload);
  }

  async retrieve(id: string): Promise<any> {
    return this.fetchInvoice(id);
  }

  async listItems(id: string, optionalParams?: obj): Promise<any> {
    return this.listInvoiceItems(id, optionalParams);
  }

  async finalize(id: string): Promise<any> {
    return this.finalizeInvoice(id);
  }
  async void(id: string): Promise<any> {
    return this.voidInvoice(id);
  }
}
export default InvoiceMethods;
