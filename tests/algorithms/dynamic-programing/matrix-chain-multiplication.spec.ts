import { matrixChainMultiplication } from '../../../src/algorithms/dynamic-programing/matrix-chain-multiplication';

describe('Matrix Chain Multiplication', () => {
  it('works with DP approach', () => {
    let p: number[] | undefined;

    p = [10, 100, 5, 50, 1];

    expect(matrixChainMultiplication(p)).toEqual(1750);

    p = [10, 30, 5, 60];

    expect(matrixChainMultiplication(p)).toEqual(4500);

    p = [10, 20, 25, 60];

    expect(matrixChainMultiplication(p)).toEqual(20000);

    p = [2, 1, 3, 4];

    expect(matrixChainMultiplication(p)).toEqual(20);
  });
});
