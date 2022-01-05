import { argv } from 'yargs';
import { createReadStream, createWriteStream } from 'fs';

const arg: any = { ...argv };
const readableStream = createReadStream(arg.input);
const writableStream = createWriteStream(arg.output);

readableStream.setEncoding('utf8');
readableStream.on('data', (chunk) => writableStream.write(chunk));
