import { Compare, CompareFunction, defaultCompare, swap } from '../../util';

export function bubbleSort<T>(array: T[], compareFn: CompareFunction<T> = defaultCompare): T[] {
  for (let i: number = 0; i < array.length; i++) {
    for (let j: number = 0; j < array.length - 1; j++) {
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1);
      }
    }
  }
  return array;
}
