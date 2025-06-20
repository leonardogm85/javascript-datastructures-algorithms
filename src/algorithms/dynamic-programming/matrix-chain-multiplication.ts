export function matrixChainMultiplication(p: number[]): number {
  const n: number = p.length;

  const m: number[][] = [];

  for (let i: number = 1; i <= n; i++) {
    m[i] = [];
    m[i][i] = 0;
  }

  for (let l: number = 2; l < n; l++) {
    for (let i: number = 1; i <= n - l + 1; i++) {
      const j: number = i + l - 1;

      m[i][j] = Infinity;

      for (let k: number = i; k <= j - 1; k++) {
        const q: number = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];

        if (q < m[i][j]) {
          m[i][j] = q;
        }
      }
    }
  }

  return m[1][n - 1];
}
