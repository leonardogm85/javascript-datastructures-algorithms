import { Compare, CompareFunction, defaultCompare } from '../../util';

export function findMaxValue<T>(array: T[], compareFn: CompareFunction<T> = defaultCompare): T | undefined {
  if (array.length === 0) {
    return undefined;
  }

  let max: T = array[0];

  for (let i: number = 1; i < array.length; i++) {
    if (compareFn(max, array[i]) === Compare.LESS_THAN) {
      max = array[i];
    }
  }

  return max;
}

export function findMinValue<T>(array: T[], compareFn: CompareFunction<T> = defaultCompare): T | undefined {
  if (array.length === 0) {
    return undefined;
  }

  let min: T = array[0];

  for (let i: number = 1; i < array.length; i++) {
    if (compareFn(min, array[i]) === Compare.BIGGER_THAN) {
      min = array[i];
    }
  }

  return min;
}
