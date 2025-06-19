function printSolution(solution: string[][], wordX: string, m: number, n: number): string {
  let a: number = m;
  let b: number = n;

  let x: string = solution[a][b];

  let answer: string = '';

  while (x !== '0') {
    if (solution[a][b] === 'diagonal') {
      answer = wordX[a - 1] + answer;
      a--;
      b--;
    } else if (solution[a][b] === 'left') {
      b--;
    } else if (solution[a][b] === 'top') {
      a--;
    }

    x = solution[a][b];
  }

  return answer;
}

export function printLcs(wordX: string, wordY: string): string {
  const m: number = wordX.length;
  const n: number = wordY.length;

  const l: number[][] = [];
  const s: string[][] = [];

  for (let i: number = 0; i <= m; i++) {
    l[i] = [];
    s[i] = [];

    for (let j: number = 0; j <= n; j++) {
      l[i][j] = 0;
      s[i][j] = '0';
    }
  }

  for (let i: number = 0; i <= m; i++) {
    for (let j: number = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        l[i][j] = 0;
      } else if (wordX[i - 1] === wordY[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1;
        s[i][j] = 'diagonal';
      } else {
        const a: number = l[i - 1][j];
        const b: number = l[i][j - 1];

        l[i][j] = a > b
          ? a
          : b;

        s[i][j] = l[i][j] === l[i - 1][j]
          ? 'top'
          : 'left';
      }
    }
  }

  return printSolution(s, wordX, m, n);
}
