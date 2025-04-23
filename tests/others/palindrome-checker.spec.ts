import { palindromeChecker } from '../../src/others/palindrome-checker';

describe('Palindrome', () => {
  it('Palindrome Checker', () => {
    expect(palindromeChecker('')).toBeFalsy();
    expect(palindromeChecker('a')).toBeTruthy();
    expect(palindromeChecker('aa')).toBeTruthy();
    expect(palindromeChecker('aba')).toBeTruthy();
    expect(palindromeChecker('ab')).toBeFalsy();
    expect(palindromeChecker('kayak')).toBeTruthy();
    expect(palindromeChecker('radar')).toBeTruthy();
    expect(palindromeChecker('level')).toBeTruthy();
    expect(palindromeChecker('Was it a car or a cat I saw')).toBeTruthy();
    expect(palindromeChecker('Step on no pets')).toBeTruthy();
    expect(palindromeChecker('Able was I ere I saw Elba')).toBeTruthy();
  });
});
