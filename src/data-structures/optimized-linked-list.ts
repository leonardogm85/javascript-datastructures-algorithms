import { Node } from '../models/linked-list-model';
import { defaultEquals, EqualsFunction } from '../util';
import { LinkedList } from './linked-list';

export class OptimizedLinkedList<T> extends LinkedList<T> {

  protected tail?: Node<T> = undefined;

  constructor(equalsFn: EqualsFunction<T> = defaultEquals) {
    super(equalsFn);
  }

  override getNodeAt(index: number): Node<T> | undefined {
    if (index < 0 || index > this.size()) {
      return undefined;
    }

    if (index === 0) {
      return this.head!;
    }

    if (index === this.size() - 1) {
      return this.tail!;
    }

    let current: Node<T> | undefined = this.head?.next;

    for (let i: number = 1; i < index; i++) {
      current = current!.next;
    }

    return current;
  }

  override push(element: T): void {
    const node: Node<T> = new Node(element);

    if (this.isEmpty()) {
      this.head = node;
    } else {
      this.tail!.next = node;
    }

    this.tail = node;
    this.count++;
  }

  override insertAt(element: T, index: number): boolean {
    if (index < 0 || index > this.size()) {
      return false;
    }

    const node: Node<T> = new Node(element);

    if (index === 0) {
      node.next = this.head;
      this.head = node;

      if (this.isEmpty()) {
        this.tail = node;
      }
    } else if (index === this.size()) {
      this.tail!.next = node;
      this.tail = node;
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
      this.head = current?.next;

      if (this.size() === 1) {
        this.tail = undefined;
      }
    } else if (index === this.size() - 1) {
      const previous: Node<T> = this.getNodeAt(this.size() - 2)!;

      current = this.tail;
      previous.next = undefined;
      this.tail = previous;
    } else {
      const previous: Node<T> = this.getNodeAt(index - 1)!;

      current = previous.next;
      previous.next = current!.next;
    }

    this.count--;

    return current?.element;
  }

  override indexOf(element: T): number {
    if (this.size() > 0 && this.equalsFn(element, this.head!.element)) {
      return 0;
    }

    if (this.size() > 1 && this.equalsFn(element, this.tail!.element)) {
      return this.size() - 1;
    }

    let current: Node<T> | undefined = this.head!.next;

    for (let i: number = 1; i < this.size() - 1; i++) {
      if (this.equalsFn(element, current!.element)) {
        return i;
      }

      current = current!.next!;
    }

    return -1;
  }

  override clear(): void {
    super.clear();
    this.tail = undefined;
  }

  getTail(): T | undefined {
    return this.tail?.element;
  }

}
