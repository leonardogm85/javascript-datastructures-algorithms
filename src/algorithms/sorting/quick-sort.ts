import { Compare, CompareFunction, defaultCompare, swap } from '../../util';

function partition<T>(array: T[], left: number, right: number, compareFn: CompareFunction<T>): number {
  const pivot: T = array[Math.floor((right + left) / 2)];

  let i: number = left;
  let j: number = right;

  while (i <= j) {
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++;
    }

    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--;
    }

    if (i <= j) {
      swap(array, i, j);

      i++;
      j--;
    }
  }

  return i;
};

function quick<T>(array: T[], left: number, right: number, compareFn: CompareFunction<T>): T[] {
  let index: number = 0;

  if (array.length > 1) {
    index = partition(array, left, right, compareFn);

    if (left < index - 1) {
      quick(array, left, index - 1, compareFn);
    }

    if (index < right) {
      quick(array, index, right, compareFn);
    }
  }

  return array;
};

export function quickSort<T>(array: T[], compareFn: CompareFunction<T> = defaultCompare): T[] {
  return quick(array, 0, array.length - 1, compareFn);
};
