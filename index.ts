import Methods from "./lib/Methods";
import app from "./express";
import SessionMethods from "./lib/checkoutSession/SessionMethods";
export default function (key: string) {
  const paymentEvents = app(key);
  const paymentMethods = new Methods(key);
  const checkoutSession = new SessionMethods(key);
  return { paymentMethods, paymentEvents, checkoutSession };
}
