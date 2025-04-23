import { defaultEquals, IEqualsFunction } from '../util';
import { DoublyNode } from '../models/linked-list-model';
import { LinkedList } from './linked-list';

export class DoublyLinkedList<T> extends LinkedList<T> {

  protected override head?: DoublyNode<T> = undefined;
  protected tail?: DoublyNode<T> = undefined;

  constructor(equalsFn: IEqualsFunction<T> = defaultEquals) {
    super(equalsFn);
  }

  protected override getNodeAt(index: number): DoublyNode<T> | undefined {
    if (index < 0 || index > this.size()) {
      return undefined;
    }

    if (index === 0) {
      return this.head!;
    }

    if (index === this.size() - 1) {
      return this.tail!;
    }

    if (this.size() / 2 > index) {
      let current: DoublyNode<T> | undefined = this.head?.next;

      for (let i: number = 1; i < index; i++) {
        current = current!.next;
      }

      return current;
    }

    let current: DoublyNode<T> | undefined = this.tail?.prev;

    for (let i: number = this.size() - 2; i > index; i--) {
      current = current!.prev;
    }

    return current;
  }

  override push(element: T): void {
    const node: DoublyNode<T> = new DoublyNode(element);

    if (this.isEmpty()) {
      this.head = node;
    } else {
      this.tail!.next = node;
      node.prev = this.tail;
    }

    this.tail = node;
    this.count++;
  }

  override insertAt(element: T, index: number): boolean {
    if (index < 0 || index > this.size()) {
      return false;
    }

    const node: DoublyNode<T> = new DoublyNode(element);

    if (index === 0) {
      if (this.isEmpty()) {
        this.tail = node;
      } else {
        node.next = this.head;
        this.head!.prev = node;
      }
      this.head = node;
    } else if (index === this.size()) {
      this.tail!.next = node;
      node.prev = this.tail;
      this.tail = node;
    } else {
      const previous: DoublyNode<T> = this.getNodeAt(index - 1)!;
      const current: DoublyNode<T> = previous.next!;
      node.next = current;
      previous.next = node;
      current.prev = node;
      node.prev = previous;
    }

    this.count++;

    return true;
  }

  override removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.size()) {
      return undefined;
    }

    let current: DoublyNode<T> | undefined = this.head;

    if (index === 0) {
      this.head = current?.next;
      if (this.size() === 1) {
        this.tail = undefined;
      } else {
        this.head!.prev = undefined;
      }
    } else if (index === this.size() - 1) {
      current = this.tail;
      this.tail = current!.prev;
      this.tail!.next = undefined;
    } else {
      current = this.getNodeAt(index)!;
      const previous: DoublyNode<T> = current.prev!;
      previous.next = current.next;
      current.next!.prev = previous;
    }

    this.count--;

    return current?.element;
  }

  override clear(): void {
    super.clear();
    this.tail = undefined;
  }

  getTail(): T | undefined {
    return this.tail?.element;
  }

  toStringInverse(): string {
    if (this.isEmpty()) {
      return '';
    }

    let objString: string = `${this.tail!.element}`;

    let previous: DoublyNode<T> | undefined = this.tail!.prev;

    for (let i: number = this.size() - 1; i > 0; i--) {
      objString = `${objString},${previous!.element}`;
      previous = previous!.prev;
    }

    return objString;
  }

}
