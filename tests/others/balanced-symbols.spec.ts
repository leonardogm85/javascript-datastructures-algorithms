import { parenthesesChecker } from '../../src/others/balanced-symbols';

describe('Others: Balanced Symbols', () => {
  it('empty to be truthy', () => {
    expect(parenthesesChecker('')).toBeTruthy();
  });

  it('{ to be falsy', () => {
    expect(parenthesesChecker('{')).toBeFalsy();
  });

  it('} to be falsy', () => {
    expect(parenthesesChecker('}')).toBeFalsy();
  });

  it('11 to be falsy', () => {
    expect(parenthesesChecker('11')).toBeFalsy();
  });

  it('{11 to be falsy', () => {
    expect(parenthesesChecker('{11')).toBeFalsy();
  });

  it('{([1])} to be falsy', () => {
    expect(parenthesesChecker('{([1])}')).toBeFalsy();
  });

  it('{([])} to be truthy', () => {
    expect(parenthesesChecker('{([])}')).toBeTruthy();
  });

  it('{{([][])}()} to be truthy', () => {
    expect(parenthesesChecker('{{([][])}()}')).toBeTruthy();
  });

  it('[{()] to be falsy', () => {
    expect(parenthesesChecker('[{()]')).toBeFalsy();
  });
});
