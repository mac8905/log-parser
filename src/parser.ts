import { createReadStream, createWriteStream } from 'fs';
import { Arguments } from './interfaces';
import { Util } from './util';

export class Parser {
  public static async run(args: Arguments): Promise<void> {
    const input = await Util.read(createReadStream(args.input));
    const transactions = Util.parse(input);
    const errors = Util.filterErrors(transactions);

    Util.write(createWriteStream(args.output), JSON.stringify(errors));
  }
}

Parser.run(Util.args()).catch((err) => {
  console.error(err);
  process.exit(1);
});
