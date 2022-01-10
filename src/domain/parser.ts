import { IFileSystem, ITransaction } from './interfaces';

export class Parser {
  private fs: IFileSystem;

  public constructor(fs: IFileSystem) {
    this.fs = fs;
  }

  read(path: string): Promise<string> {
    return this.fs.read(path);
  }

  write(path: string, data: string): Promise<void> {
    return this.fs.write(path, data);
  }

  parse(input: string): ITransaction[] {
    const lines = input.split('\n');

    return lines.map((line: string) => {
      const [date, level, transaction] = line.split(' - ');
      const { transactionId, err } = JSON.parse(transaction);

      return {
        date: new Date(date).getTime(),
        level,
        transactionId,
        err,
      };
    });
  }

  filterByLevel(transactions: ITransaction[], level = 'error'): ITransaction[] {
    return transactions.filter((transaction: ITransaction) => {
      return transaction.level === level;
    });
  }
}
