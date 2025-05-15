import { heapSort } from '../../src/algorithms/sorting/heap-sort';
import { MaxHeap, MinHeap } from '../../src/data-structures/heap';
import { MyObject } from '../../src/models/my-object-model';
import { defaultCompare, ICompareFunction, reverseCompare } from '../../src/util';

describe('Heap', () => {
  it('starts empty MinHeap', () => {
    const heap: MinHeap<number> = new MinHeap<number>();
    expect(heap.findMinimum()).toBeUndefined();
    expect(heap.size()).toEqual(0);
    expect(heap.isEmpty()).toBeTruthy();
  });

  it('starts empty MaxHeap', () => {
    const heap: MaxHeap<number> = new MaxHeap<number>();
    expect(heap.findMinimum()).toBeUndefined();
    expect(heap.size()).toEqual(0);
    expect(heap.isEmpty()).toBeTruthy();
  });

  it('inserts values in the MinHeap', () => {
    const heap: MinHeap<number> = new MinHeap<number>();

    const array: number[] = [];

    for (let i: number = 1; i < 10; i++) {
      array.push(i);
      heap.insert(i);
      expect(heap.toArray()).toEqual(array);
    }

    expect(heap.size()).toEqual(array.length);
    expect(heap.isEmpty()).toBeFalsy();
  });

  it('inserts values in the MaxHeap', () => {
    const heap: MaxHeap<number> = new MaxHeap<number>();

    const array: number[] = [];

    for (let i: number = 10; i >= 1; i--) {
      array.push(i);
      heap.insert(i);
      expect(heap.toArray()).toEqual(array);
    }

    expect(heap.size()).toEqual(array.length);
    expect(heap.isEmpty()).toBeFalsy();
  });

  it('finds the min value from the MinHeap: sequential', () => {
    const heap: MinHeap<number> = new MinHeap<number>();

    for (let i: number = 10; i >= 1; i--) {
      heap.insert(i);
      expect(heap.findMinimum()).toEqual(i);
    }

    expect(heap.isEmpty()).toBeFalsy();
  });

  it('finds the min value from the MaxHeap: sequential', () => {
    const heap: MaxHeap<number> = new MaxHeap<number>();

    for (let i: number = 1; i <= 10; i++) {
      heap.insert(i);
      expect(heap.findMinimum()).toEqual(i);
    }

    expect(heap.isEmpty()).toBeFalsy();
  });

  it('inserts values in the MinHeap: random', () => {
    const heap: MinHeap<number> = new MinHeap<number>();

    let minValue: number | undefined;

    minValue = 1;

    //  n0 ->  1
    heap.insert(1);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([1]);

    //  n0 ->    1
    //          /
    //  n1 ->  3
    heap.insert(3);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([1, 3]);

    //  n0 ->    1
    //          / \
    //  n1 ->  3   5
    heap.insert(5);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([1, 3, 5]);

    //  n0 ->      1
    //            / \
    //  n1 ->    3   5
    //          /
    //  n2 ->  7
    heap.insert(7);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([1, 3, 5, 7]);

    //  n0 ->      1
    //            / \
    //  n1 ->    3   5
    //          / \
    //  n2 ->  7   9
    heap.insert(9);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([1, 3, 5, 7, 9]);

    minValue = 0;

    //  n0 ->        0
    //             /   \
    //  n1 ->    3       1
    //          / \     /
    //  n2 ->  7   9   5
    heap.insert(0);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([0, 3, 1, 7, 9, 5]);

    //  n0 ->        0
    //             /   \
    //  n1 ->    3       1
    //          / \     / \
    //  n2 ->  7   9   5   2
    heap.insert(2);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([0, 3, 1, 7, 9, 5, 2]);

    //  n0 ->          0
    //               /   \
    //  n1 ->      3       1
    //            / \     / \
    //  n2 ->    4   9   5   2
    //          /
    //  n3 ->  7
    heap.insert(4);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([0, 3, 1, 4, 9, 5, 2, 7]);

    //  n0 ->          0
    //               /   \
    //  n1 ->      3       1
    //            / \     / \
    //  n2 ->    4   9   5   2
    //          / \
    //  n3 ->  7   6
    heap.insert(6);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([0, 3, 1, 4, 9, 5, 2, 7, 6]);

    //  n0 ->             0
    //                 /     \
    //  n1 ->        3         1
    //             /   \      / \
    //  n2 ->    4       9   5   2
    //          / \     /
    //  n3 ->  7   6   8
    heap.insert(8);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([0, 3, 1, 4, 8, 5, 2, 7, 6, 9]);

    expect(heap.isEmpty()).toBeFalsy();
  });

  it('inserts values in the MaxHeap: random', () => {
    const heap: MaxHeap<number> = new MaxHeap<number>();

    let minValue: number | undefined;

    minValue = 1;

    //  n0 ->  1
    heap.insert(1);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([1]);

    minValue = 3;

    //  n0 ->    3
    //          /
    //  n1 ->  1
    heap.insert(3);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([3, 1]);

    minValue = 5;

    //  n0 ->    5
    //          / \
    //  n1 ->  1   3
    heap.insert(5);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([5, 1, 3]);

    minValue = 7;

    //  n0 ->      7
    //            / \
    //  n1 ->    5   3
    //          /
    //  n2 ->  1
    heap.insert(7);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([7, 5, 3, 1]);

    minValue = 9;

    //  n0 ->      9
    //            / \
    //  n1 ->    7   3
    //          / \
    //  n2 ->  1   5
    heap.insert(9);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([9, 7, 3, 1, 5]);

    //  n0 ->        9
    //             /   \
    //  n1 ->    7       3
    //          / \     /
    //  n2 ->  1   5   0
    heap.insert(0);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([9, 7, 3, 1, 5, 0]);

    //  n0 ->        9
    //             /   \
    //  n1 ->    7       3
    //          / \     / \
    //  n2 ->  1   5   0   2
    heap.insert(2);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([9, 7, 3, 1, 5, 0, 2]);

    //  n0 ->          9
    //               /   \
    //  n1 ->      7       3
    //            / \     / \
    //  n2 ->    4   5   0   2
    //          /
    //  n3 ->  1
    heap.insert(4);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([9, 7, 3, 4, 5, 0, 2, 1]);

    //  n0 ->          9
    //               /   \
    //  n1 ->      7       3
    //            / \     / \
    //  n2 ->    6   5   0   2
    //          / \
    //  n3 ->  1   4
    heap.insert(6);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([9, 7, 3, 6, 5, 0, 2, 1, 4]);

    //  n0 ->             9
    //                 /     \
    //  n1 ->        8         3
    //             /   \      / \
    //  n2 ->    6       7   0   2
    //          / \     /
    //  n3 ->  1   4   5
    heap.insert(8);
    expect(heap.findMinimum()).toEqual(minValue);
    expect(heap.toArray()).toEqual([9, 8, 3, 6, 7, 0, 2, 1, 4, 5]);

    expect(heap.isEmpty()).toBeFalsy();
  });

  it('extracts the min value from the MinHeap', () => {
    const heap: MinHeap<number> = new MinHeap<number>();

    for (let i: number = 1; i <= 9; i++) {
      heap.insert(i);
    }

    //  n0 ->          1
    //               /   \
    //  n1 ->      2       3
    //            / \     / \
    //  n2 ->    4   5   6   7
    //          / \
    //  n3 ->  8   9
    const array: number[][] = [
      //  n0 ->          2
      //               /   \
      //  n1 ->      4       3
      //            / \     / \
      //  n2 ->    8   5   6   7
      //          /
      //  n3 ->  9
      [2, 4, 3, 8, 5, 6, 7, 9],

      //  n0 ->        3
      //             /   \
      //  n1 ->    4       6
      //          / \     / \
      //  n2 ->  8   5   9   7
      [3, 4, 6, 8, 5, 9, 7],

      //  n0 ->        4
      //             /   \
      //  n1 ->    5       6
      //          / \     /
      //  n2 ->  8   7   9
      [4, 5, 6, 8, 7, 9],

      //  n0 ->        5
      //             /   \
      //  n1 ->    7       6
      //          / \
      //  n2 ->  8   9
      [5, 7, 6, 8, 9],

      //  n0 ->        6
      //             /   \
      //  n1 ->    7       9
      //          /
      //  n2 ->  8
      [6, 7, 9, 8],

      //  n0 ->      7
      //           /   \
      //  n1 ->  8       9
      [7, 8, 9],

      //  n0 ->      8
      //           /
      //  n1 ->  9
      [8, 9],

      //  n0 ->  9
      [9],

      []
    ];

    for (let i: number = 1; i <= 9; i++) {
      expect(heap.extract()).toEqual(i);
      expect(heap.toArray()).toEqual(array[i - 1]);
    }

    expect(heap.isEmpty()).toBeTruthy();
  });

  it('extracts the min value from the MaxHeap', () => {
    const heap: MaxHeap<number> = new MaxHeap<number>();

    for (let i: number = 1; i <= 9; i++) {
      heap.insert(i);
    }

    //  n0 ->          9
    //               /   \
    //  n1 ->      8       6
    //            / \     / \
    //  n2 ->    7   3   2   5
    //          / \
    //  n3 ->  1   4
    const array: number[][] = [
      //  n0 ->          8
      //               /   \
      //  n1 ->      7       6
      //            / \     / \
      //  n2 ->    4   3   2   5
      //          /
      //  n3 ->  1
      [8, 7, 6, 4, 3, 2, 5, 1],

      //  n0 ->        7
      //             /   \
      //  n1 ->    4       6
      //          / \     / \
      //  n2 ->  1   3   2   5
      [7, 4, 6, 1, 3, 2, 5],

      //  n0 ->        6
      //             /   \
      //  n1 ->    4       5
      //          / \     /
      //  n2 ->  1   3   2
      [6, 4, 5, 1, 3, 2],

      //  n0 ->        5
      //             /   \
      //  n1 ->    4       2
      //          / \
      //  n2 ->  1   3
      [5, 4, 2, 1, 3],

      //  n0 ->        4
      //             /   \
      //  n1 ->    3       2
      //          /
      //  n2 ->  1
      [4, 3, 2, 1],

      //  n0 ->      3
      //           /   \
      //  n1 ->  1       2
      [3, 1, 2],

      //  n0 ->      2
      //           /
      //  n1 ->  1
      [2, 1],

      //  n0 ->  1
      [1],

      []
    ];

    for (let i: number = 9; i >= 1; i--) {
      expect(heap.extract()).toEqual(i);
      expect(heap.toArray()).toEqual(array[9 - i]);
    }

    expect(heap.isEmpty()).toBeTruthy();
  });

  it('performs heapify in the MinHeap', () => {
    const heap: MinHeap<number> = new MinHeap<number>();

    const array: number[] = [];

    for (let i: number = 9; i >= 1; i--) {
      array.push(i);
    }

    //  n0 ->          9
    //               /   \
    //  n1 ->      8       7
    //            / \     / \
    //  n2 ->    6   5   4   3
    //          / \
    //  n3 ->  2   1

    // [9, 8, 7, 6, 5, 4, 3, 2, 1]

    expect(heap.heapify(array)).toEqual([1, 2, 3, 6, 5, 4, 7, 8, 9]);

    //  n0 ->          1
    //               /   \
    //  n1 ->      2       3
    //            / \     / \
    //  n2 ->    6   5   4   7
    //          / \
    //  n3 ->  8   9

    // [1, 2, 3, 6, 5, 4, 7, 8, 9]
  });

  it('performs heapify in the MaxHeap', () => {
    const heap: MaxHeap<number> = new MaxHeap<number>();

    const array: number[] = [];

    for (let i: number = 1; i <= 9; i++) {
      array.push(i);
    }

    //  n0 ->          1
    //               /   \
    //  n1 ->      2       3
    //            / \     / \
    //  n2 ->    4   5   6   7
    //          / \
    //  n3 ->  8   9

    // [1, 2, 3, 4, 5, 6, 7, 8, 9]

    expect(heap.heapify(array)).toEqual([9, 8, 7, 4, 5, 6, 3, 2, 1]);

    //  n0 ->          9
    //               /   \
    //  n1 ->      8       7
    //            / \     / \
    //  n2 ->    4   5   6   3
    //          / \
    //  n3 ->  2   1

    // [9, 8, 7, 4, 5, 6, 3, 2, 1]
  });

  it('returns the correct size: MinHeap', () => {
    const heap: MinHeap<number> = new MinHeap<number>();

    expect(heap.size()).toEqual(0);

    heap.insert(1);
    expect(heap.size()).toEqual(1);

    heap.insert(2);
    expect(heap.size()).toEqual(2);

    heap.insert(3);
    expect(heap.size()).toEqual(3);

    heap.clear();
    expect(heap.isEmpty()).toBeTruthy();

    heap.insert(1);
    heap.insert(2);
    heap.insert(3);

    heap.extract();
    expect(heap.size()).toEqual(2);

    heap.extract();
    expect(heap.size()).toEqual(1);

    heap.extract();
    expect(heap.size()).toEqual(0);

    heap.extract();
    expect(heap.size()).toEqual(0);
  });

  it('returns the correct size: MaxHeap', () => {
    const heap: MaxHeap<number> = new MaxHeap<number>();

    expect(heap.size()).toEqual(0);

    heap.insert(1);
    expect(heap.size()).toEqual(1);

    heap.insert(2);
    expect(heap.size()).toEqual(2);

    heap.insert(3);
    expect(heap.size()).toEqual(3);

    heap.clear();
    expect(heap.isEmpty()).toBeTruthy();

    heap.insert(1);
    heap.insert(2);
    heap.insert(3);

    heap.extract();
    expect(heap.size()).toEqual(2);

    heap.extract();
    expect(heap.size()).toEqual(1);

    heap.extract();
    expect(heap.size()).toEqual(0);

    heap.extract();
    expect(heap.size()).toEqual(0);
  });

  it('returns if it is empty: MinHeap', () => {
    const heap: MinHeap<number> = new MinHeap<number>();

    expect(heap.isEmpty()).toBeTruthy();

    heap.insert(1);
    expect(heap.isEmpty()).toBeFalsy();

    heap.insert(2);
    expect(heap.isEmpty()).toBeFalsy();

    heap.insert(3);
    expect(heap.isEmpty()).toBeFalsy();

    heap.clear();
    expect(heap.isEmpty()).toBeTruthy();

    heap.insert(1);
    heap.insert(2);
    heap.insert(3);

    heap.extract();
    expect(heap.isEmpty()).toBeFalsy();

    heap.extract();
    expect(heap.isEmpty()).toBeFalsy();

    heap.extract();
    expect(heap.isEmpty()).toBeTruthy();

    heap.extract();
    expect(heap.isEmpty()).toBeTruthy();
  });

  it('returns if it is empty: MaxHeap', () => {
    const heap: MaxHeap<number> = new MaxHeap<number>();

    expect(heap.isEmpty()).toBeTruthy();

    heap.insert(1);
    expect(heap.isEmpty()).toBeFalsy();

    heap.insert(2);
    expect(heap.isEmpty()).toBeFalsy();

    heap.insert(3);
    expect(heap.isEmpty()).toBeFalsy();

    heap.clear();
    expect(heap.isEmpty()).toBeTruthy();

    heap.insert(1);
    heap.insert(2);
    heap.insert(3);

    heap.extract();
    expect(heap.isEmpty()).toBeFalsy();

    heap.extract();
    expect(heap.isEmpty()).toBeFalsy();

    heap.extract();
    expect(heap.isEmpty()).toBeTruthy();

    heap.extract();
    expect(heap.isEmpty()).toBeTruthy();
  });

  it('clears the stack: MinHeap', () => {
    const heap: MinHeap<number> = new MinHeap<number>();

    heap.clear();
    expect(heap.isEmpty()).toBeTruthy();

    heap.insert(1);
    heap.insert(2);

    heap.clear();
    expect(heap.isEmpty()).toBeTruthy();
  });

  it('clears the stack: MaxHeap', () => {
    const heap: MaxHeap<number> = new MaxHeap<number>();

    heap.clear();
    expect(heap.isEmpty()).toBeTruthy();

    heap.insert(1);
    heap.insert(2);

    heap.clear();
    expect(heap.isEmpty()).toBeTruthy();
  });

  it('returns toString primitive types: MinHeap', () => {
    const heapNumber: MinHeap<number> = new MinHeap<number>();

    expect(heapNumber.toString()).toEqual('');

    heapNumber.insert(2);
    expect(heapNumber.toString()).toEqual('2');

    heapNumber.insert(4);
    expect(heapNumber.toString()).toEqual('2,4');

    heapNumber.insert(6);
    expect(heapNumber.toString()).toEqual('2,4,6');

    heapNumber.insert(8);
    expect(heapNumber.toString()).toEqual('2,4,6,8');

    heapNumber.insert(1);
    expect(heapNumber.toString()).toEqual('1,2,4,6,8');

    heapNumber.insert(3);
    expect(heapNumber.toString()).toEqual('1,2,3,4,6,8');

    heapNumber.insert(5);
    expect(heapNumber.toString()).toEqual('1,2,3,4,5,6,8');

    heapNumber.insert(7);
    expect(heapNumber.toString()).toEqual('1,2,3,4,5,6,7,8');

    heapNumber.insert(9);
    expect(heapNumber.toString()).toEqual('1,2,3,4,5,6,7,8,9');

    heapNumber.clear();
    expect(heapNumber.toString()).toEqual('');

    const heapString: MinHeap<string> = new MinHeap<string>();

    heapString.insert('e2');
    expect(heapString.toString()).toEqual('e2');

    heapString.insert('e4');
    expect(heapString.toString()).toEqual('e2,e4');

    heapString.insert('e6');
    expect(heapString.toString()).toEqual('e2,e4,e6');

    heapString.insert('e8');
    expect(heapString.toString()).toEqual('e2,e4,e6,e8');

    heapString.insert('e1');
    expect(heapString.toString()).toEqual('e1,e2,e4,e6,e8');

    heapString.insert('e3');
    expect(heapString.toString()).toEqual('e1,e2,e3,e4,e6,e8');

    heapString.insert('e5');
    expect(heapString.toString()).toEqual('e1,e2,e3,e4,e5,e6,e8');

    heapString.insert('e7');
    expect(heapString.toString()).toEqual('e1,e2,e3,e4,e5,e6,e7,e8');

    heapString.insert('e9');
    expect(heapString.toString()).toEqual('e1,e2,e3,e4,e5,e6,e7,e8,e9');

    heapNumber.clear();
    expect(heapNumber.toString()).toEqual('');
  });

  it('returns toString primitive types: MaxHeap', () => {
    const heapNumber: MaxHeap<number> = new MaxHeap<number>();

    expect(heapNumber.toString()).toEqual('');

    heapNumber.insert(2);
    expect(heapNumber.toString()).toEqual('2');

    heapNumber.insert(4);
    expect(heapNumber.toString()).toEqual('4,2');

    heapNumber.insert(6);
    expect(heapNumber.toString()).toEqual('6,4,2');

    heapNumber.insert(8);
    expect(heapNumber.toString()).toEqual('8,6,4,2');

    heapNumber.insert(1);
    expect(heapNumber.toString()).toEqual('8,6,4,2,1');

    heapNumber.insert(3);
    expect(heapNumber.toString()).toEqual('8,6,4,3,2,1');

    heapNumber.insert(5);
    expect(heapNumber.toString()).toEqual('8,6,5,4,3,2,1');

    heapNumber.insert(7);
    expect(heapNumber.toString()).toEqual('8,7,6,5,4,3,2,1');

    heapNumber.insert(9);
    expect(heapNumber.toString()).toEqual('9,8,7,6,5,4,3,2,1');

    heapNumber.clear();
    expect(heapNumber.toString()).toEqual('');

    const heapString: MaxHeap<string> = new MaxHeap<string>();

    heapString.insert('e2');
    expect(heapString.toString()).toEqual('e2');

    heapString.insert('e4');
    expect(heapString.toString()).toEqual('e4,e2');

    heapString.insert('e6');
    expect(heapString.toString()).toEqual('e6,e4,e2');

    heapString.insert('e8');
    expect(heapString.toString()).toEqual('e8,e6,e4,e2');

    heapString.insert('e1');
    expect(heapString.toString()).toEqual('e8,e6,e4,e2,e1');

    heapString.insert('e3');
    expect(heapString.toString()).toEqual('e8,e6,e4,e3,e2,e1');

    heapString.insert('e5');
    expect(heapString.toString()).toEqual('e8,e6,e5,e4,e3,e2,e1');

    heapString.insert('e7');
    expect(heapString.toString()).toEqual('e8,e7,e6,e5,e4,e3,e2,e1');

    heapString.insert('e9');
    expect(heapString.toString()).toEqual('e9,e8,e7,e6,e5,e4,e3,e2,e1');

    heapString.clear();
    expect(heapString.toString()).toEqual('');
  });

  it('returns toString objects: MinHeap', () => {
    const heapMyObject: MinHeap<MyObject> = new MinHeap<MyObject>();

    expect(heapMyObject.toString()).toEqual('');

    heapMyObject.insert(new MyObject(1, 2));
    expect(heapMyObject.toString()).toEqual('1|2');

    heapMyObject.insert(new MyObject(5, 6));
    expect(heapMyObject.toString()).toEqual('1|2,5|6');

    heapMyObject.insert(new MyObject(3, 4));
    expect(heapMyObject.toString()).toEqual('1|2,3|4,5|6');

    heapMyObject.insert(new MyObject(7, 8));
    expect(heapMyObject.toString()).toEqual('1|2,3|4,5|6,7|8');
  });

  it('returns toString objects: MaxHeap', () => {
    const heapMyObject: MaxHeap<MyObject> = new MaxHeap<MyObject>();

    expect(heapMyObject.toString()).toEqual('');

    heapMyObject.insert(new MyObject(1, 2));
    expect(heapMyObject.toString()).toEqual('1|2');

    heapMyObject.insert(new MyObject(5, 6));
    expect(heapMyObject.toString()).toEqual('5|6,1|2');

    heapMyObject.insert(new MyObject(3, 4));
    expect(heapMyObject.toString()).toEqual('5|6,3|4,1|2');

    heapMyObject.insert(new MyObject(7, 8));
    expect(heapMyObject.toString()).toEqual('7|8,5|6,3|4,1|2');
  });

  it('Heap Sort: MinHeap', () => {
    const array: number[] = [3, 2, 5, 6, 1, 7, 8, 9];

    const compareFn: ICompareFunction<number> = defaultCompare;

    expect(heapSort(array, compareFn)).toEqual([1, 2, 3, 5, 6, 7, 8, 9]);
  });

  it('Heap Sort: MaxHeap', () => {
    const array: number[] = [3, 2, 5, 6, 1, 7, 8, 9];

    const compareFn: ICompareFunction<number> = reverseCompare(defaultCompare);

    expect(heapSort(array, compareFn)).toEqual([9, 8, 7, 6, 5, 3, 2, 1]);
  });
});
