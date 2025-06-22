import { findMaxValue, findMinValue } from '../../../src/algorithms/search/min-max-search';

describe('Algorithms - Search: Min and Max Values Search', () => {
  const size: number = 10;

  function createSortedArray() {
    const array: number[] = [];

    for (let i: number = 1; i <= size; i++) {
      array.push(i);
    }

    return array;
  }

  it('min value - works with empty arrays', () => {
    expect(findMinValue([])).toBeUndefined();
  });

  it('max value - works with empty arrays', () => {
    expect(findMaxValue([])).toBeUndefined();
  });

  it('min value', () => {
    expect(findMinValue(createSortedArray())).toEqual(1);
  });

  it('max value', () => {
    expect(findMaxValue(createSortedArray())).toEqual(size);
  });
});
