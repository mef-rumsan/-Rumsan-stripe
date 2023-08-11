import { obj } from "../interfaces";
import Stripe from "stripe";

class Invoice {
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

  protected add(params?: obj): Promise<any> {
    return this.stripeInstance.invoices.create({
      ...params,
    });
  }

  protected fetchInvoice(InvoiceId: string): Promise<any> {
    return this.stripeInstance.invoices.retrieve(InvoiceId);
  }

  protected finalizeInvoice(InvoiceId: string): Promise<any> {
    return this.stripeInstance.invoices.finalizeInvoice(InvoiceId);
  }

  protected voidInvoice(InvoiceId: string): Promise<any> {
    return this.stripeInstance.invoices.voidInvoice(InvoiceId);
  }

  protected listInvoiceItems(
    InvoiceId: string,
    optionalParams?: any
  ): Promise<any> {
    return this.stripeInstance.invoices.listLineItems(
      InvoiceId,
      optionalParams
    );
  }
}

export default Invoice;
