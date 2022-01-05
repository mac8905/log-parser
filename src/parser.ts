import yargs from 'yargs';
import { createReadStream, createWriteStream } from 'fs';
import { Arguments, Transaction } from './interfaces';
import { parse, filterErrors } from './util';

export const main = async (argv: Arguments): Promise<void> => {
  const input = createReadStream(argv.input);
  const output = createWriteStream(argv.output);

  const transactions: Transaction[] = await new Promise((resolve, reject) => {
    let inputData = '';

    input.on('data', (data) => {
      inputData += data;
    });

    input.on('end', () => {
      resolve(parse(inputData));
    });

    input.on('error', (err) => {
      reject(err);
    });
  });

  output.write(filterErrors(transactions));
};

const argv = yargs
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

main(argv).catch((err) => {
  console.error(err);
  process.exit(1);
});
