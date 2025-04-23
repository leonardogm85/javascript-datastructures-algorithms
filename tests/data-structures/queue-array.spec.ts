import { QueueArray } from '../../src/data-structures/queue-array';
import { MyObject } from '../../src/models/my-object-model';

describe('QueueArray', () => {
  it('starts empty', () => {
    const queue: QueueArray<number> = new QueueArray<number>();

    expect(queue.size()).toEqual(0);

    expect(queue.isEmpty()).toBeTruthy();
  });

  it('enqueues elements', () => {
    const queue: QueueArray<number> = new QueueArray<number>();

    queue.enqueue(1);
    expect(queue.size()).toEqual(1);

    queue.enqueue(2);
    expect(queue.size()).toEqual(2);

    queue.enqueue(3);
    expect(queue.size()).toEqual(3);

    expect(queue.isEmpty()).toBeFalsy();
  });

  it('dequeue elements', () => {
    const queue: QueueArray<number> = new QueueArray<number>();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toEqual(1);
    expect(queue.dequeue()).toEqual(2);
    expect(queue.dequeue()).toEqual(3);
    expect(queue.dequeue()).toBeUndefined()
  });

  it('implements FIFO logic', () => {
    const queue: QueueArray<number> = new QueueArray<number>();

    queue.enqueue(1);
    expect(queue.peek()).toEqual(1);

    queue.enqueue(2);
    expect(queue.peek()).toEqual(1);

    queue.enqueue(3);
    expect(queue.peek()).toEqual(1);

    expect(queue.dequeue()).toEqual(1);
    expect(queue.dequeue()).toEqual(2);
    expect(queue.dequeue()).toEqual(3);
    expect(queue.dequeue()).toBeUndefined()
  });

  it('allows to peek at the front element in the queue without dequeuing it', () => {
    const queue: QueueArray<number> = new QueueArray<number>();

    expect(queue.peek()).toBeUndefined()

    queue.enqueue(1);
    expect(queue.peek()).toEqual(1);

    queue.enqueue(2);
    expect(queue.peek()).toEqual(1);

    queue.dequeue();
    expect(queue.peek()).toEqual(2);
  });

  it('returns the correct size', () => {
    const queue: QueueArray<number> = new QueueArray<number>();

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
    const queue: QueueArray<number> = new QueueArray<number>();

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
    const queue: QueueArray<number> = new QueueArray<number>();

    queue.clear();
    expect(queue.isEmpty()).toBeTruthy();

    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.isEmpty()).toBeFalsy();

    queue.clear();
    expect(queue.isEmpty()).toBeTruthy();
  });

  it('returns toString primitive types', () => {
    const queueNumber: QueueArray<number> = new QueueArray<number>();

    expect(queueNumber.toString()).toEqual('');

    queueNumber.enqueue(1);
    expect(queueNumber.toString()).toEqual('1');

    queueNumber.enqueue(2);
    expect(queueNumber.toString()).toEqual('1,2');

    queueNumber.clear();
    expect(queueNumber.toString()).toEqual('');

    const queueString: QueueArray<string> = new QueueArray<string>();

    queueString.enqueue('e1');
    expect(queueString.toString()).toEqual('e1');

    queueString.enqueue('e2');
    expect(queueString.toString()).toEqual('e1,e2');
  });

  it('returns toString objects', () => {
    const queueMyObject: QueueArray<MyObject> = new QueueArray<MyObject>();

    expect(queueMyObject.toString()).toEqual('');

    queueMyObject.enqueue(new MyObject(1, 2));
    expect(queueMyObject.toString()).toEqual('1|2');

    queueMyObject.enqueue(new MyObject(3, 4));
    expect(queueMyObject.toString()).toEqual('1|2,3|4');
  });
});
