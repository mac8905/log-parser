import yargs from 'yargs';
import { ReadStream, WriteStream } from 'fs';
import { Arguments, Transaction } from './interfaces';

export class Util {
  public static args(): Arguments {
    return yargs
      .option('input', {
        alias: 'i',
        description: 'The input file',
        type: 'string',
      })
      .option('output', {
        alias: 'o',
        description: 'The output file',
        type: 'string',
      })
      .demandOption(['input', 'output'])
      .help().argv as Arguments;
  }

  public static parse(input: string): Transaction[] {
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

  public static filterErrors(transactions: Transaction[]): Transaction[] {
    return transactions.filter((transaction: Transaction) => {
      return transaction.level === 'error';
    });
  }

  public static async read(input: ReadStream): Promise<string> {
    return new Promise((resolve, reject) => {
      let inputData = '';

      input.on('data', (data) => {
        inputData += data;
      });

      input.on('end', () => {
        resolve(inputData);
      });

      input.on('error', (err) => {
        reject(err);
      });
    });
  }

  public static write(output: WriteStream, data: string): void {
    output.write(data);
  }
}
