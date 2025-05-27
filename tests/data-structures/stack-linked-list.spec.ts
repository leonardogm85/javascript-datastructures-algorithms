import { StackLinkedList } from '../../src/data-structures/stack-linked-list';
import { MyObject } from '../../src/models/my-object-model';

describe('StackLinkedList', () => {
  it('starts empty', () => {
    const stack: StackLinkedList<number> = new StackLinkedList<number>();
    expect(stack.size()).toEqual(0);
    expect(stack.isEmpty()).toBeTruthy();
  });

  it('pushes elements', () => {
    const stack: StackLinkedList<number> = new StackLinkedList<number>();

    stack.push(1);
    expect(stack.size()).toEqual(1);

    stack.push(2);
    expect(stack.size()).toEqual(2);

    stack.push(3);
    expect(stack.size()).toEqual(3);

    expect(stack.isEmpty()).toBeFalsy();
  });

  it('pops elements', () => {
    const stack: StackLinkedList<number> = new StackLinkedList<number>();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toEqual(3);
    expect(stack.pop()).toEqual(2);
    expect(stack.pop()).toEqual(1);
    expect(stack.pop()).toBeUndefined()
  });

  it('implements LIFO logic', () => {
    const stack: StackLinkedList<number> = new StackLinkedList<number>();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toEqual(3);
    expect(stack.pop()).toEqual(2);
    expect(stack.pop()).toEqual(1);
    expect(stack.pop()).toBeUndefined()
  });

  it('allows to peek at the top element in he stack without popping it', () => {
    const stack: StackLinkedList<number> = new StackLinkedList<number>();

    expect(stack.peek()).toBeUndefined()

    stack.push(1);
    expect(stack.peek()).toEqual(1);

    stack.push(2);
    expect(stack.peek()).toEqual(2);

    stack.pop();
    expect(stack.peek()).toEqual(1);
  });

  it('returns the correct size', () => {
    const stack: StackLinkedList<number> = new StackLinkedList<number>();

    expect(stack.size()).toEqual(0);

    stack.push(1);
    expect(stack.size()).toEqual(1);

    stack.push(2);
    expect(stack.size()).toEqual(2);

    stack.push(3);
    expect(stack.size()).toEqual(3);

    stack.clear();
    expect(stack.isEmpty()).toBeTruthy();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    stack.pop();
    expect(stack.size()).toEqual(2);

    stack.pop();
    expect(stack.size()).toEqual(1);

    stack.pop();
    expect(stack.size()).toEqual(0);

    stack.pop();
    expect(stack.size()).toEqual(0);
  });

  it('returns if it is empty', () => {
    const stack: StackLinkedList<number> = new StackLinkedList<number>();

    expect(stack.isEmpty()).toBeTruthy();

    stack.push(1);
    expect(stack.isEmpty()).toBeFalsy();

    stack.push(2);
    expect(stack.isEmpty()).toBeFalsy();

    stack.push(3);
    expect(stack.isEmpty()).toBeFalsy();

    stack.clear();
    expect(stack.isEmpty()).toBeTruthy();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    stack.pop();
    expect(stack.isEmpty()).toBeFalsy();

    stack.pop();
    expect(stack.isEmpty()).toBeFalsy();

    stack.pop();
    expect(stack.isEmpty()).toBeTruthy();

    stack.pop();
    expect(stack.isEmpty()).toBeTruthy();
  });

  it('clears the stack', () => {
    const stack: StackLinkedList<number> = new StackLinkedList<number>();

    stack.clear();
    expect(stack.isEmpty()).toBeTruthy();

    stack.push(1);
    stack.push(2);

    stack.clear();
    expect(stack.isEmpty()).toBeTruthy();
  });

  it('returns toString primitive types', () => {
    const stackNumber: StackLinkedList<number> = new StackLinkedList<number>();

    expect(stackNumber.toString()).toEqual('');

    stackNumber.push(1);
    expect(stackNumber.toString()).toEqual('1');

    stackNumber.push(2);
    expect(stackNumber.toString()).toEqual('1,2');

    stackNumber.clear();
    expect(stackNumber.toString()).toEqual('');

    const stackString: StackLinkedList<string> = new StackLinkedList<string>();

    stackString.push('e1');
    expect(stackString.toString()).toEqual('e1');

    stackString.push('e2');
    expect(stackString.toString()).toEqual('e1,e2');
  });

  it('returns toString objects', () => {
    const stackMyObject: StackLinkedList<MyObject> = new StackLinkedList<MyObject>();

    expect(stackMyObject.toString()).toEqual('');

    stackMyObject.push(new MyObject(1, 2));
    expect(stackMyObject.toString()).toEqual('1|2');

    stackMyObject.push(new MyObject(3, 4));
    expect(stackMyObject.toString()).toEqual('1|2,3|4');
  });
});
