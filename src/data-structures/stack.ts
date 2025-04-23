export class Stack<T> {

  private count: number = 0;
  private items: { [key: number]: T } = {};

  push(element: T): void {
    this.items[this.count++] = element;
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const result: T = this.items[--this.count];

    delete this.items[this.count];

    return result;
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.count - 1];
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this.count;
  }

  clear(): void {
    this.items = {};
    this.count = 0;
  }

  toString(): string {
    if (this.isEmpty()) {
      return '';
    }

    let objString: string = `${this.items[0]}`;

    for (let i: number = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }

    return objString;
  }

}
