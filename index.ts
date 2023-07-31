import Methods from "./lib/Methods";
import app from "./express";
export default function (key: string) {
  const paymentEvents = app(key);
  const methods = new Methods(key);
  return { ...methods, paymentEvents };
}
