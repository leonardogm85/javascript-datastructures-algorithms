import { Compare, CompareFunction, defaultCompare } from '../../util';

export function shellSort<T>(array: T[], compareFn: CompareFunction<T> = defaultCompare): T[] {
  let n: number = array.length;

  for (let gap: number = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i: number = gap; i < n; i++) {
      const temp: T = array[i];

      let j: number = i;

      while (j >= gap && compareFn(array[j - gap], temp) === Compare.BIGGER_THAN) {
        array[j] = array[j - gap];
        j -= gap;
      }

      array[j] = temp;
    }
  }

  return array;
}
