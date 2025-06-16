import { biggerEquals, Compare, CompareFunction, defaultCompare, lesserEquals } from '../../util';

export function interpolationSearch<T>(array: T[], value: T, compareFn: CompareFunction<T> = defaultCompare): number {
  let low: number = 0;
  let high: number = array.length - 1;

  let delta: number = -1;

  let position: number = -1;

  while (low <= high && biggerEquals(value, array[low], compareFn) && lesserEquals(value, array[high], compareFn)) {
    delta = compareFn(value, array[low]) / compareFn(array[high], array[low]);

    position = low + Math.floor((high - low) * delta);

    if (compareFn(array[position], value) === Compare.EQUALS) {
      return position;
    }

    if (compareFn(array[position], value) === Compare.LESS_THAN) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }

  return -1;
}
