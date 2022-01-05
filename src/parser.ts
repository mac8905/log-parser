import yargs from 'yargs';
import { createReadStream, createWriteStream } from 'fs';

interface Arguments {
  input: string;
  output: string;
}

const { input, output } = yargs.options({
  input: {
    alias: 'i',
    describe: 'Input file',
    type: 'string',
    demandOption: true,
  },
  output: {
    alias: 'o',
    describe: 'Output file',
    type: 'string',
    demandOption: true,
  },
}).argv as Arguments;

const readableStream = createReadStream(input);
const writableStream = createWriteStream(output);

readableStream.setEncoding('utf8');
readableStream.on('data', (chunk: String) => {
  const lines = chunk.split('\n');

  const transactions = lines.map((line: string) => {
    const [date, level, transaction] = line.split(' - ');
    const { transactionId, err } = JSON.parse(transaction);

    return {
      date: new Date(date).getTime(),
      level,
      transactionId,
      err,
    };
  });

  const errors = transactions.filter(
    (transaction) => transaction.level === 'error',
  );

  writableStream.write(JSON.stringify(errors));
});
