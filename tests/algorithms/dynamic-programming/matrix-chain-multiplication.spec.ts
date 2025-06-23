import { matrixChainOrder } from '../../../src/algorithms/dynamic-programming/matrix-chain-multiplication';

describe('Algorithms - Dynamic Programming: Matrix Chain Multiplication', () => {
  it('works with DP approach', () => {
    let p: number[] | undefined;

    p = [10, 100, 5, 50, 1];

    expect(matrixChainOrder(p)).toEqual(1750);

    p = [10, 30, 5, 60];

    expect(matrixChainOrder(p)).toEqual(4500);

    p = [10, 20, 25, 60];

    expect(matrixChainOrder(p)).toEqual(20000);

    p = [2, 1, 3, 4];

    expect(matrixChainOrder(p)).toEqual(20);

    p = [30,35,15,5];

    expect(matrixChainOrder(p)).toEqual(7875);
  });
});
