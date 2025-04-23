export class DequeArray<T> {

  private items: T[] = [];

  addFront(element: T): void {
    this.items.unshift(element);
  }

  addBack(element: T): void {
    this.items.push(element);
  }

  removeFront(): T | undefined {
    return this.items.shift();
  }

  removeBack(): T | undefined {
    return this.items.pop();
  }

  peekFront(): T | undefined {
    return this.items.at(0);
  }

  peekBack(): T | undefined {
    return this.items.at(this.size() - 1);
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return this.items;
  }

  toString(): string {
    return this.items.toString();
  }

}
