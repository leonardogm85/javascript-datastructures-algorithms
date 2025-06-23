export function printMatrixChainOrder(p: number[]): string {
  const n: number = p.length;

  const m: number[][] = [];
  const s: number[][] = [];

  for (let i: number = 1; i <= n; i++) {
    m[i] = [];
    m[i][i] = 0;
  }

  for (let i: number = 0; i <= n; i++) {
    s[i] = [];

    for (let j: number = 0; j <= n; j++) {
      s[i][j] = 0;
    }
  }

  for (let l: number = 2; l < n; l++) {
    for (let i: number = 1; i <= n - l + 1; i++) {
      const j: number = i + l - 1;

      m[i][j] = Infinity;

      for (let k: number = i; k <= j - 1; k++) {
        const q: number = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];

        if (q < m[i][j]) {
          m[i][j] = q;
          s[i][j] = k;
        }
      }
    }
  }

  return printOptimalParenthesis(s, 1, n - 1);
}

function printOptimalParenthesis(s: number[][], i: number, j: number): string {
  if (i === j) {
    return `A[${i}]`;
  }

  const left: string = printOptimalParenthesis(s, i, s[i][j]);
  const right: string = printOptimalParenthesis(s, s[i][j] + 1, j);

  return `(${left}${right})`;
}
