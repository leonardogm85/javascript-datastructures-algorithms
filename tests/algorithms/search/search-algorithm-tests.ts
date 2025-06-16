import { Compare, CompareFunction, CustomFunction, EqualsFunction } from '../../../src/util';

interface CustomObject {
  key: number;
}

interface SearchAlgorithmConfig {
  customFunction: CustomFunction.EQUALS | CustomFunction.COMPARE;
}

const customEquals: EqualsFunction<CustomObject> = (a: CustomObject, b: CustomObject): boolean => {
  return a.key === b.key
};

const customCompare: CompareFunction<CustomObject> = (a: CustomObject, b: CustomObject): number => {
  if (a.key === b.key) {
    return Compare.EQUALS;
  }

  if (a.key < b.key) {
    return Compare.LESS_THAN;
  }

  return Compare.BIGGER_THAN;
};

export function searchAlgorithmTests(searchAlgorithm: Function, algorithmName: string, config: SearchAlgorithmConfig | undefined = undefined) {
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
      for (let v: number = 1; v <= size; v++) {
        expect(searchAlgorithm(createSortedArray(), v)).toEqual(v - 1);
      }
    });

    if (config) {
      it('finds value with custom equals or compare function', () => {
        const array: CustomObject[] = [
          { key: 1 },
          { key: 2 },
          { key: 3 }
        ];

        if (config.customFunction === CustomFunction.EQUALS) {
          expect(searchAlgorithm(array, { key: 2 }, customEquals)).toEqual(1);
        } else {
          expect(searchAlgorithm(array, { key: 2 }, customCompare)).toEqual(1);
        }
      });
    }
  });
}
