import { MaxHeap, MinHeap } from "../../src/data-structures/heap";
import { MyObject } from "../../src/models/my-object-model";

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

    heap.insert(1);
    expect(heap.findMinimum()).toEqual(minValue);

    heap.insert(3);
    expect(heap.findMinimum()).toEqual(minValue);

    heap.insert(5);
    expect(heap.findMinimum()).toEqual(minValue);

    heap.insert(7);
    expect(heap.findMinimum()).toEqual(minValue);

    heap.insert(9);
    expect(heap.findMinimum()).toEqual(minValue);

    minValue = 0;

    heap.insert(0);
    expect(heap.findMinimum()).toEqual(minValue);

    heap.insert(2);
    expect(heap.findMinimum()).toEqual(minValue);

    heap.insert(4);
    expect(heap.findMinimum()).toEqual(minValue);

    heap.insert(6);
    expect(heap.findMinimum()).toEqual(minValue);

    heap.insert(8);
    expect(heap.findMinimum()).toEqual(minValue);

    expect(heap.isEmpty()).toBeFalsy();
  });

  it('inserts values in the MaxHeap: random', () => {
    const heap: MaxHeap<number> = new MaxHeap<number>();

    let minValue: number | undefined;

    minValue = 1;

    heap.insert(1);
    expect(heap.findMinimum()).toEqual(minValue);

    minValue = 3;

    heap.insert(3);
    expect(heap.findMinimum()).toEqual(minValue);

    minValue = 5;

    heap.insert(5);
    expect(heap.findMinimum()).toEqual(minValue);

    minValue = 7;

    heap.insert(7);
    expect(heap.findMinimum()).toEqual(minValue);

    minValue = 9;

    heap.insert(9);
    expect(heap.findMinimum()).toEqual(minValue);

    heap.insert(0);
    expect(heap.findMinimum()).toEqual(minValue);

    heap.insert(2);
    expect(heap.findMinimum()).toEqual(minValue);

    heap.insert(4);
    expect(heap.findMinimum()).toEqual(minValue);

    heap.insert(6);
    expect(heap.findMinimum()).toEqual(minValue);

    heap.insert(8);
    expect(heap.findMinimum()).toEqual(minValue);

    expect(heap.isEmpty()).toBeFalsy();
  });

  it('extracts the min value from the MinHeap', () => {
    const heap: MinHeap<number> = new MinHeap<number>();

    for (let i: number = 1; i <= 9; i++) {
      heap.insert(i);
    }

    const array: number[][] = [
      [2, 4, 3, 8, 5, 6, 7, 9],
      [3, 4, 6, 8, 5, 9, 7],
      [4, 5, 6, 8, 7, 9],
      [5, 7, 6, 8, 9],
      [6, 7, 9, 8],
      [7, 8, 9],
      [8, 9],
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

    const array: number[][] = [
      [8, 7, 6, 4, 3, 2, 5, 1],
      [7, 4, 6, 1, 3, 2, 5],
      [6, 4, 5, 1, 3, 2],
      [5, 4, 2, 1, 3],
      [4, 3, 2, 1],
      [3, 1, 2],
      [2, 1],
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

    for (let i: number = 10; i >= 1; i--) {
      array.push(i);
    }

    expect(heap.heapify(array)).toEqual(array);
  });

  it('performs heapify in the MaxHeap', () => {
    const heap: MaxHeap<number> = new MaxHeap<number>();

    const array: number[] = [];

    for (let i: number = 1; i <= 10; i++) {
      array.push(i);
    }

    expect(heap.heapify(array)).toEqual(array);
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

  //   it('Heap Sort', () => {
  //     const array = [3, 2, 5, 6, 1, 7, 8, 9];

  //     expect(heapSort(array)).toEqual([1, 2, 3, 5, 6, 7, 8, 9]);
  //   });
});
