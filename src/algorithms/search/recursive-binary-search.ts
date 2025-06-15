import { Compare, CompareFunction, defaultCompare } from '../../util';
import { quickSort } from '../sorting/quick-sort';

function binarySearch<T>(array: T[], value: T, low: number, high: number, compareFn: CompareFunction<T> = defaultCompare): number {
  if (low <= high) {
    const mid: number = Math.floor((low + high) / 2);
    const element: T = array[mid];

    if (compareFn(element, value) === Compare.LESS_THAN) {
      return binarySearch(array, value, mid + 1, high, compareFn);
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
      return binarySearch(array, value, low, mid - 1, compareFn);
    } else {
      return mid;
    }
  }

  return -1;
}

export function recursiveBinarySearch<T>(array: T[], value: T, compareFn: CompareFunction<T> = defaultCompare): number {
  const sortedArray: T[] = quickSort(array, compareFn);
  const low: number = 0;
  const high: number = sortedArray.length - 1;

  return binarySearch(sortedArray, value, low, high, compareFn);
}
