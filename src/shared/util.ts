import yargs from 'yargs';
import { IArguments } from './interfaces';

export class Util {
  public static args(): IArguments {
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
      .help().argv as IArguments;
  }
}
