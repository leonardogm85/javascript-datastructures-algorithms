import { isNullOrUndefined } from '../../util';
import { insertionSort } from './insertion-sort';

function createBuckets(array: number[], bucketSize: number): number[][] {
  let minValue: number = array[0];
  let maxValue: number = array[0];

  for (let i: number = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }

  const bucketCount: number = Math.floor((maxValue - minValue) / bucketSize) + 1;

  const buckets: number[][] = [];

  for (let i: number = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }

  for (let i: number = 0; i < array.length; i++) {
    buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
  }

  return buckets;
}

function sortBuckets(buckets: number[][]): number[] {
  const sortedArray: number[] = [];

  for (let i: number = 0; i < buckets.length; i++) {
    if (!isNullOrUndefined(buckets[i])) {
      sortedArray.push(...insertionSort(buckets[i]));
    }
  }

  return sortedArray;
}

export function bucketSort(array: number[], bucketSize: number = 5): number[] {
  if (array.length < 2) {
    return array;
  }

  const buckets: number[][] = createBuckets(array, bucketSize);

  return sortBuckets(buckets);
}
