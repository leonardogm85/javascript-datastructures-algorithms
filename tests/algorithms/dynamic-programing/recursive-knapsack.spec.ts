import { recursiveKnapSack } from '../../../src/algorithms/dynamic-programing/recursive-knapsack';

describe('KnapSack Dynamic Programming: Recursive', () => {
  it('works with DP approach', () => {
    let weights: number[] | undefined;
    let values: number[] | undefined;
    let n: number | undefined;
    let capacity: number | undefined;

    //  Capacity = 5
    //  Items = 3

    //     0  1  2  3  4  5
    //  0  0  0  0  0  0  0
    //  1  0  0  3  3  3  3
    //  2  0  0  3  4  4  7
    //  3  0  0  3  4  5  7

    //  Result = 7

    weights = [2, 3, 4];
    values = [3, 4, 5];
    n = values.length;
    capacity = 5;

    expect(recursiveKnapSack(n, capacity, weights, values)).toEqual(7);

    //  Capacity = 11
    //  Items = 4

    //     0  1  2  3  4  5  6  7  8  9 10 11
    //  0  0  0  0  0  0  0  0  0  0  0  0  0
    //  1  0  1  1  1  1  1  1  1  1  1  1  1
    //  2  0  1  1  5  6  6  6  6  6  6  6  6
    //  3  0  1  1  5  6  8  9  9 13 14 14 14
    //  4  0  1  1  5  6  8  9  9 13 14 14 15

    //  Result = 15

    weights = [1, 3, 5, 8];
    values = [1, 5, 8, 10];
    n = values.length;
    capacity = 11;

    expect(recursiveKnapSack(n, capacity, weights, values)).toEqual(15);

    //  Capacity = 5
    //  Items = 4

    //     0  1  2  3  4  5
    //  0  0  0  0  0  0  0
    //  1  0  0  0  8  8  8
    //  2  0  0  3  8  8 11
    //  3  0  0  3  8  9 11
    //  4  0  6  6  9 14 15

    //  Result = 15

    weights = [3, 2, 4, 1];
    values = [8, 3, 9, 6];
    n = values.length;
    capacity = 5;

    expect(recursiveKnapSack(n, capacity, weights, values)).toEqual(15);
  });
});
