export function recursiveKnapSack(n: number, capacity: number, weights: number[], values: number[]): number {
  if (n === 0 || capacity === 0) {
    return 0;
  }

  if (weights[n - 1] > capacity) {
    return recursiveKnapSack(n - 1, capacity, weights, values);
  } else {
    const a: number = values[n - 1]
      + recursiveKnapSack(n - 1, capacity - weights[n - 1], weights, values);

    const b: number = recursiveKnapSack(n - 1, capacity, weights, values);

    return a > b
      ? a
      : b;
  }
}
