export interface Arguments {
  input: string;
  output: string;
}

export interface Transaction {
  date: number;
  level: string;
  transactionId: string;
  err: string;
}
