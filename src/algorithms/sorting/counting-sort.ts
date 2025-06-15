import { isNullOrUndefined } from '../../util';
import { findMaxValue } from '../search/min-max-search';

export function countingSort(array: number[]): number[] {
  if (array.length < 2) {
    return array;
  }

  const maxValue: number = findMaxValue(array)!;
  const counts: number[] = new Array(maxValue + 1);
  let sortedIndex: number = 0;

  array.forEach(element => {
    if (isNullOrUndefined(counts[element])) {
      counts[element] = 0;
    }

    counts[element]++;
  });

  counts.forEach((element, i) => {
    while (element > 0) {
      array[sortedIndex++] = i;
      element--;
    }
  });

  return array;
}
