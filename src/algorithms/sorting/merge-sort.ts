import { Compare, CompareFunction, defaultCompare } from '../../util';

function merge<T>(left: T[], right: T[], compareFn: CompareFunction<T>): T[] {
  let i: number = 0;
  let j: number = 0;

  const result: T[] = [];

  while (i < left.length && j < right.length) {
    result.push(
      compareFn(left[i], right[j]) === Compare.LESS_THAN
        ? left[i++]
        : right[j++]
    );
  }

  return result.concat(
    i < left.length
      ? left.slice(i)
      : right.slice(j)
  );
}

export function mergeSort<T>(array: T[], compareFn: CompareFunction<T> = defaultCompare): T[] {
  if (array.length > 1) {
    const middle: number = Math.floor(array.length / 2);

    const left: T[] = mergeSort(array.slice(0, middle), compareFn);
    const right: T[] = mergeSort(array.slice(middle, array.length), compareFn);

    array = merge(left, right, compareFn);
  }

  return array;
}
