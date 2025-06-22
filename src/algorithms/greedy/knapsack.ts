export function knapSack(capacity: number, weights: number[], values: number[]): number {
  const n: number = values.length;

  let load: number = 0;
  let value: number = 0;

  let indexes: number[] = [];

  for (let i: number = 0; i < n; i++) {
    indexes[i] = i;
  }

  indexes = indexes.sort((a, b) => values[b] / weights[b] - values[a] / weights[a]);

  for (let i: number = 0; i < n && load < capacity; i++) {
    const index: number = indexes[i];

    if (weights[index] <= capacity - load) {
      value += values[index];
      load += weights[index];
    } else {
      const ratio: number = (capacity - load) / weights[index];

      value += ratio * values[index];
      load += weights[index];
    }
  }

  return value;
}
