import { baseConverter, decimalToBinary } from '../../src/others/base-converter';

describe('Others: Base Converter', () => {
  it('decimalToBinary 1 -> 1', () => {
    expect(decimalToBinary(1)).toEqual('1');
  });

  it('decimalToBinary 2 -> 11', () => {
    expect(decimalToBinary(2)).toEqual('10');
  });

  it('decimalToBinary 233 -> 11101001', () => {
    expect(decimalToBinary(233)).toEqual('11101001');
  });

  it('decimalToBinary 10 -> 1010', () => {
    expect(decimalToBinary(10)).toEqual('1010');
  });

  it('decimalToBinary 1000 -> 1111101000', () => {
    expect(decimalToBinary(1000)).toEqual('1111101000');
  });

  it('baseConverter 100345, 2 -> 11000011111111001', () => {
    expect(baseConverter(100345, 2)).toEqual('11000011111111001');
  });

  it('baseConverter 100345, 8 -> 303771', () => {
    expect(baseConverter(100345, 8)).toEqual('303771');
  });

  it('baseConverter 100345, 16 -> 187F9', () => {
    expect(baseConverter(100345, 16)).toEqual('187F9');
  });

  it('baseConverter 100345, 7 -> 565360', () => {
    expect(baseConverter(100345, 7)).toEqual('565360');
  });

  it('baseConverter 100345, 20 -> CAH5', () => {
    expect(baseConverter(100345, 20)).toEqual('CAH5');
  });

  it('baseConverter 100345, 35 -> 2BW0', () => {
    expect(baseConverter(100345, 35)).toEqual('2BW0');
  });

  it('baseConverter 100345, 36 -> 25FD', () => {
    expect(baseConverter(100345, 36)).toEqual('25FD');
  });

  it('baseConverter 100345, 37 -> ', () => {
    expect(baseConverter(100345, 37)).toEqual('');
  });
});
