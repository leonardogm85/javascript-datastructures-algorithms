import { DoublyLinkedList } from '../../src/data-structures/doubly-linked-list';
import { defaultEquals } from '../../src/util';
import { DoublyNode } from '../../src/models/linked-list-model';
import { MyObject } from '../../src/models/my-object-model';

describe('DoublyLinkedList', () => {
  function pushesElements(list: DoublyLinkedList<number>, min: number, max: number): void {
    for (let i: number = min; i <= max; i++) {
      list.push(i);
    }
  }

  function verifyList(list: DoublyLinkedList<number>, min: number, max: number): void {
    let current: DoublyNode<number> | undefined;

    current = list['getNodeAt'](0) as DoublyNode<number> | undefined;

    for (let i: number = min; i <= max; i++) {
      verifyNode(current!, i, min, max);
      current = current!.next;
    }

    current = list['getNodeAt'](list.size() - 1) as DoublyNode<number> | undefined;

    for (let i: number = max; i >= min; i--) {
      verifyNode(current!, i, min, max);
      current = current!.prev;
    }
  }

  function verifyNode(current: DoublyNode<number>, i: number, min: number, max: number): void {
    expect(current).toBeDefined();
    expect(current.element).toEqual(i);

    if (i < max) {
      expect(current.next).toBeDefined();
      expect(current.next!.element).toEqual(i + 1);
    } else {
      expect(current.next).toBeUndefined();
    }

    if (i > min) {
      expect(current.prev).toBeDefined();
      expect(current.prev!.element).toEqual(i - 1);
    } else {
      expect(current.prev).toBeUndefined();
    }
  }

  it('starts empty', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    expect(list.size()).toEqual(0);
    expect(list.isEmpty()).toBeTruthy();
    expect(list.getHead()).toBeUndefined();
    expect(list.getTail()).toBeUndefined();
  });

  it('pushes elements', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 3;
    pushesElements(list, min, max);
    verifyList(list, min, max);
  });

  it('returns element at specific index: invalid position', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    expect(list.getElementAt(3)).toBeUndefined();
  });

  it('returns element at specific index: valid position', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 3;

    pushesElements(list, min, max);

    let element: number | undefined;

    for (let i: number = min; i <= max; i++) {
      element = list.getElementAt(i - 1);
      expect(element).toEqual(i);
    }

    verifyList(list, min, max);
  });

  it('inserts elements first position empty list', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 1;
    expect(list.insertAt(1, 0)).toBeTruthy();
    verifyList(list, min, max);
  });

  it('inserts elements first position not empty list', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 2;
    expect(list.insertAt(max, 0)).toBeTruthy();
    expect(list.insertAt(min, 0)).toBeTruthy();
    verifyList(list, min, max);
  });

  it('inserts elements invalid position empty list', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    expect(list.insertAt(1, 1)).toBeFalsy();
  });

  it('inserts elements invalid position not empty list', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 1;
    expect(list.insertAt(1, 0)).toBeTruthy();
    expect(list.insertAt(1, 2)).toBeFalsy();
    verifyList(list, min, max);
  });

  it('inserts elements in the middle of list', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 3;
    expect(list.insertAt(3, 0)).toBeTruthy();
    expect(list.insertAt(1, 0)).toBeTruthy();
    expect(list.insertAt(2, 1)).toBeTruthy();
    verifyList(list, min, max);
  });

  it('inserts elements at the end of list', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 5;

    for (let i: number = min; i <= max; i++) {
      expect(list.insertAt(i, i - 1)).toBeTruthy();
    }

    verifyList(list, min, max);
  });

  it('returns index of elements', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 3;

    pushesElements(list, min, max);

    for (let i: number = min; i <= max; i++) {
      expect(list.indexOf(i)).toEqual(i - 1);
    }

    expect(list.indexOf(max + 2)).toEqual(-1);

    verifyList(list, min, max);
  });

  it('removes valid elements', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 3;

    pushesElements(list, min, max);

    let element: number | undefined;

    for (let i: number = min; i <= max; i++) {
      element = list.remove(i);
      expect(element).toEqual(i);
    }
  });

  it('removes invalid elements', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 3;

    pushesElements(list, min, max);

    let element: number | undefined;

    for (let i: number = max + 2; i <= max + 4; i++) {
      element = list.remove(i);
      expect(element).toBeUndefined();
    }

    verifyList(list, min, max);
  });

  it('removes element invalid position empty list', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 3;

    let element: number | undefined;

    for (let i: number = min; i <= max; i++) {
      element = list.removeAt(i - 1);
      expect(element).toBeUndefined();
    }
  });

  it('removes element invalid position not empty list', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 3;

    pushesElements(list, min, max);

    let element: number | undefined;

    for (let i: number = max + 2; i <= max + 4; i++) {
      element = list.removeAt(i);
      expect(element).toBeUndefined();
    }

    verifyList(list, min, max);
  });

  it('removes first element list single element', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const element: number = 1;

    list.push(element);

    const removed: number = list.removeAt(0)!;
    expect(removed).toEqual(element);

    expect(list.size()).toEqual(0);
    expect(list.isEmpty()).toBeTruthy();
    expect(list.getHead()).toBeUndefined();
    expect(list.getTail()).toBeUndefined();
  });

  it('removes first element list multiple elements', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    let min: number = 1;
    let max: number = 3;

    pushesElements(list, min, max);

    const removed: number = list.removeAt(0)!;
    expect(removed).toEqual(min);

    min = 2;

    verifyList(list, min, max);
  });

  it('removes element from middle of list', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 3;

    pushesElements(list, min, max);

    let current: number | undefined;

    current = list.removeAt(1);
    expect(current).toEqual(2);

    let node: DoublyNode<number> | undefined = list['getNodeAt'](0) as DoublyNode<number> | undefined;

    expect(node).toBeDefined();

    expect(node!.element).toEqual(1);

    expect(node!.prev).toBeUndefined();
    expect(node!.next).toBeDefined();

    expect(node!.next!.element).toEqual(3);

    node = node!.next;

    expect(node).toBeDefined();

    expect(node!.element).toEqual(3);

    expect(node!.prev).toBeDefined();
    expect(node!.next).toBeUndefined();

    expect(node!.prev!.element).toEqual(1);
  });

  it('removes element from end of list', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    let min: number = 1;
    let max: number = 3;

    let element: number | undefined;

    pushesElements(list, min, max);

    let currentMax: number = max;

    for (let i: number = max; i >= min; i--) {
      element = list.removeAt(i - 1);
      expect(element).toEqual(i);
      currentMax--;
      verifyList(list, min, currentMax);
    }

    verifyList(list, min, currentMax);
  });

  it('returns the head of the list', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    expect(list.getHead()).toBeUndefined();

    let head: number | undefined = 1;

    list.push(1);
    expect(list.getHead()).toEqual(head);

    list.push(2);
    expect(list.getHead()).toEqual(head);

    list.push(3);
    expect(list.getHead()).toEqual(head);

    head = 0;

    list.insertAt(0, 0);
    expect(list.getHead()).toEqual(head);

    list.insertAt(4, 4);
    expect(list.getHead()).toEqual(head);

    list.removeAt(4);
    expect(list.getHead()).toEqual(head);

    head = 1;

    list.removeAt(0);
    expect(list.getHead()).toEqual(head);

    list.removeAt(1);
    expect(list.getHead()).toEqual(head);

    head = 3;

    list.removeAt(0);
    expect(list.getHead()).toEqual(head);

    list.removeAt(0);
    expect(list.getHead()).toBeUndefined();
    expect(list.size()).toEqual(0);
    expect(list.isEmpty()).toBeTruthy();
  });

  it('returns the tail of the list', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    expect(list.getTail()).toBeUndefined();

    let tail: number | undefined = 1;

    list.push(1);
    expect(list.getTail()).toEqual(tail);

    tail = 2;

    list.push(2);
    expect(list.getTail()).toEqual(tail);

    tail = 3;

    list.push(3);
    expect(list.getTail()).toEqual(tail);

    list.insertAt(0, 0);
    expect(list.getTail()).toEqual(tail);

    tail = 4;

    list.insertAt(4, 4);
    expect(list.getTail()).toEqual(tail);

    tail = 3;

    list.removeAt(4);
    expect(list.getTail()).toEqual(tail);

    list.removeAt(0);
    expect(list.getTail()).toEqual(tail);

    list.removeAt(1);
    expect(list.getTail()).toEqual(tail);

    list.removeAt(0);
    expect(list.getTail()).toEqual(tail);

    list.removeAt(0);
    expect(list.getTail()).toBeUndefined();
    expect(list.size()).toEqual(0);
    expect(list.isEmpty()).toBeTruthy();
  });

  it('returns the correct size', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 3;

    expect(list.size()).toEqual(0);

    for (let i: number = min; i <= max; i++) {
      list.push(i);
      expect(list.size()).toEqual(i);
    }

    for (let i: number = min; i <= max; i++) {
      list.remove(i);
      expect(list.size()).toEqual(max - i);
    }

    expect(list.size()).toEqual(0);
  });

  it('returns if it is empty', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 3;

    expect(list.isEmpty()).toBeTruthy();

    for (let i: number = min; i <= max; i++) {
      list.push(i);
      expect(list.isEmpty()).toBeFalsy();
    }

    for (let i: number = min; i < max; i++) {
      list.remove(i);
      expect(list.isEmpty()).toBeFalsy();
    }

    list.remove(max);
    expect(list.isEmpty()).toBeTruthy();

    pushesElements(list, min, max);
    expect(list.isEmpty()).toBeFalsy();

    list.clear();
    expect(list.isEmpty()).toBeTruthy();
  });

  it('clears the list', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);
    const min: number = 1;
    const max: number = 3;

    expect(list.size()).toEqual(0);

    list.clear();
    expect(list.size()).toEqual(0);

    pushesElements(list, min, max);

    expect(list.size()).toBeGreaterThan(0);

    list.clear();
    expect(list.size()).toEqual(0);
  });

  it('returns toString primitive types', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);

    expect(list.toString()).toEqual('');

    list.push(1);
    expect(list.toString()).toEqual('1');

    list.push(2);
    expect(list.toString()).toEqual('1,2');

    list.clear();
    expect(list.toString()).toEqual('');
  });

  it('returns toString primitive types: string', () => {
    const list: DoublyLinkedList<string> = new DoublyLinkedList<string>(defaultEquals);

    list.push('e1');
    expect(list.toString()).toEqual('e1');

    list.push('e2');
    expect(list.toString()).toEqual('e1,e2');
  });

  it('returns toString objects', () => {
    const list: DoublyLinkedList<MyObject> = new DoublyLinkedList<MyObject>(defaultEquals);

    expect(list.toString()).toEqual('');

    list.push(new MyObject(1, 2));
    expect(list.toString()).toEqual('1|2');

    list.push(new MyObject(3, 4));
    expect(list.toString()).toEqual('1|2,3|4');
  });

  it('returns inverseToString primitive types', () => {
    const list: DoublyLinkedList<number> = new DoublyLinkedList<number>(defaultEquals);

    expect(list.toStringInverse()).toEqual('');

    list.push(1);
    expect(list.toStringInverse()).toEqual('1');

    list.push(2);
    expect(list.toStringInverse()).toEqual('2,1');

    list.clear();
    expect(list.toStringInverse()).toEqual('');
  });

  it('returns inverseToString primitive types: string', () => {
    const list: DoublyLinkedList<string> = new DoublyLinkedList<string>(defaultEquals);

    list.push('e1');
    expect(list.toStringInverse()).toEqual('e1');

    list.push('e2');
    expect(list.toStringInverse()).toEqual('e2,e1');
  });

  it('returns inverseToString objects', () => {
    const list: DoublyLinkedList<MyObject> = new DoublyLinkedList<MyObject>(defaultEquals);

    expect(list.toStringInverse()).toEqual('');

    list.push(new MyObject(1, 2));
    expect(list.toStringInverse()).toEqual('1|2');

    list.push(new MyObject(3, 4));
    expect(list.toStringInverse()).toEqual('3|4,1|2');
  });
});
