import Methods from "./lib/Methods";
import app from "./express";
import SessionMethods from "./lib/checkoutSession/SessionMethods";
import InvoiceMethod from "./lib/invoices/InvoiceMethods";
export default function (key: string) {
  const paymentEvents = app(key);
  const paymentMethods = new Methods(key);
  const checkoutSession = new SessionMethods(key);
  const InvoiceMethods = new InvoiceMethod(key);
  return { paymentMethods, paymentEvents, checkoutSession, InvoiceMethods };
}
