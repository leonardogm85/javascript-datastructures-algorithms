import { Compare, CompareFunction, defaultCompare, isNullOrUndefined, reverseCompare, swap } from '../util';

export class MinHeap<T> {

  private heap: T[] = [];

  constructor(private compareFn: CompareFunction<T> = defaultCompare) { }

  private getLeftIndex(index: number): number {
    return 2 * index + 1;
  }

  private getRightIndex(index: number): number {
    return 2 * index + 2;
  }

  private getParentIndex(index: number): number | undefined {
    if (index === 0) {
      return undefined;
    }

    return Math.floor((index - 1) / 2);
  }

  private siftDown(index: number): void {
    let element: number = index;

    const left: number = this.getLeftIndex(index);
    const right: number = this.getRightIndex(index);

    const size: number = this.size();

    if (left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN) {
      element = left;
    }

    if (right < size && this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN) {
      element = right;
    }

    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }

  private siftUp(index: number): void {
    let parent: number | undefined = this.getParentIndex(index);

    while (!isNullOrUndefined(parent) && index > 0 && this.compareFn(this.heap[parent!], this.heap[index]) === Compare.BIGGER_THAN) {
      swap(this.heap, parent!, index);
      index = parent!;
      parent = this.getParentIndex(index);
    }
  }

  findMinimum(): T | undefined {
    return this.heap.at(0);
  }

  insert(value: T): boolean {
    if (isNullOrUndefined(value)) {
      return false;
    }

    const index: number = this.heap.length;

    this.heap.push(value);

    this.siftUp(index);

    return true;
  }

  extract(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    if (this.size() === 1) {
      return this.heap.shift();
    }

    const removedValue: T = this.heap[0];

    this.heap[0] = this.heap.pop()!;

    this.siftDown(0);

    return removedValue;
  }

  heapify(array: T[]): T[] {
    if (array) {
      this.heap = [...array];
    }

    const maxIndex: number = Math.floor(this.size() / 2) - 1;

    for (let i: number = maxIndex; i >= 0; i--) {
      this.siftDown(i);
    }

    return this.toArray();
  }

  toArray(): T[] {
    return [...this.heap];
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this.heap.length;
  }

  clear(): void {
    this.heap = [];
  }

  toString(): string {
    return this.heap.sort(this.compareFn).toString();
  }

}

export class MaxHeap<T> extends MinHeap<T> {

  constructor(compareFn: CompareFunction<T> = defaultCompare) {
    super(reverseCompare(compareFn));
  }

}
