import { DoublyLinkedList } from './doubly-linked-list';

export class DequeLinkedList<T> {

  private items: DoublyLinkedList<T> = new DoublyLinkedList<T>();

  addFront(element: T): void {
    this.items.insertAt(element, 0);
  }

  addBack(element: T): void {
    this.items.push(element);
  }

  removeFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items.removeAt(0);
  }

  removeBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items.removeAt(this.size() - 1);
  }

  peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items.getElementAt(0);
  }

  peekBack(): T | undefined {
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
