import { Compare, CompareFunction, defaultCompare } from '../../util';
import { quickSort } from '../sorting/quick-sort';

export function binarySearch<T>(array: T[], value: T, compareFn: CompareFunction<T> = defaultCompare): number {
  const sortedArray: T[] = quickSort(array, compareFn);
  let low: number = 0;
  let high: number = sortedArray.length - 1;

  while (low <= high) {
    const mid: number = Math.floor((low + high) / 2);
    const element: T = sortedArray[mid];

    if (compareFn(element, value) === Compare.LESS_THAN) {
      low = mid + 1;
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}
