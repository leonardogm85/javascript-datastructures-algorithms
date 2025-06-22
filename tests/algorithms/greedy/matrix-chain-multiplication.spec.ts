import { matrixChainMultiplication } from '../../../src/algorithms/greedy/matrix-chain-multiplication';

describe('Algorithms - Greedy: Matrix Chain Multiplication', () => {
  it('works with greedy approach', () => {
    let p: number[] | undefined;

    p = [10, 100, 5, 50, 1];

    expect(matrixChainMultiplication(p)).toEqual(1750);

    p = [10, 30, 5, 60];

    expect(matrixChainMultiplication(p)).toEqual(4500);

    p = [10, 20, 25, 60];

    expect(matrixChainMultiplication(p)).toEqual(20000);

    p = [2, 1, 3, 4];

    expect(matrixChainMultiplication(p)).toEqual(20);

    p = [30, 35, 15, 5];

    expect(matrixChainMultiplication(p)).toEqual(7875);
  });
});
