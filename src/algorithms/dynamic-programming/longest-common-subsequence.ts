export function lcs(wordX: string, wordY: string): number {
  const m: number = wordX.length;
  const n: number = wordY.length;

  const l: number[][] = [];

  for (let i: number = 0; i <= m; i++) {
    l[i] = [];

    for (let j: number = 0; j <= n; j++) {
      l[i][j] = 0;
    }
  }

  for (let i: number = 0; i <= m; i++) {
    for (let j: number = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        l[i][j] = 0;
      } else if (wordX[i - 1] === wordY[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1;
      } else {
        const a: number = l[i - 1][j];
        const b: number = l[i][j - 1];

        l[i][j] = a > b
          ? a
          : b;
      }
    }
  }

  return l[m][n];
}
