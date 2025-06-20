import { HashTableSeparateChaining } from '../../src/data-structures/hash-table-separate-chaining';
import { LinkedList } from '../../src/data-structures/linked-list';
import { ValuePair } from '../../src/models/dictionary-model';
import { Node } from '../../src/models/linked-list-model';
import { MyObject } from '../../src/models/my-object-model';

describe('Data Structures: Hash Table Separate Chaining', () => {
  const A: string = 'Jonathan';
  const B: string = 'Jamie';
  const C: string = 'Sue';

  function addValuesCollision(): HashTableSeparateChaining<string, string> {
    const hashTable: HashTableSeparateChaining<string, string> = new HashTableSeparateChaining<string, string>();

    expect(hashTable.put(A, `${A}@email.com`)).toBeTruthy();
    expect(hashTable.put(B, `${B}@email.com`)).toBeTruthy();
    expect(hashTable.put(C, `${C}@email.com`)).toBeTruthy();

    expect(hashTable.size()).toEqual(3);

    const expectedHash: number = 5;

    expect(hashTable.hashCode(A)).toEqual(expectedHash);
    expect(hashTable.hashCode(B)).toEqual(expectedHash);
    expect(hashTable.hashCode(C)).toEqual(expectedHash);

    expect(hashTable.getTable()[expectedHash].size()).toEqual(3);

    return hashTable;
  }

  function removeWithCollision(a: string, b: string, c: string): void {
    const hashTable: HashTableSeparateChaining<string, string> = addValuesCollision();

    expect(hashTable.remove(a)).toBeTruthy();
    expect(hashTable.get(a)).toBeUndefined();
    expect(hashTable.get(b)).toBeDefined();
    expect(hashTable.get(c)).toBeDefined();

    expect(hashTable.remove(b)).toBeTruthy();
    expect(hashTable.get(a)).toBeUndefined();
    expect(hashTable.get(b)).toBeUndefined();
    expect(hashTable.get(c)).toBeDefined();

    expect(hashTable.remove(c)).toBeTruthy();
    expect(hashTable.get(a)).toBeUndefined();
    expect(hashTable.get(b)).toBeUndefined();
    expect(hashTable.get(c)).toBeUndefined();

    expect(hashTable.isEmpty()).toBeTruthy();
  }

  it('starts empty', () => {
    const hashTable: HashTableSeparateChaining<number, number> = new HashTableSeparateChaining<number, number>();
    expect(hashTable.size()).toEqual(0);
    expect(hashTable.isEmpty()).toBeTruthy();
  });

  it('generates hashcode', () => {
    const hashTableNumber: HashTableSeparateChaining<number, number> = new HashTableSeparateChaining<number, number>();
    expect(hashTableNumber.hashCode(1)).toEqual(1);
    expect(hashTableNumber.hashCode(10)).toEqual(10);
    expect(hashTableNumber.hashCode(100)).toEqual(100);
    expect(hashTableNumber.hashCode(1000)).toEqual(1000);

    const hashTableString: HashTableSeparateChaining<string, number> = new HashTableSeparateChaining<string, number>();
    expect(hashTableString.hashCode('1')).toEqual(12);
    expect(hashTableString.hashCode('10')).toEqual(23);
    expect(hashTableString.hashCode('100')).toEqual(34);
    expect(hashTableString.hashCode('1000')).toEqual(8);
    expect(hashTableString.hashCode('a')).toEqual(23);
    expect(hashTableString.hashCode('A')).toEqual(28);
    expect(hashTableString.hashCode('Aba')).toEqual(1);

    const hashTableMyObject: HashTableSeparateChaining<MyObject, MyObject> = new HashTableSeparateChaining<MyObject, MyObject>();

    const myObjectList: MyObject[] = [];

    for (let i: number = 1; i <= 5; i++) {
      myObjectList.push(new MyObject(i, i + 1));
    }

    expect(hashTableMyObject.hashCode(myObjectList[0])).toEqual(1);
    expect(hashTableMyObject.hashCode(myObjectList[1])).toEqual(3);
    expect(hashTableMyObject.hashCode(myObjectList[2])).toEqual(5);
    expect(hashTableMyObject.hashCode(myObjectList[3])).toEqual(7);
    expect(hashTableMyObject.hashCode(myObjectList[4])).toEqual(9);
  });

  it('puts undefined and null keys and values', () => {
    const hashTable: HashTableSeparateChaining<string, number> = new HashTableSeparateChaining<string, number>();

    expect(hashTable.put('undefined', undefined!)).toBeFalsy();
    expect(hashTable.get('undefined')).toBeUndefined();

    expect(hashTable.put('undefined', 1)).toBeTruthy();
    expect(hashTable.get('undefined')).toEqual(1);

    expect(hashTable.put('null', null!)).toBeFalsy();
    expect(hashTable.get('null')).toBeUndefined();

    expect(hashTable.put('null', 1)).toBeTruthy();
    expect(hashTable.get('null')).toEqual(1);

    hashTable.clear();

    expect(hashTable.put(undefined!, undefined!)).toBeFalsy();
    expect(hashTable.get(undefined!)).toBeUndefined();

    expect(hashTable.put(undefined!, 1)).toBeFalsy();
    expect(hashTable.get(undefined!)).toBeUndefined();

    expect(hashTable.put(null!, null!)).toBeFalsy();
    expect(hashTable.get(null!)).toBeUndefined();

    expect(hashTable.put(null!, 1)).toBeFalsy();
    expect(hashTable.get(null!)).toBeUndefined();
  });

  it('puts values with number key without collisions', () => {
    const hashTable: HashTableSeparateChaining<number, number> = new HashTableSeparateChaining<number, number>();

    const min: number = 1;
    const max: number = 5;

    const size: number = max - min + 1;

    for (let i: number = min; i <= max; i++) {
      expect(hashTable.put(i, i)).toBeTruthy();
    }

    expect(hashTable.size()).toEqual(size);

    const table: { [key: string]: LinkedList<ValuePair<number, number>> } = hashTable.getTable();

    for (let i: number = min; i <= max; i++) {
      const linkedList: LinkedList<ValuePair<number, number>> = table[i];

      expect(linkedList.size()).toEqual(1);

      const valuePair: ValuePair<number, number> | undefined = linkedList.getHead();

      expect(valuePair?.key).toEqual(i);
      expect(valuePair?.value).toEqual(i);
    }
  });

  it('puts values with string key without collisions', () => {
    const hashTable: HashTableSeparateChaining<string, number> = new HashTableSeparateChaining<string, number>();

    expect(hashTable.put('1', 1)).toBeTruthy();
    expect(hashTable.put('10', 10)).toBeTruthy();
    expect(hashTable.put('100', 100)).toBeTruthy();
    expect(hashTable.put('1000', 1000)).toBeTruthy();

    const table: { [key: string]: LinkedList<ValuePair<string, number>> } = hashTable.getTable();

    let linkedList: LinkedList<ValuePair<string, number>> | undefined;

    let valuePair: ValuePair<string, number> | undefined;

    linkedList = table[12];
    expect(linkedList.size()).toEqual(1);

    valuePair = linkedList.getHead();
    expect(valuePair?.key).toEqual('1');
    expect(valuePair?.value).toEqual(1);

    linkedList = table[23];
    expect(linkedList.size()).toEqual(1);

    valuePair = linkedList.getHead();
    expect(valuePair?.key).toEqual('10');
    expect(valuePair?.value).toEqual(10);

    linkedList = table[34];
    expect(linkedList.size()).toEqual(1);

    valuePair = linkedList.getHead();
    expect(valuePair?.key).toEqual('100');
    expect(valuePair?.value).toEqual(100);

    linkedList = table[8];
    expect(linkedList.size()).toEqual(1);

    valuePair = linkedList.getHead();
    expect(valuePair?.key).toEqual('1000');
    expect(valuePair?.value).toEqual(1000);
  });

  it('puts values with object key without collisions', () => {
    const hashTable: HashTableSeparateChaining<MyObject, MyObject> = new HashTableSeparateChaining<MyObject, MyObject>();

    const myObjectList: MyObject[] = [];

    for (let i: number = 1; i <= 5; i++) {
      myObjectList.push(new MyObject(i, i + 1));
      expect(hashTable.put(myObjectList[i - 1], myObjectList[i - 1])).toBeTruthy();
    }

    const table: { [key: string]: LinkedList<ValuePair<MyObject, MyObject>> } = hashTable.getTable();

    let linkedList: LinkedList<ValuePair<MyObject, MyObject>> | undefined;

    let valuePair: ValuePair<MyObject, MyObject> | undefined;

    linkedList = table[1];
    expect(linkedList.size()).toEqual(1);

    valuePair = linkedList.getHead();
    expect(valuePair?.key).toEqual(myObjectList[0]);
    expect(valuePair?.value).toEqual(myObjectList[0]);

    linkedList = table[3];
    expect(linkedList.size()).toEqual(1);

    valuePair = linkedList.getHead();
    expect(valuePair?.key).toEqual(myObjectList[1]);
    expect(valuePair?.value).toEqual(myObjectList[1]);

    linkedList = table[5];
    expect(linkedList.size()).toEqual(1);

    valuePair = linkedList.getHead();
    expect(valuePair?.key).toEqual(myObjectList[2]);
    expect(valuePair?.value).toEqual(myObjectList[2]);

    linkedList = table[7];
    expect(linkedList.size()).toEqual(1);

    valuePair = linkedList.getHead();
    expect(valuePair?.key).toEqual(myObjectList[3]);
    expect(valuePair?.value).toEqual(myObjectList[3]);

    linkedList = table[9];
    expect(linkedList.size()).toEqual(1);

    valuePair = linkedList.getHead();
    expect(valuePair?.key).toEqual(myObjectList[4]);
    expect(valuePair?.value).toEqual(myObjectList[4]);
  });

  it('puts values with collisions', () => {
    const hashTable: HashTableSeparateChaining<number, number> = new HashTableSeparateChaining<number, number>();

    const min: number = 1;
    const max: number = 5;

    const size: number = max - min + 1;

    for (let i: number = min; i <= max; i++) {
      expect(hashTable.put(i, i)).toBeTruthy();
    }

    expect(hashTable.size()).toEqual(size);

    for (let i: number = min; i <= max; i++) {
      expect(hashTable.put(i, i + 10)).toBeTruthy();
    }

    expect(hashTable.size()).toEqual(size * 2);

    for (let i: number = min; i <= max; i++) {
      expect(hashTable.put(i, i + 100)).toBeTruthy();
    }

    expect(hashTable.size()).toEqual(size * 3);

    const table: { [key: string]: LinkedList<ValuePair<number, number>> } = hashTable.getTable();

    let linkedList: LinkedList<ValuePair<number, number>> | undefined;

    let node: Node<ValuePair<number, number>> | undefined;

    for (let i: number = min; i <= max; i++) {
      linkedList = table[i];
      expect(linkedList.size()).toEqual(3);

      node = linkedList.getNodeAt(0);
      expect(node?.element.key).toEqual(i);
      expect(node?.element.value).toEqual(i);

      node = node?.next;
      expect(node?.element.key).toEqual(i);
      expect(node?.element.value).toEqual(i + 10);

      node = node?.next;
      expect(node?.element.key).toEqual(i);
      expect(node?.element.value).toEqual(i + 100);
    }
  });

  it('removes elements without collisions', () => {
    const hashTable: HashTableSeparateChaining<number, number> = new HashTableSeparateChaining<number, number>();

    const min: number = 1;
    const max: number = 5;

    const size: number = max - min + 1;

    for (let i: number = min; i <= max; i++) {
      expect(hashTable.put(i, i)).toBeTruthy();
    }

    expect(hashTable.size()).toEqual(size);

    for (let i: number = min; i <= max; i++) {
      expect(hashTable.remove(i)).toBeTruthy();
    }

    for (let i: number = min; i <= max; i++) {
      expect(hashTable.remove(i)).toBeFalsy();
    }

    expect(hashTable.isEmpty()).toBeTruthy();
  });

  it('removes elements with collisions', () => {
    removeWithCollision(A, B, C);
    removeWithCollision(A, C, B);
    removeWithCollision(B, A, C);
    removeWithCollision(B, C, A);
    removeWithCollision(C, A, B);
    removeWithCollision(C, B, A);
  });

  it('returns toString primitive types without collisions: number', () => {
    const hashTable: HashTableSeparateChaining<number, number> = new HashTableSeparateChaining<number, number>();

    expect(hashTable.toString()).toEqual('');

    hashTable.put(1, 1);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]}');

    hashTable.put(2, 2);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]},{2 => [#2: 2]}');

    hashTable.clear();
    expect(hashTable.toString()).toEqual('');
  });

  it('returns toString primitive types without collisions: string', () => {
    const hashTable: HashTableSeparateChaining<string, number> = new HashTableSeparateChaining<string, number>();

    hashTable.put('e1', 1);
    expect(hashTable.toString()).toEqual('{2 => [#e1: 1]}');

    hashTable.put('e2', 2);
    expect(hashTable.toString()).toEqual('{2 => [#e1: 1]},{3 => [#e2: 2]}');
  });

  it('returns toString objects without collisions', () => {
    const hashTable = new HashTableSeparateChaining<MyObject, MyObject>();

    let myObject: MyObject;

    myObject = new MyObject(1, 2);
    hashTable.put(myObject, myObject);
    expect(hashTable.toString()).toEqual('{1 => [#1|2: 1|2]}');

    myObject = new MyObject(3, 4);
    hashTable.put(myObject, myObject);
    expect(hashTable.toString()).toEqual('{1 => [#1|2: 1|2]},{5 => [#3|4: 3|4]}');
  });

  it('returns toString with collisions', () => {
    const hashTable: HashTableSeparateChaining<number, number> = new HashTableSeparateChaining<number, number>();

    expect(hashTable.toString()).toEqual('');

    hashTable.put(1, 1);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]}');

    hashTable.put(2, 2);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]},{2 => [#2: 2]}');

    hashTable.put(1, 10);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1],[#1: 10]},{2 => [#2: 2]}');

    hashTable.clear();
    expect(hashTable.toString()).toEqual('');
  });
});
