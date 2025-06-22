import { lcs } from '../../../src/algorithms/greedy/longest-common-subsequence';

describe('Algorithms - Greedy: Longest Common Subsequence', () => {
  it('works with greedy approach', () => {
    let wordX: string | undefined;
    let wordY: string | undefined;

    wordX = 'acbaed';
    wordY = 'abcadf';

    expect(lcs(wordX, wordY)).toEqual(4);

    wordX = 'abcdgh';
    wordY = 'aedfhr';

    expect(lcs(wordX, wordY)).toEqual(3);

    wordX = 'abcbdab';
    wordY = 'bdcaba';

    expect(lcs(wordX, wordY)).toEqual(4);

    wordX = 'atcgtac';
    wordY = 'atgttat';

    expect(lcs(wordX, wordY)).toEqual(5);
  });
});
