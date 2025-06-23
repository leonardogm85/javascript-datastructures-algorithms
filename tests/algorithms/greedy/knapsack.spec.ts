import { knapSack } from '../../../src/algorithms/greedy/knapsack';

describe('Algorithms - Greedy: KnapSack', () => {
  it('works with greedy approach', () => {
    let weights: number[] | undefined;
    let values: number[] | undefined;
    let capacity: number | undefined;

    weights = [2, 3, 4];
    values = [3, 4, 5];
    capacity = 6;

    expect(knapSack(capacity, weights, values)).toEqual(8.25);

    weights = [1, 2, 3];
    values = [6, 10, 12];
    capacity = 5;

    expect(knapSack(capacity, weights, values)).toEqual(24);

    weights = [2, 3, 4];
    values = [3, 4, 5];
    capacity = 5;

    expect(knapSack(capacity, weights, values)).toEqual(7);

    weights = [1, 3, 5, 8];
    values = [1, 5, 8, 10];
    capacity = 11;

    expect(knapSack(capacity, weights, values)).toEqual(16.75);

    weights = [3, 2, 4, 1];
    values = [8, 3, 9, 6];
    capacity = 5;

    expect(knapSack(capacity, weights, values)).toEqual(16.25);
  });
});
