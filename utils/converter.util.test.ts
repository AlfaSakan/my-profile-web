import { convertNumberToTime } from './converter.util';

describe('convertNumberToTime', () => {
  it('should convert number into string time', () => {
    const time = convertNumberToTime(123456789);

    expect(time).toBe('17:17');
  });
});
