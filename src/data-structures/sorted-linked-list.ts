import { Node } from '../models/linked-list-model';
import { Compare, CompareFunction, defaultCompare, defaultEquals, EqualsFunction } from '../util';
import { LinkedList } from './linked-list';

export class SortedLinkedList<T> extends LinkedList<T> {

  constructor(
    equalsFn: EqualsFunction<T> = defaultEquals,
    protected compareFn: CompareFunction<T> = defaultCompare
  ) {
    super(equalsFn);
  }

  private getIndexNextSortedElement(element: T): number {
    let current: Node<T> | undefined = this.head;

    let compare: number = 0;

    for (let i: number = 0; i < this.size(); i++) {
      compare = this.compareFn(element, current!.element);

      if (compare === Compare.LESS_THAN) {
        return i;
      }

      current = current!.next;
    }

    return this.size();
  }

  override push(element: T): void {
    if (this.isEmpty()) {
      super.push(element);
    } else {
      super.insertAt(element, this.getIndexNextSortedElement(element));
    }
  }

  override insertAt(element: T, index: number = 0): boolean {
    if (this.isEmpty()) {
      return super.insertAt(element, 0);
    }

    return super.insertAt(element, this.getIndexNextSortedElement(element));
  }

}
