import { Parser } from './domain/parser';
import { FileSystem } from './infrastructure/fileSystem';
import { IArguments } from './shared/interfaces';
import { Util } from './shared/util';

export class Runner {
  public static async execute(args: IArguments): Promise<void> {
    const parser = new Parser(new FileSystem());
    const input = await parser.read(args.input);
    const transactions = parser.parse(input);
    const errors = parser.filterByLevel(transactions);
    parser.write(args.output, JSON.stringify(errors));
  }
}

Runner.execute(Util.args()).catch((err) => {
  console.error(err);
  process.exit(1);
});
