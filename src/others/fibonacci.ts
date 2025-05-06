import { isNullOrUndefined } from '../util';

export function fibonacciIterative(n: number): number {
  if (n < 1) {
    return 0;
  }

  let nMinus2: number = 0;
  let nMinus1: number = 1;

  let number: number = n;

  for (let i: number = 2; i <= n; i++) {
    number = nMinus1 + nMinus2;
    nMinus2 = nMinus1;
    nMinus1 = number;
  }

  return number;
}

export function fibonacciIterativeMemoization(n: number): number {
  if (n < 1) {
    return 0;
  }

  const memo: number[] = [0, 1];

  for (let i: number = 2; i < n + 1; i++) {
    memo.push(memo[i - 2] + memo[i - 1]);
  }

  return memo[n];
}

export function fibonacci(n: number): number {
  if (n < 1) {
    return 0;
  }

  if (n <= 2) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

export function fibonacciMemoization(n: number) {
  if (n < 1) {
    return 0;
  }

  const memo: number[] = [0, 1];

  const fibonacciInternal = (nInternal: number): number => {
    if (!isNullOrUndefined(memo[nInternal])) {
      return memo[nInternal];
    }

    return (memo[nInternal] = fibonacciInternal(nInternal - 1) + fibonacciInternal(nInternal - 2));
  };

  return fibonacciInternal(n);
}
