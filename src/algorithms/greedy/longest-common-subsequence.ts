export function lcs(wordX: string, wordY: string, m: number = wordX.length, n: number = wordY.length): number {
  if (m === 0 || n === 0) {
    return 0;
  }

  if (wordX[m - 1] === wordY[n - 1]) {
    return 1 + lcs(wordX, wordY, m - 1, n - 1);
  } else {
    const a: number = lcs(wordX, wordY, m, n - 1);
    const b: number = lcs(wordX, wordY, m - 1, n);

    return a > b
      ? a
      : b;
  }
}
