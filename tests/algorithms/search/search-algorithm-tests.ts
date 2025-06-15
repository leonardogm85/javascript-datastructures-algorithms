import { EqualsFunction } from '../../../src/util';

interface CustomObject {
  key: number;
}

const customEquals: EqualsFunction<CustomObject> = (a: CustomObject, b: CustomObject) => a.key === b.key;

export function searchAlgorithmTests(searchAlgorithm: Function, algorithmName: string, config: { customEquals: boolean } = { customEquals: true }) {
  describe(algorithmName, () => {
    const size: number = 10;

    function createSortedArray(): number[] {
      const array: number[] = [];

      for (let i: number = 1; i <= size; i++) {
        array.push(i);
      }

      return array;
    }

    it('works with empty arrays', () => {
      expect(searchAlgorithm([], 1)).toEqual(-1);
    });

    it('finds value at the first position', () => {
      expect(searchAlgorithm(createSortedArray(), 1)).toEqual(0);
    });

    it('finds value at the last position', () => {
      expect(searchAlgorithm(createSortedArray(), size)).toEqual(size - 1);
    });

    it('finds value at different positions', () => {
      for (let value: number = 1; value <= size; value++) {
        expect(searchAlgorithm(createSortedArray(), value)).toEqual(value - 1);
      }
    });

    if (config.customEquals) {
      it('finds value with custom equals function', () => {
        const array: CustomObject[] = [{ key: 1 }, { key: 2 }, { key: 3 }];
        expect(searchAlgorithm(array, { key: 2 }, customEquals)).toEqual(1);
      });
    }
  });
}
