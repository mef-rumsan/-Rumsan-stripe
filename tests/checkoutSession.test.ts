import Stripe from "../index";

describe("Checkout session Methods", () => {
  let instance;
  const testKey =
    "sk_test_51KZSYDKUR5nwsW1NbLn6GtfE131zTfE0GHVwxkVvA2FGxfTErkBYFTPijSjrjcTh01nwaUTEznX4RtXzC3wnpszN00ALB1IdAk";

  beforeEach(() => {
    instance = Stripe(testKey).checkoutSession;
  });

  test("should create an instance of SessionMethods", () => {
    expect(instance).toBeDefined();
  });

  test("should create a new Stripe session", async () => {
    const payload = {
      success_url: "https://test.com/success",
      items: [{ price: "price_1NbLvXKUR5nwsW1NlqUqZhG4", quantity: 2 }],
      mode: "payment",
      cancel_url: "https://localhost/home",
    };

    const session = await instance.create(payload);
    expect(session).toBeDefined();
  });

  test("should retrieve an existing Stripe session", async () => {
    const payload = {
      success_url: "https://test.com/success",
      items: [{ price: "price_1NbLvXKUR5nwsW1NlqUqZhG4", quantity: 2 }],
      mode: "payment",
      cancel_url: "https://localhost/home",
    };

    const session = await instance.create(payload);
    const sessionInfo = await instance.retrieve(session.id);
    expect(sessionInfo).toBeDefined();
  });

  test("should expire an existing Stripe session", async () => {
    const payload = {
      success_url: "https://test.com/success",
      items: [{ price: "price_1NbLvXKUR5nwsW1NlqUqZhG4", quantity: 2 }],
      mode: "payment",
      cancel_url: "https://localhost/home",
    };

    const session = await instance.create(payload);
    const sessionInfo = await instance.expire(session.id);
    expect(sessionInfo).toBeDefined();
  });

  test("should list item  of existing Stripe session", async () => {
    const payload = {
      success_url: "https://test.com/success",
      items: [{ price: "price_1NbLvXKUR5nwsW1NlqUqZhG4", quantity: 2 }],
      mode: "payment",
      cancel_url: "https://localhost/home",
    };

    const session = await instance.create(payload);
    const items = await instance.listItems(session.id);
    expect(items).toBeDefined();
  });
});
