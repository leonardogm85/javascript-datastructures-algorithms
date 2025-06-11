import { Compare, CompareFunction, defaultCompare, swap } from '../../util';

export function selectionSort<T>(array: T[], compareFn: CompareFunction<T> = defaultCompare): T[] {
  for (let i: number = 0; i < array.length - 1; i++) {
    let indexMin: number = i;

    for (let j: number = i; j < array.length; j++) {
      if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        indexMin = j;
      }
    }

    if (i !== indexMin) {
      swap(array, i, indexMin);
    }
  }

  return array;
};
