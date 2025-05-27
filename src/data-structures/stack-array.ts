export class StackArray<T> {

  private items: T[] = [];

  push(element: T): void {
    this.items.push(element);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
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
    return [...this.items];
  }

  toString(): string {
    return this.items.toString();
  }

}
