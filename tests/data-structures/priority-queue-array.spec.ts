import { PriorityQueueArray } from '../../src/data-structures/priority-queue-array';
import { MyObject } from '../../src/models/my-object-model';

describe('QueueArray', () => {
  it('starts empty', () => {
    const queue: PriorityQueueArray<number> = new PriorityQueueArray<number>();
    expect(queue.size()).toEqual(0);
    expect(queue.isEmpty()).toBeTruthy();
  });

  it('enqueues elements', () => {
    const queue: PriorityQueueArray<number> = new PriorityQueueArray<number>();

    queue.enqueue(1);
    expect(queue.size()).toEqual(1);

    queue.enqueue(2);
    expect(queue.size()).toEqual(2);

    queue.enqueue(3);
    expect(queue.size()).toEqual(3);

    expect(queue.isEmpty()).toBeFalsy();
  });

  it('queues elements in priority order', () => {
    const queue: PriorityQueueArray<number> = new PriorityQueueArray<number>();

    queue.enqueue(1);
    expect(queue.toString()).toEqual('1');

    queue.enqueue(3);
    expect(queue.toString()).toEqual('1,3');

    queue.enqueue(5);
    expect(queue.toString()).toEqual('1,3,5');

    queue.enqueue(7);
    expect(queue.toString()).toEqual('1,3,5,7');

    queue.enqueue(9);
    expect(queue.toString()).toEqual('1,3,5,7,9');

    queue.enqueue(2);
    expect(queue.toString()).toEqual('1,2,3,5,7,9');

    queue.enqueue(4);
    expect(queue.toString()).toEqual('1,2,3,4,5,7,9');

    queue.enqueue(6);
    expect(queue.toString()).toEqual('1,2,3,4,5,6,7,9');

    queue.enqueue(8);
    expect(queue.toString()).toEqual('1,2,3,4,5,6,7,8,9');

    expect(queue.size()).toEqual(9);

    const size: number = queue.size();

    for (let i: number = 0; i < size; i++) {
      expect(queue.dequeue()).toEqual(i + 1);
    }

    expect(queue.isEmpty()).toBeTruthy();
  });

  it('dequeue elements', () => {
    const queue: PriorityQueueArray<number> = new PriorityQueueArray<number>();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toEqual(1);
    expect(queue.dequeue()).toEqual(2);
    expect(queue.dequeue()).toEqual(3);
    expect(queue.dequeue()).toBeUndefined();
  });

  it('implements FIFO logic', () => {
    const queue: PriorityQueueArray<number> = new PriorityQueueArray<number>();

    queue.enqueue(1);
    expect(queue.peek()).toEqual(1);

    queue.enqueue(2);
    expect(queue.peek()).toEqual(1);

    queue.enqueue(3);
    expect(queue.peek()).toEqual(1);

    expect(queue.dequeue()).toEqual(1);
    expect(queue.dequeue()).toEqual(2);
    expect(queue.dequeue()).toEqual(3);
    expect(queue.dequeue()).toBeUndefined();
  });

  it('allows to peek at the front element in the queue without dequeuing it', () => {
    const queue: PriorityQueueArray<number> = new PriorityQueueArray<number>();

    expect(queue.peek()).toBeUndefined();

    queue.enqueue(1);
    expect(queue.peek()).toEqual(1);

    queue.enqueue(2);
    expect(queue.peek()).toEqual(1);

    queue.dequeue();
    expect(queue.peek()).toEqual(2);
  });

  it('returns the correct size', () => {
    const queue: PriorityQueueArray<number> = new PriorityQueueArray<number>();

    expect(queue.size()).toEqual(0);

    queue.enqueue(1);
    expect(queue.size()).toEqual(1);

    queue.enqueue(2);
    expect(queue.size()).toEqual(2);

    queue.enqueue(3);
    expect(queue.size()).toEqual(3);

    queue.clear();
    expect(queue.isEmpty()).toBeTruthy();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.size()).toEqual(3);

    queue.dequeue();
    expect(queue.size()).toEqual(2);

    queue.dequeue();
    expect(queue.size()).toEqual(1);

    queue.dequeue();
    expect(queue.size()).toEqual(0);

    queue.dequeue();
    expect(queue.size()).toEqual(0);
  });

  it('returns if it is empty', () => {
    const queue: PriorityQueueArray<number> = new PriorityQueueArray<number>();

    expect(queue.isEmpty()).toBeTruthy();

    queue.enqueue(1);
    expect(queue.isEmpty()).toBeFalsy();

    queue.enqueue(2);
    expect(queue.isEmpty()).toBeFalsy();

    queue.enqueue(3);
    expect(queue.isEmpty()).toBeFalsy();

    queue.clear();
    expect(queue.isEmpty()).toBeTruthy();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.isEmpty()).toBeFalsy();

    queue.dequeue();
    expect(queue.isEmpty()).toBeFalsy();

    queue.dequeue();
    expect(queue.isEmpty()).toBeFalsy();

    queue.dequeue();
    expect(queue.isEmpty()).toBeTruthy();

    queue.dequeue();
    expect(queue.isEmpty()).toBeTruthy();
  });

  it('clears the queue', () => {
    const queue: PriorityQueueArray<number> = new PriorityQueueArray<number>();

    queue.clear();
    expect(queue.isEmpty()).toBeTruthy();

    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.isEmpty()).toBeFalsy();

    queue.clear();
    expect(queue.isEmpty()).toBeTruthy();
  });

  it('returns toString primitive types', () => {
    const queueNumber: PriorityQueueArray<number> = new PriorityQueueArray<number>();

    expect(queueNumber.toString()).toEqual('');

    queueNumber.enqueue(1);
    expect(queueNumber.toString()).toEqual('1');

    queueNumber.enqueue(2);
    expect(queueNumber.toString()).toEqual('1,2');

    queueNumber.clear();
    expect(queueNumber.toString()).toEqual('');

    const queueString: PriorityQueueArray<string> = new PriorityQueueArray<string>();

    queueString.enqueue('e1');
    expect(queueString.toString()).toEqual('e1');

    queueString.enqueue('e2');
    expect(queueString.toString()).toEqual('e1,e2');
  });

  it('returns toString objects', () => {
    const queueMyObject: PriorityQueueArray<MyObject> = new PriorityQueueArray<MyObject>();

    expect(queueMyObject.toString()).toEqual('');

    queueMyObject.enqueue(new MyObject(1, 2));
    expect(queueMyObject.toString()).toEqual('1|2');

    queueMyObject.enqueue(new MyObject(3, 4));
    expect(queueMyObject.toString()).toEqual('1|2,3|4');
  });
});
