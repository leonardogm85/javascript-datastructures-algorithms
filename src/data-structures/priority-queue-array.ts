import { Compare, defaultCompare, ICompareFunction } from "../util";
import { QueueArray } from "./queue-array";

export class PriorityQueueArray<T> extends QueueArray<T> {

  constructor(private compareFn: ICompareFunction<T> = defaultCompare) {
    super();
  }

  override enqueue(element: T): void {
    let added: boolean = false;

    for (let i: number = 0; i < this.items.length; i++) {
      if (!(this.compareFn(element, this.items[i]) === Compare.LESS_THAN)) {
        continue;
      }

      this.items.splice(i, 0, element);
      added = true;
      break;
    }

    if (!added) {
      this.items.push(element);
    }
  }

}
