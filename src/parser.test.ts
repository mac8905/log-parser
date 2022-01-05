import { parse, filterErrors } from './util';

describe('parser', () => {
  it('should parse the input file', () => {
    const input =
      '2019-01-01T00:00:00.000Z - info - {"transactionId":"1","err":""}\n' +
      '2019-01-01T00:00:00.000Z - error - {"transactionId":"2","err":""}\n' +
      '2019-01-01T00:00:00.000Z - info - {"transactionId":"3","err":""}\n' +
      '2019-01-01T00:00:00.000Z - error - {"transactionId":"4","err":""}';

    const expected = [
      {
        date: new Date('2019-01-01T00:00:00.000Z').getTime(),
        level: 'info',
        transactionId: '1',
        err: '',
      },
      {
        date: new Date('2019-01-01T00:00:00.000Z').getTime(),
        level: 'error',
        transactionId: '2',
        err: '',
      },
      {
        date: new Date('2019-01-01T00:00:00.000Z').getTime(),
        level: 'info',
        transactionId: '3',
        err: '',
      },
      {
        date: new Date('2019-01-01T00:00:00.000Z').getTime(),
        level: 'error',
        transactionId: '4',
        err: '',
      },
    ];

    expect(parse(input)).toEqual(expected);
  });

  it('should write the output file', () => {
    const transactions = [
      {
        date: new Date('2019-01-01T00:00:00.000Z').getTime(),
        level: 'info',
        transactionId: '1',
        err: '',
      },
      {
        date: new Date('2019-01-01T00:00:00.000Z').getTime(),
        level: 'error',
        transactionId: '2',
        err: '',
      },
    ];

    const expected =
      '[{"date":1546300800000,"level":"error","transactionId":"2","err":""}]';

    expect(filterErrors(transactions)).toEqual(expected);
  });
});
