export function matrixChainMultiplication(p: number[], i: number = 1, j: number = p.length - 1): number {
  if (i === j) {
    return 0;
  }

  let min: number = Infinity;

  for (let k: number = i; k < j; k++) {
    const count: number = matrixChainMultiplication(p, i, k) + matrixChainMultiplication(p, k + 1, j) + p[i - 1] * p[k] * p[j];

    if (count < min) {
      min = count;
    }
  }

  return min;
}
