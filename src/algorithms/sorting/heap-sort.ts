import { Compare, defaultCompare, CompareFunction, swap } from '../../util';

function heapify<T>(array: T[], index: number, size: number, compareFn: CompareFunction<T>) {
  let largest: number = index;

  const left: number = (2 * index) + 1;
  const right: number = (2 * index) + 2;

  if (left < size && compareFn(array[left], array[largest]) === Compare.BIGGER_THAN) {
    largest = left;
  }

  if (right < size && compareFn(array[right], array[largest]) === Compare.BIGGER_THAN) {
    largest = right;
  }

  if (largest !== index) {
    swap(array, index, largest);
    heapify(array, largest, size, compareFn);
  }
}

function buildMaxHeap<T>(array: T[], compareFn: CompareFunction<T>) {
  const maxIndex: number = Math.floor(array.length / 2) - 1;

  for (let i: number = maxIndex; i >= 0; i--) {
    heapify(array, i, array.length, compareFn);
  }

  return array;
}

export function heapSort<T>(array: T[], compareFn: CompareFunction<T> = defaultCompare): T[] {
  const newArray: T[] = [...array];

  let arraySize: number = newArray.length;

  buildMaxHeap(newArray, compareFn);

  while (--arraySize > 0) {
    swap(newArray, 0, arraySize);
    heapify(newArray, 0, arraySize, compareFn);
  }

  return newArray;
}
