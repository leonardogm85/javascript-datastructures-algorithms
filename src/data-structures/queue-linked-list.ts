import { DoublyLinkedList } from './doubly-linked-list';

export class QueueLinkedList<T> {

  protected items: DoublyLinkedList<T> = new DoublyLinkedList<T>();

  enqueue(element: T): void {
    this.items.push(element);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items.removeAt(0);
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items.getElementAt(0);
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
