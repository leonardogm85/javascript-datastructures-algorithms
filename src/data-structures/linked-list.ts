import { defaultEquals, EqualsFunction } from '../util';
import { Node } from '../models/linked-list-model';

export class LinkedList<T> {

  protected count: number = 0;
  protected head?: Node<T> = undefined;

  constructor(protected equalsFn: EqualsFunction<T> = defaultEquals) { }

  getNodeAt(index: number): Node<T> | undefined {
    if (index < 0 || index > this.size()) {
      return undefined;
    }

    let current: Node<T> | undefined = this.head;

    for (let i: number = 0; i < index; i++) {
      current = current!.next;
    }

    return current;
  }

  getElementAt(index: number): T | undefined {
    return this.getNodeAt(index)?.element;
  }

  push(element: T): void {
    const node: Node<T> = new Node(element);

    if (this.isEmpty()) {
      this.head = node;
    } else {
      let current: Node<T> = this.head!;

      while (current.next) {
        current = current.next!;
      }

      current.next = node;
    }

    this.count++;
  }

  insertAt(element: T, index: number): boolean {
    if (index < 0 || index > this.size()) {
      return false;
    }

    const node: Node<T> = new Node(element);

    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      const previous: Node<T> = this.getNodeAt(index - 1)!;

      node.next = previous.next;
      previous.next = node;
    }

    this.count++;

    return true;
  }

  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.size()) {
      return undefined;
    }

    let current: Node<T> | undefined = this.head;

    if (index === 0) {
      this.head = current?.next;
    } else {
      const previous: Node<T> = this.getNodeAt(index - 1)!;

      current = previous.next;
      previous.next = current!.next;
    }

    this.count--;

    return current?.element;
  }

  remove(element: T): T | undefined {
    return this.removeAt(this.indexOf(element));
  }

  indexOf(element: T): number {
    let current: Node<T> | undefined = this.head;

    for (let i: number = 0; i < this.size(); i++) {
      if (this.equalsFn(element, current!.element)) {
        return i;
      }

      current = current!.next!;
    }

    return -1;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this.count;
  }

  getHead(): T | undefined {
    return this.head?.element;
  }

  clear(): void {
    this.head = undefined;
    this.count = 0;
  }

  toString(): string {
    if (this.isEmpty()) {
      return '';
    }

    let objString: string = `${this.head!.element}`;

    let current: Node<T> | undefined = this.head!.next;

    for (let i: number = 1; i < this.size(); i++) {
      objString = `${objString},${current!.element}`;
      current = current!.next;
    }

    return objString;
  }

}
