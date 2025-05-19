export function factorialIterative(n: number): number | undefined {
  if (n < 0) {
    return undefined;
  }

  let total: number = 1;

  for (let i: number = n; i > 1; i--) {
    total *= i;
  }

  return total;
}

export function factorial(n: number): number | undefined {
  if (n < 0) {
    return undefined;
  }

  if (n === 0 || n === 1) {
    return 1;
  }

  return n * factorial(n - 1)!;
}
