import { defaultCompare, reverseCompare } from '../../../src/util';

export function sortAlgorithmTests(sortAlgorithm: Function, algorithmName: string, config: { reverseCompare: boolean } = { reverseCompare: true }) {

  describe(algorithmName, () => {
    const size: number = 100;

    function createNonSortedArray(): number[] {
      const array: number[] = [];

      for (let i: number = size; i > 0; i--) {
        array.push(i);
      }

      return array;
    }

    function createSortedArray(): number[] {
      const array: number[] = [];

      for (let i: number = 1; i <= size; i++) {
        array.push(i);
      }

      return array;
    }

    it('works with empty arrays', () => {
      expect(sortAlgorithm([])).toEqual([]);
    });

    it('works with sorted arrays', () => {
      const sortedArray: number[] = createSortedArray();

      const array: number[] = sortAlgorithm(createSortedArray());

      expect(array).toEqual(sortedArray);
    });

    it('works with non-sorted arrays', () => {
      const sortedArray: number[] = createSortedArray();

      const array: number[] = sortAlgorithm(createNonSortedArray());

      expect(array).toEqual(sortedArray);

      for (let i: number = 0; i < array.length - 1; i++) {
        expect(array[i] <= array[i + 1]).toBeTruthy();
      }
    });

    if (config.reverseCompare) {
      it('works with reverse comparator - descending order', () => {
        const sortedArray: number[] = createNonSortedArray();

        const array: number[] = sortAlgorithm(createSortedArray(), reverseCompare(defaultCompare));

        expect(array).toEqual(sortedArray);

        for (let i: number = 0; i < array.length - 1; i++) {
          expect(array[i] >= array[i + 1]).toBeTruthy();
        }
      });
    }
  });

}
