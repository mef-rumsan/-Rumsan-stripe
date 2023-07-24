interface createIntent {
  amount: number;
  currency: string;
}

interface responseIntent {
  amount: number;
  currency: string;
  client_secret: string;
  status: string;
}

export { createIntent, responseIntent };
