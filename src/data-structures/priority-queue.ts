import { Compare, defaultCompare, ICompareFunction } from '../util';
import { Queue } from './queue';

export class PriorityQueue<T> extends Queue<T> {

  constructor(private compareFn: ICompareFunction<T> = defaultCompare) {
    super();
  }

  override enqueue(element: T): void {
    let added: boolean = false;

    let current: T | undefined;
    let next: T | undefined;

    for (let i: number = 0; i < this.size(); i++) {
      if (added) {

        current = next;
        next = this.items[i + 1];

        this.items[i + 1] = current!;

      } else if (this.compareFn(element, this.items[i]) === Compare.LESS_THAN) {

        current = this.items[i];
        next = this.items[i + 1];

        this.items[i] = element;
        this.items[i + 1] = current;

        added = true;

      }
    }

    if (!added) {
      this.items[this.count] = element;
    }

    this.count++;
  }

}
