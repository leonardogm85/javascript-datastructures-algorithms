export function printKnapSack(n: number, capacity: number, weights: number[], values: number[]): number[] {
  const ks: number[][] = [];

  for (let i: number = 0; i <= n; i++) {
    ks[i] = [];
  }

  for (let i: number = 0; i <= n; i++) {
    for (let w: number = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) {
        ks[i][w] = 0;
      } else if (weights[i - 1] <= w) {
        const a: number = values[i - 1] + ks[i - 1][w - weights[i - 1]];
        const b: number = ks[i - 1][w];

        ks[i][w] = a > b
          ? a
          : b;
      } else {
        ks[i][w] = ks[i - 1][w];
      }
    }
  }

  return findValues(n, capacity, weights, ks);
}

function findValues(n: number, capacity: number, weights: number[], ks: number[][]): number[] {
  const selectedItems: number[] = [];

  for (let i: number = n, w: number = capacity; i > 0 && w > 0; i--) {
    if (ks[i][w] !== ks[i - 1][w]) {
      w -= weights[i - 1];
      selectedItems.push(i - 1);
    }
  }

  return selectedItems;
}
