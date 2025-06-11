import { Compare, CompareFunction, defaultCompare } from '../../util';

export function insertionSort<T>(array: T[], compareFn: CompareFunction<T> = defaultCompare): T[] {
  let temp: T | undefined;

  for (let i: number = 1; i < array.length; i++) {
    let j: number = i;

    temp = array[i];

    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      array[j] = array[--j];
    }

    array[j] = temp;
  }

  return array;
};
