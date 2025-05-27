export class Deque<T> {

  private count: number = 0;
  private lowestCount: number = 0;
  private items: { [key: number]: T } = {};

  addFront(element: T): void {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.items[--this.lowestCount] = element;
    } else {
      for (let i: number = this.count++; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }

      this.items[0] = element;
    }
  }

  addBack(element: T): void {
    this.items[this.count++] = element;
  }

  removeFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const result: T = this.items[this.lowestCount];

    delete this.items[this.lowestCount++];

    return result;
  }

  removeBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const result: T = this.items[--this.count];

    delete this.items[this.count];

    return result;
  }

  peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.lowestCount];
  }

  peekBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.count - 1];
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
