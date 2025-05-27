import { DequeArray } from '../../src/data-structures/deque-array';
import { MyObject } from '../../src/models/my-object-model';

describe('DequeArray', () => {
  it('starts empty', () => {
    const deque: DequeArray<number> = new DequeArray<number>();
    expect(deque.size()).toEqual(0);
    expect(deque.isEmpty()).toBeTruthy();
  });

  it('add elements in the back', () => {
    const deque: DequeArray<number> = new DequeArray<number>();

    deque.addBack(1);
    expect(deque.size()).toEqual(1);

    deque.addBack(2);
    expect(deque.size()).toEqual(2);

    deque.addBack(3);
    expect(deque.size()).toEqual(3);

    deque.removeBack();
    deque.addBack(4);
    expect(deque.size()).toEqual(3);
  });

  it('add elements in the front', () => {
    const deque: DequeArray<number> = new DequeArray<number>();

    deque.addFront(1);
    expect(deque.size()).toEqual(1);

    deque.addFront(2);
    expect(deque.size()).toEqual(2);

    deque.addFront(3);
    expect(deque.size()).toEqual(3);

    deque.removeFront();
    deque.addFront(4);
    expect(deque.size()).toEqual(3);
  });

  it('remove elements from the back', () => {
    const deque: DequeArray<number> = new DequeArray<number>();

    deque.addBack(1);
    deque.addBack(2);
    deque.addBack(3);
    deque.addFront(0);

    expect(deque.removeBack()).toEqual(3);
    expect(deque.removeBack()).toEqual(2);
    expect(deque.removeBack()).toEqual(1);
    expect(deque.removeBack()).toEqual(0);
    expect(deque.removeBack()).toBeUndefined()
  });

  it('remove elements from the front', () => {
    const deque: DequeArray<number> = new DequeArray<number>();

    deque.addFront(1);
    deque.addBack(2);
    deque.addBack(3);
    deque.addFront(0);
    deque.addFront(-1);
    deque.addFront(-2);

    expect(deque.removeFront()).toEqual(-2);
    expect(deque.removeFront()).toEqual(-1);
    expect(deque.removeFront()).toEqual(0);
    expect(deque.removeFront()).toEqual(1);
    expect(deque.removeFront()).toEqual(2);
    expect(deque.removeFront()).toEqual(3);
    expect(deque.removeFront()).toBeUndefined()
  });

  it('allows to peek at the front element in the deque without removing it', () => {
    const deque: DequeArray<number> = new DequeArray<number>();

    expect(deque.peekFront()).toBeUndefined();

    deque.addFront(1);
    expect(deque.peekFront()).toEqual(1);

    deque.addBack(2);
    expect(deque.peekFront()).toEqual(1);

    deque.addBack(3);
    expect(deque.peekFront()).toEqual(1);

    deque.addFront(0);
    expect(deque.peekFront()).toEqual(0);

    deque.addFront(-1);
    expect(deque.peekFront()).toEqual(-1);

    deque.addFront(-2);
    expect(deque.peekFront()).toEqual(-2);
  });

  it('allows to peek at the last element in the deque without removing it', () => {
    const deque: DequeArray<number> = new DequeArray<number>();

    expect(deque.peekBack()).toBeUndefined();

    deque.addFront(1);
    expect(deque.peekBack()).toEqual(1);
    deque.addBack(2);
    expect(deque.peekBack()).toEqual(2);
    deque.addBack(3);
    expect(deque.peekBack()).toEqual(3);
    deque.addFront(0);
    expect(deque.peekBack()).toEqual(3);
    deque.addFront(-1);
    expect(deque.peekBack()).toEqual(3);
    deque.addFront(-2);
    expect(deque.peekBack()).toEqual(3);
  });

  it('returns the correct size', () => {
    const deque: DequeArray<number> = new DequeArray<number>();

    expect(deque.size()).toEqual(0);

    deque.addFront(1);
    expect(deque.size()).toEqual(1);

    deque.addBack(2);
    expect(deque.size()).toEqual(2);

    deque.addBack(3);
    expect(deque.size()).toEqual(3);

    deque.addFront(0);
    expect(deque.size()).toEqual(4);

    deque.addFront(-1);
    expect(deque.size()).toEqual(5);

    deque.addFront(-2);
    expect(deque.size()).toEqual(6);

    deque.clear();
    expect(deque.size()).toEqual(0);

    deque.addFront(1);
    deque.addBack(2);
    expect(deque.size()).toEqual(2);

    deque.removeFront();
    deque.removeBack();
    expect(deque.size()).toEqual(0);
  });

  it('returns if it is empty', () => {
    const deque: DequeArray<number> = new DequeArray<number>();

    expect(deque.isEmpty()).toBeTruthy();

    deque.addFront(1);
    expect(deque.isEmpty()).toBeFalsy();

    deque.addBack(2);
    expect(deque.isEmpty()).toBeFalsy();

    deque.clear();
    expect(deque.isEmpty()).toBeTruthy();

    deque.addFront(1);
    deque.addBack(2);
    expect(deque.isEmpty()).toBeFalsy();

    deque.removeFront();
    expect(deque.isEmpty()).toBeFalsy();

    deque.removeBack();
    expect(deque.isEmpty()).toBeTruthy();
  });

  it('clears the queue', () => {
    const deque: DequeArray<number> = new DequeArray<number>();

    deque.clear();
    expect(deque.isEmpty()).toBeTruthy();

    deque.addFront(1);
    deque.addBack(2);
    expect(deque.isEmpty()).toBeFalsy();

    deque.clear();
    expect(deque.isEmpty()).toBeTruthy();
  });

  it('returns toString primitive types', () => {
    const dequeNumber: DequeArray<number> = new DequeArray<number>();

    expect(dequeNumber.toString()).toEqual('');

    dequeNumber.addFront(1);
    expect(dequeNumber.toString()).toEqual('1');

    dequeNumber.addBack(2);
    expect(dequeNumber.toString()).toEqual('1,2');

    dequeNumber.clear();
    expect(dequeNumber.toString()).toEqual('');

    const queueString: DequeArray<string> = new DequeArray<string>();

    queueString.addFront('e1');
    expect(queueString.toString()).toEqual('e1');

    queueString.addBack('e2');
    expect(queueString.toString()).toEqual('e1,e2');
  });

  it('returns toString objects', () => {
    const dequeMyObject: DequeArray<MyObject> = new DequeArray<MyObject>();

    expect(dequeMyObject.toString()).toEqual('');

    dequeMyObject.addFront(new MyObject(1, 2));
    expect(dequeMyObject.toString()).toEqual('1|2');

    dequeMyObject.addBack(new MyObject(3, 4));
    expect(dequeMyObject.toString()).toEqual('1|2,3|4');
  });
});
