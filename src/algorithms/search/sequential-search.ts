import { defaultEquals, EqualsFunction } from '../../util';

export function sequentialSearch<T>(array: T[], value: T, equalsFn: EqualsFunction<T> = defaultEquals): number {
  for (let i: number = 0; i < array.length; i++) {
    if (equalsFn(value, array[i])) {
      return i;
    }
  }

  return -1;
}
