import { defaultEquals, IEqualsFunction } from '../util';
import { Node } from '../models/linked-list-model';

export class LinkedList<T> {

  protected count: number = 0;
  protected head?: Node<T> = undefined;
  protected tail?: Node<T> = undefined;

  constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) { }

  protected getNodeAt(index: number): Node<T> | undefined {
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

  getElementAt(index: number): T | undefined {
    return this.getNodeAt(index)?.element;
  }

  push(element: T): void {
    const node: Node<T> = new Node(element);

    if (this.isEmpty()) {
      this.head = node;
    } else {
      this.tail!.next = node;
    }

    this.tail = node;
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

  removeAt(index: number): T | undefined {
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

  remove(element: T): T | undefined {
    return this.removeAt(this.indexOf(element));
  }

  indexOf(element: T): number {
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

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this.count;
  }

  getHead(): T | undefined {
    return this.head?.element;
  }

  getTail(): T | undefined {
    return this.tail?.element;
  }

  clear(): void {
    this.head = undefined;
    this.tail = undefined;
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
