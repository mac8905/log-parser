export interface IFileSystem {
  read(path: string): Promise<string>;
  write(path: string, data: string): Promise<void>;
}

export interface ITransaction {
  date: number;
  level: string;
  transactionId: string;
  err: string;
}
