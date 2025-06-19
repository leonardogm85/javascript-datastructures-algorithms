import { lcs } from "../../../src/algorithms/dynamic-programing/longest-common-subsequence";

describe('Longest Common Subsequence Dynamic Programming', () => {
  it('works with DP approach', () => {
    let wordX: string | undefined;
    let wordY: string | undefined;

    //        a  b  c  a  d  f
    //     0  0  0  0  0  0  0
    //  a  0  1  1  1  1  1  1
    //  c  0  1  1  2  2  2  2
    //  b  0  1  2  2  2  2  2
    //  a  0  1  2  2  3  3  3
    //  e  0  1  2  2  3  3  3
    //  d  0  1  2  2  3  4  4

    wordX = 'acbaed';
    wordY = 'abcadf';

    expect(lcs(wordX, wordY)).toEqual(4);

    //        a  e  d  f  h  r
    //     0  0  0  0  0  0  0
    //  a  0  1  1  1  1  1  1
    //  b  0  1  1  1  1  1  1
    //  c  0  1  1  1  1  1  1
    //  d  0  1  1  2  2  2  2
    //  g  0  1  1  2  2  2  2
    //  h  0  1  1  2  2  3  3

    wordX = 'abcdgh';
    wordY = 'aedfhr';

    expect(lcs(wordX, wordY)).toEqual(3);

    //        b  d  c  a  b  a
    //     0  0  0  0  0  0  0
    //  a  0  0  0  0  1  1  1
    //  b  0  1  1  1  1  2  2
    //  c  0  1  1  2  2  2  2
    //  b  0  1  1  2  2  3  3
    //  d  0  1  2  2  2  3  3
    //  a  0  1  2  2  3  3  4
    //  b  0  1  2  2  3  4  4

    wordX = 'abcbdab';
    wordY = 'bdcaba';

    expect(lcs(wordX, wordY)).toEqual(4);

    //        a  t  g  t  t  a  t
    //     0  0  0  0  0  0  0  0
    //  a  0  1  1  1  1  1  1  1
    //  t  0  1  2  2  2  2  2  2
    //  c  0  1  2  2  2  2  2  2
    //  g  0  1  2  3  3  3  3  3
    //  t  0  1  2  3  4  4  4  4
    //  a  0  1  2  3  4  4  5  5
    //  c  0  1  2  3  4  4  5  5

    wordX = 'atcgtac';
    wordY = 'atgttat';

    expect(lcs(wordX, wordY)).toEqual(5);
  });
});
