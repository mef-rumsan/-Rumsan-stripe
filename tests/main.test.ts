// test/StripeWrapper.test.ts

import Stripe from "../index";

describe("StripeWrapper", () => {
  let instance;
  const testKey =
    "sk_test_51KZSYDKUR5nwsW1NbLn6GtfE131zTfE0GHVwxkVvA2FGxfTErkBYFTPijSjrjcTh01nwaUTEznX4RtXzC3wnpszN00ALB1IdAk";

  beforeEach(() => {
    instance = Stripe(testKey);
  });

  test("should create an instance of StripeWrapper", () => {
    expect(instance).toBeDefined();
  });

  test("should create a payment intent", async () => {
    const payload = {
      amount: 100,
      currency: "usd",
    };

    const intentResponse = await instance.createIntent(payload);

    expect(intentResponse).toBeDefined();
    expect(intentResponse.amount).toBe(payload.amount);
    expect(intentResponse.currency).toBe(payload.currency);
    expect(intentResponse.status).toBe("requires_payment_method");
  });
});
