import { StripeWebhooks } from "./../express/WebhookHandler";

describe("StripeWebhooks", () => {
  const stripeSecretKey = "Hxxxxxxx-fdgfgfgfg";
  const stripeWebhooks = new StripeWebhooks(stripeSecretKey);

  describe("handleEvent()", () => {
    const mockEvent = {
      id: "14533",
      object: "test obj",
      type: "payment",
      data: {
        object: "test data obj",
      },
    };

    test("should return the correct event name for a successful handling", () => {
      const eventName = stripeWebhooks.handleEvent(mockEvent, "success");
      expect(eventName).toBe("webhook-payment-success");
    });

    test("should return the correct event name for an error handling", () => {
      const eventName = stripeWebhooks.handleEvent(mockEvent, "error");
      expect(eventName).toBe("webhook-payment-error");
    });
  });
});
