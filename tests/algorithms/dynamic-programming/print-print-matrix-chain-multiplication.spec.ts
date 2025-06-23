import { printMatrixChainOrder } from '../../../src/algorithms/dynamic-programming/print-matrix-chain-multiplication';

describe('Algorithms - Dynamic Programming: Print Matrix Chain Multiplication', () => {
  it('works with DP approach', () => {
    let p: number[] | undefined;

    p = [10, 100, 5, 50, 1];

    expect(printMatrixChainOrder(p)).toEqual('(A[1](A[2](A[3]A[4])))');

    p = [10, 30, 5, 60];

    expect(printMatrixChainOrder(p)).toEqual('((A[1]A[2])A[3])');

    p = [10, 20, 25, 60];

    expect(printMatrixChainOrder(p)).toEqual('((A[1]A[2])A[3])');

    p = [2, 1, 3, 4];

    expect(printMatrixChainOrder(p)).toEqual('(A[1](A[2]A[3]))');

    p = [30, 35, 15, 5];

    expect(printMatrixChainOrder(p)).toEqual('(A[1](A[2]A[3]))');
  });
});
