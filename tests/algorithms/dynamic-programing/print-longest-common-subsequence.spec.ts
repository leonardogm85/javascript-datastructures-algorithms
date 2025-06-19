import { printLcs } from '../../../src/algorithms/dynamic-programing/print-longest-common-subsequence';

describe('Longest Common Subsequence Dynamic Programming with print solution', () => {
  it('works with DP approach with print solution', () => {
    let wordX: string | undefined;
    let wordY: string | undefined;

    //        a  b  c  a  d  f
    //     0  0  0  0  0  0  0
    //  a  0 *1  1  1 *1  1  1
    //  c  0  1  1 *2  2  2  2
    //  b  0  1 *2  2  2  2  2
    //  a  0 *1  2  2 *3  3  3
    //  e  0  1  2  2  3  3  3
    //  d  0  1  2  2  3 *4  4

    // Result = acad

    wordX = 'acbaed';
    wordY = 'abcadf';

    expect(printLcs(wordX, wordY)).toEqual('acad');

    //        a  e  d  f  h  r
    //     0  0  0  0  0  0  0
    //  a  0 *1  1  1  1  1  1
    //  b  0  1  1  1  1  1  1
    //  c  0  1  1  1  1  1  1
    //  d  0  1  1 *2  2  2  2
    //  g  0  1  1  2  2  2  2
    //  h  0  1  1  2  2 *3  3

    // Result = adh

    wordX = 'abcdgh';
    wordY = 'aedfhr';

    expect(printLcs(wordX, wordY)).toEqual('adh');

    //        b  d  c  a  b  a
    //     0  0  0  0  0  0  0
    //  a  0  0  0  0 *1  1 *1
    //  b  0 *1  1  1  1 *2  2
    //  c  0  1  1 *2  2  2  2
    //  b  0 *1  1  2  2 *3  3
    //  d  0  1 *2  2  2  3  3
    //  a  0  1  2  2 *3  3 *4
    //  b  0 *1  2  2  3 *4  4

    // Result = bcba

    wordX = 'abcbdab';
    wordY = 'bdcaba';

    expect(printLcs(wordX, wordY)).toEqual('bcba');

    //        a  t  g  t  t  a  t
    //     0  0  0  0  0  0  0  0
    //  a  0 *1  1  1  1  1 *1  1
    //  t  0  1 *2  2 *2 *2  2 *2
    //  c  0  1  2  2  2  2  2  2
    //  g  0  1  2 *3  3  3  3  3
    //  t  0  1 *2  3 *4 *4  4 *4
    //  a  0 *1  2  3  4  4 *5  5
    //  c  0  1  2  3  4  4  5  5

    // Result = atgta

    wordX = 'atcgtac';
    wordY = 'atgttat';

    expect(printLcs(wordX, wordY)).toEqual('atgta');
  });
});
