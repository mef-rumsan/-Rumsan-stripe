import Stripe from "../index";

describe("StripeWrapper", () => {
  let instance;
  const testKey =
    "sk_test_51KZSYDKUR5nwsW1NbLn6GtfE131zTfE0GHVwxkVvA2FGxfTErkBYFTPijSjrjcTh01nwaUTEznX4RtXzC3wnpszN00ALB1IdAk";

  beforeEach(() => {
    instance = Stripe(testKey).paymentMethods;
  });

  test("should create an instance of StripeWrapper", () => {
    expect(instance).toBeDefined();
  });

  test("should create a payment intent without payment method", async () => {
    const payload = {
      amount: 100,
      currency: "usd",
      params: { payment_method: "pm_card_visa" },
      metaData: {
        name: "test",
      },
    };

    const intentResponse = await instance.create(payload);
    console.log({ intentResponse });
    const client_secret = intentResponse.client_secret;
    expect(intentResponse).toBeDefined();
    expect(intentResponse.amount).toBe(payload.amount);
    expect(intentResponse.currency).toBe(payload.currency);
    expect(intentResponse.status).toBe("requires_payment_method");
  });

  test("should retrieve an intent", async () => {
    const payload = {
      amount: 100,
      currency: "usd",
    };

    const paymentIntentResponse = await instance.create(payload);
    const id = paymentIntentResponse.id;

    let newPayload = {
      id,
    };
    const result = await instance.retrieve(newPayload);
    expect(result).toBeDefined();
  });

  test("should confirm a payment", async () => {
    const payload = {
      amount: 100,
      currency: "usd",
    };

    const paymentIntentResponse = await instance.create(payload);
    const id = paymentIntentResponse.id;

    let newPayload = {
      id,
      params: { payment_method: "pm_card_visa" },
    };
    const result = await instance.confirm(newPayload);
    expect(result).toBeDefined();
  });
});
