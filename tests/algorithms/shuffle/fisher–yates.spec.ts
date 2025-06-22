import { shuffle } from '../../../src/algorithms/shuffle/fisher–yates';

describe('Algorithms - Suffle: Fisher-Yates Suffle', () => {
  const size: number = 100;

  function createSortedArray(): number[] {
    const array: number[] = [];

    for (let i: number = 1; i <= size; i++) {
      array.push(i);
    }

    return array;
  }

  it('works with empty arrays', () => {
    const array: number[] = [];
    expect(shuffle(array)).toEqual(array);
  });

  it('works with arrays with a single value', () => {
    const array: number[] = [1];
    expect(shuffle(array)).toEqual(array);
  });

  it('works with sorted arrays', () => {
    const array: number[] = createSortedArray();
    expect(shuffle([...array])).not.toEqual(array);
  });
});
