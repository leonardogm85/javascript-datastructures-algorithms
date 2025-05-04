export function factorialIterative(number: number): number | undefined {
  if (number < 0) {
    return undefined;
  }

  let total: number = 1;

  for (let i: number = number; i > 1; i--) {
    total *= i;
  }

  return total;
}

export function factorial(number: number): number | undefined {
  if (number < 0) {
    return undefined;
  }

  if (number === 1 || number === 0) {
    return 1;
  }

  return number * factorial(number - 1)!;
}
