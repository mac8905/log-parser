import { createReadStream, createWriteStream } from 'fs';
import { IFileSystem } from '../domain/interfaces';

export class FileSystem implements IFileSystem {
  public async read(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const input = createReadStream(path);

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

  public async write(path: string, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const output = createWriteStream(path);

      output.on('finish', () => {
        resolve();
      });

      output.on('error', (err) => {
        reject(err);
      });

      output.write(data);
      output.end();
    });
  }
}
