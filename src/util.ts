import { Transaction } from './interfaces';

export const parse = (input: string): Transaction[] => {
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
};

export const filterErrors = (transactions: Transaction[]): string => {
  const errors = transactions.filter(
    (transaction) => transaction.level === 'error',
  );

  return JSON.stringify(errors);
};
