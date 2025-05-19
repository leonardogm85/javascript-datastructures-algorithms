import { Compare, defaultCompare, CompareFunction } from '../util';
import { QueueLinkedList } from './queue-linked-list';

export class PriorityQueueLinkedList<T> extends QueueLinkedList<T> {

  constructor(private compareFn: CompareFunction<T> = defaultCompare) {
    super();
  }

  override enqueue(element: T): void {
    let added: boolean = false;

    for (let i: number = 0; i < this.items.size(); i++) {
      if (!(this.compareFn(element, this.items.getElementAt(i)!) === Compare.LESS_THAN)) {
        continue;
      }

      this.items.insertAt(element, i);
      added = true;
      break;
    }

    if (!added) {
      this.items.push(element);
    }
  }

}
