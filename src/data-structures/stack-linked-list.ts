import { DoublyLinkedList } from './doubly-linked-list';

export class StackLinkedList<T> {

  private items: DoublyLinkedList<T> = new DoublyLinkedList<T>();

  push(element: T): void {
    this.items.push(element);
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items.removeAt(this.size() - 1);
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items.getElementAt(this.size() - 1);
  }

  isEmpty(): boolean {
    return this.items.isEmpty();
  }

  size(): number {
    return this.items.size();
  }

  clear(): void {
    this.items.clear();
  }

  toString(): string {
    return this.items.toString();
  }

}
