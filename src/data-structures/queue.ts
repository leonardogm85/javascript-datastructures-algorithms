export class Queue<T> {

  protected count: number = 0;
  protected lowestCount: number = 0;
  protected items: { [key: number]: T } = {};

  enqueue(element: T): void {
    this.items[this.count++] = element;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const result: T = this.items[this.lowestCount];

    delete this.items[this.lowestCount++];

    return result;
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.lowestCount];
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this.count - this.lowestCount;
  }

  clear(): void {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  toString(): string {
    if (this.isEmpty()) {
      return '';
    }

    let objString: string = `${this.items[this.lowestCount]}`;

    for (let i: number = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }

    return objString;
  }

}
