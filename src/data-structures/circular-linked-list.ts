import { Node } from '../models/linked-list-model';
import { defaultEquals, EqualsFunction } from '../util';
import { LinkedList } from './linked-list';

export class CircularLinkedList<T> extends LinkedList<T> {

  constructor(equalsFn: EqualsFunction<T> = defaultEquals) {
    super(equalsFn);
  }

  override push(element: T): void {
    const node: Node<T> = new Node(element);

    if (this.isEmpty()) {
      this.head = node;
    } else {
      this.getNodeAt(this.size() - 1)!.next = node;
    }

    node.next = this.head;

    this.count++;
  }

  override insertAt(element: T, index: number): boolean {
    if (index < 0 || index > this.size()) {
      return false;
    }

    const node: Node<T> = new Node(element);

    if (index === 0) {
      if (this.isEmpty()) {
        this.head = node;
        node.next = this.head;
      } else {
        const last: Node<T> = this.getNodeAt(this.size() - 1)!;

        node.next = this.head;
        this.head = node;
        last.next = this.head;
      }
    } else {
      const previous: Node<T> = this.getNodeAt(index - 1)!;

      node.next = previous.next;
      previous.next = node;
    }

    this.count++;

    return true;
  }

  override removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.size()) {
      return undefined;
    }

    let current: Node<T> | undefined = this.head;

    if (index === 0) {
      if (this.size() === 1) {
        this.head = undefined;
      } else {
        const tail: Node<T> = this.getNodeAt(this.size() - 1)!;

        const removed: Node<T> = this.head!;

        this.head = this.head!.next;
        tail.next = this.head;
        current = removed;
      }
    } else {
      const previous: Node<T> = this.getNodeAt(index - 1)!;

      current = previous.next;
      previous.next = current!.next;
    }

    this.count--;

    return current?.element;
  }

}
