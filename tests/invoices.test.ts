import Stripe from "../index";

describe("Checkout Invoice Methods", () => {
  let instance;
  const payload = {
    customer: "cus_OPZQZkvr2JCmMy",
  };
  const testKey =
    "sk_test_51KZSYDKUR5nwsW1NbLn6GtfE131zTfE0GHVwxkVvA2FGxfTErkBYFTPijSjrjcTh01nwaUTEznX4RtXzC3wnpszN00ALB1IdAk";

  beforeEach(() => {
    instance = Stripe(testKey).InvoiceMethods;
  });

  test("should create an instance of InvoiceMethods", () => {
    expect(instance).toBeDefined();
  });

  test("should create a new  Invoice", async () => {
    const invoice = await instance.create(payload);
    expect(invoice).toBeDefined();
  });

  test("should retrieve an existing  Invoice", async () => {
    const Invoice = await instance.create(payload);
    const InvoiceInfo = await instance.retrieve(Invoice.id);
    expect(InvoiceInfo).toBeDefined();
  });

  test("should void an existing  Invoice", async () => {
    const payload = {};

    const Invoice = await instance.create(payload);
    const InvoiceInfo = await instance.void(Invoice.id);
    expect(InvoiceInfo).toBeDefined();
  });

  test("should Finalize an existing  Invoice", async () => {
    const Invoice = await instance.create(payload);
    const finalizeInvoice = await instance.finalize(Invoice.id);
    expect(finalizeInvoice).toBeDefined();
  });

  test("should list item  of existing Stripe Invoice", async () => {
    const Invoice = await instance.create(payload);
    const items = await instance.listItems(Invoice.id);
    expect(items).toBeDefined();
  });
});
