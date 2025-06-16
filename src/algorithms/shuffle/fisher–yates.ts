import { swap } from '../../util';

export function shuffle<T>(array: T[]): T[] {
  for (let i: number = array.length - 1; i > 0; i--) {
    const randomIndex: number = Math.floor(Math.random() * (i + 1));
    swap(array, i, randomIndex);
  }

  return array;
}
