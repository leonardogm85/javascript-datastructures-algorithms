import { Compare, defaultCompare, ICompareFunction } from "../util";
import { Queue } from "./queue";

export class PriorityQueue<T> extends Queue<T> {

  constructor(private compareFn: ICompareFunction<T> = defaultCompare) {
    super();
  }

  override enqueue(element: T): void {
    let added: boolean = false;

    const newItems: { [key: number]: T } = {};

    for (let i: number = 0; i < this.size(); i++) {
      if (added) {
        newItems[i + 1] = this.items[i];
      } else if (!(this.compareFn(element, this.items[i]) === Compare.LESS_THAN)) {
        newItems[i] = this.items[i];
      } else {
        newItems[i] = element;
        added = true;
        newItems[i + 1] = this.items[i];
      }
    }

    if (!added) {
      newItems[this.count] = element;
    }

    this.items = newItems;
    this.count++;
  }

}
