import { HashTableLinearProbing } from '../../src/data-structures/hash-table-linear-probing';
import { ValuePair } from '../../src/models/dictionary-model';
import { MyObject } from '../../src/models/my-object-model';

describe('Data Structures: Hash Table Linear Probing', () => {
  const A: string = 'Jonathan';
  const B: string = 'Jamie';
  const C: string = 'Sue';

  function addValuesCollision(): HashTableLinearProbing<string, string> {
    const hashTable: HashTableLinearProbing<string, string> = new HashTableLinearProbing<string, string>();

    expect(hashTable.put(A, `${A}@email.com`)).toBeTruthy();
    expect(hashTable.put(B, `${B}@email.com`)).toBeTruthy();
    expect(hashTable.put(C, `${C}@email.com`)).toBeTruthy();

    expect(hashTable.size()).toEqual(3);

    const expectedHash: number = 5;

    expect(hashTable.hashCode(A)).toEqual(expectedHash);
    expect(hashTable.hashCode(B)).toEqual(expectedHash);
    expect(hashTable.hashCode(C)).toEqual(expectedHash);

    expect(hashTable.size()).toEqual(3);

    return hashTable;
  }

  function removeWithCollision(a: string, b: string, c: string): void {
    const hashTable: HashTableLinearProbing<string, string> = addValuesCollision();

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

  function addValuesCollision2() {
    const hashTable: HashTableLinearProbing<string, string> = new HashTableLinearProbing<string, string>();

    expect(hashTable.put(')', `parenthesis@email.com`)).toBeTruthy();
    expect(hashTable.put(A, `${A}@email.com`)).toBeTruthy();
    expect(hashTable.put('+', `plus@email.com`)).toBeTruthy();
    expect(hashTable.put(B, `${B}@email.com`)).toBeTruthy();
    expect(hashTable.put(',', `comma@email.com`)).toBeTruthy();
    expect(hashTable.put(C, `${C}@email.com`)).toBeTruthy();
    expect(hashTable.put('-', `minus@email.com`)).toBeTruthy();
    expect(hashTable.put('0', `zero@email.com`)).toBeTruthy();

    const expectedHash: number = 5;

    expect(hashTable.hashCode(A)).toEqual(expectedHash);
    expect(hashTable.hashCode(B)).toEqual(expectedHash);
    expect(hashTable.hashCode(C)).toEqual(expectedHash);
    expect(hashTable.hashCode(')')).toEqual(4);
    expect(hashTable.hashCode('+')).toEqual(6);
    expect(hashTable.hashCode(',')).toEqual(7);
    expect(hashTable.hashCode('-')).toEqual(8);
    expect(hashTable.hashCode('0')).toEqual(11);

    expect(hashTable.size()).toEqual(8);

    const table: { [key: string]: ValuePair<string, string> } = hashTable.getTable();

    expect(table[4].key).toEqual(')');
    expect(table[5].key).toEqual(A);
    expect(table[6].key).toEqual('+');
    expect(table[7].key).toEqual(B);
    expect(table[8].key).toEqual(',');
    expect(table[9].key).toEqual(C);
    expect(table[10].key).toEqual('-');
    expect(table[11].key).toEqual('0');

    return hashTable;
  }

  function removeWithCollision2(a: string, b: string, c: string): void {
    const hashTable: HashTableLinearProbing<string, string> = addValuesCollision2();

    expect(hashTable.remove(a)).toBeTruthy();
    expect(hashTable.get(a)).toBeUndefined();
    expect(hashTable.get(b)).toBeDefined();
    expect(hashTable.get(c)).toBeDefined();

    verifyOtherKeys(hashTable);

    expect(hashTable.remove(b)).toBeTruthy();
    expect(hashTable.get(a)).toBeUndefined();
    expect(hashTable.get(b)).toBeUndefined();
    expect(hashTable.get(c)).toBeDefined();

    verifyOtherKeys(hashTable);

    expect(hashTable.remove(c)).toBeTruthy();
    expect(hashTable.get(a)).toBeUndefined();
    expect(hashTable.get(b)).toBeUndefined();
    expect(hashTable.get(c)).toBeUndefined();

    verifyOtherKeys(hashTable);
  }

  function verifyOtherKeys(hashTable: HashTableLinearProbing<string, string>): void {
    expect(hashTable.get(')')).toBeDefined();
    expect(hashTable.get('+')).toBeDefined();
    expect(hashTable.get(',')).toBeDefined();
    expect(hashTable.get('-')).toBeDefined();
    expect(hashTable.get('0')).toBeDefined();
  }

  it('starts empty', () => {
    const hashTable: HashTableLinearProbing<number, number> = new HashTableLinearProbing<number, number>();
    expect(hashTable.size()).toEqual(0);
    expect(hashTable.isEmpty()).toBeTruthy();
  });

  it('generates hashcode', () => {
    const hashTableNumber: HashTableLinearProbing<number, number> = new HashTableLinearProbing<number, number>();

    expect(hashTableNumber.hashCode(1)).toEqual(1);
    expect(hashTableNumber.hashCode(10)).toEqual(10);
    expect(hashTableNumber.hashCode(100)).toEqual(100);
    expect(hashTableNumber.hashCode(1000)).toEqual(1000);

    const hashTableString: HashTableLinearProbing<string, number> = new HashTableLinearProbing<string, number>();

    expect(hashTableString.hashCode('1')).toEqual(12);
    expect(hashTableString.hashCode('10')).toEqual(23);
    expect(hashTableString.hashCode('100')).toEqual(34);
    expect(hashTableString.hashCode('1000')).toEqual(8);
    expect(hashTableString.hashCode('a')).toEqual(23);
    expect(hashTableString.hashCode('A')).toEqual(28);
    expect(hashTableString.hashCode('Aba')).toEqual(1);

    const hashTableMyObject: HashTableLinearProbing<MyObject, MyObject> = new HashTableLinearProbing<MyObject, MyObject>();

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
    const hashTable: HashTableLinearProbing<string, number> = new HashTableLinearProbing<string, number>();

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
    const hashTable: HashTableLinearProbing<number, number> = new HashTableLinearProbing<number, number>();

    const min: number = 1;
    const max: number = 5;

    const size: number = max - min + 1;

    for (let i: number = min; i <= max; i++) {
      expect(hashTable.put(i, i)).toBeTruthy();
    }

    expect(hashTable.size()).toEqual(size);

    const table: { [key: string]: ValuePair<number, number> } = hashTable.getTable();

    for (let i: number = min; i <= max; i++) {
      expect(table[i].key).toEqual(i);
      expect(table[i].value).toEqual(i);
    }
  });

  it('puts values with string key without collisions', () => {
    const hashTable: HashTableLinearProbing<string, number> = new HashTableLinearProbing<string, number>();

    expect(hashTable.put('1', 1)).toBeTruthy();
    expect(hashTable.put('10', 10)).toBeTruthy();
    expect(hashTable.put('100', 100)).toBeTruthy();
    expect(hashTable.put('1000', 1000)).toBeTruthy();

    const table: { [key: string]: ValuePair<string, number> } = hashTable.getTable();

    expect(table[12].key).toEqual('1');
    expect(table[12].value).toEqual(1);

    expect(table[23].key).toEqual('10');
    expect(table[23].value).toEqual(10);

    expect(table[34].key).toEqual('100');
    expect(table[34].value).toEqual(100);

    expect(table[8].key).toEqual('1000');
    expect(table[8].value).toEqual(1000);
  });

  it('puts values with object key without collisions', () => {
    const hashTable: HashTableLinearProbing<MyObject, MyObject> = new HashTableLinearProbing<MyObject, MyObject>();

    const myObjectList: MyObject[] = [];

    for (let i: number = 1; i <= 5; i++) {
      myObjectList.push(new MyObject(i, i + 1));
      expect(hashTable.put(myObjectList[i - 1], myObjectList[i - 1])).toBeTruthy();
    }

    const table: { [key: string]: ValuePair<MyObject, MyObject> } = hashTable.getTable();

    expect(table[1].key).toEqual(myObjectList[0]);
    expect(table[1].value).toEqual(myObjectList[0]);

    expect(table[3].key).toEqual(myObjectList[1]);
    expect(table[3].value).toEqual(myObjectList[1]);

    expect(table[5].key).toEqual(myObjectList[2]);
    expect(table[5].value).toEqual(myObjectList[2]);

    expect(table[7].key).toEqual(myObjectList[3]);
    expect(table[7].value).toEqual(myObjectList[3]);

    expect(table[9].key).toEqual(myObjectList[4]);
    expect(table[9].value).toEqual(myObjectList[4]);
  });

  it('puts values with collisions', () => {
    const hashTable: HashTableLinearProbing<number, number> = new HashTableLinearProbing<number, number>();

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

    const table: { [key: string]: ValuePair<number, number> } = hashTable.getTable();

    for (let i: number = min; i <= max; i++) {
      expect(table[i].key).toEqual(i);
      expect(table[i].value).toEqual(i);

      expect(table[i + size].key).toEqual(i);
      expect(table[i + size].value).toEqual(i + 10);

      expect(table[i + size * 2].key).toEqual(i);
      expect(table[i + size * 2].value).toEqual(i + 100);
    }

    addValuesCollision();
  });

  it('removes elements without collisions', () => {
    const hashTable: HashTableLinearProbing<number, number> = new HashTableLinearProbing<number, number>();

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

  it('removes elements with collisions: scenario 1', () => {
    removeWithCollision(A, B, C);
    removeWithCollision(A, C, B);
    removeWithCollision(B, A, C);
    removeWithCollision(B, C, A);
    removeWithCollision(C, A, B);
    removeWithCollision(C, B, A);
  });

  it('removes elements with collisions: scenario 2', () => {
    removeWithCollision2(A, B, C);
    removeWithCollision2(A, C, B);
    removeWithCollision2(B, A, C);
    removeWithCollision2(B, C, A);
    removeWithCollision2(C, A, B);
    removeWithCollision2(C, B, A);
  });

  it('returns toString primitive types without collisions: number', () => {
    const hashTable: HashTableLinearProbing<number, number> = new HashTableLinearProbing<number, number>();

    expect(hashTable.toString()).toEqual('');

    hashTable.put(1, 1);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]}');

    hashTable.put(2, 2);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]},{2 => [#2: 2]}');

    hashTable.clear();
    expect(hashTable.toString()).toEqual('');
  });

  it('returns toString primitive types without collisions: string', () => {
    const hashTable: HashTableLinearProbing<string, number> = new HashTableLinearProbing<string, number>();

    hashTable.put('e1', 1);
    expect(hashTable.toString()).toEqual('{2 => [#e1: 1]}');

    hashTable.put('e2', 2);
    expect(hashTable.toString()).toEqual('{2 => [#e1: 1]},{3 => [#e2: 2]}');
  });

  it('returns toString objects without collisions', () => {
    const hashTable: HashTableLinearProbing<MyObject, MyObject> = new HashTableLinearProbing<MyObject, MyObject>();

    let myObject: MyObject;

    myObject = new MyObject(1, 2);
    hashTable.put(myObject, myObject);
    expect(hashTable.toString()).toEqual('{1 => [#1|2: 1|2]}');

    myObject = new MyObject(3, 4);
    hashTable.put(myObject, myObject);
    expect(hashTable.toString()).toEqual('{1 => [#1|2: 1|2]},{5 => [#3|4: 3|4]}');
  });

  it('returns toString with collisions', () => {
    const hashTable: HashTableLinearProbing<number, number> = new HashTableLinearProbing<number, number>();

    expect(hashTable.toString()).toEqual('');

    hashTable.put(1, 1);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]}');

    hashTable.put(2, 2);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]},{2 => [#2: 2]}');

    hashTable.put(1, 10);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]},{2 => [#2: 2]},{3 => [#1: 10]}');

    hashTable.clear();
    expect(hashTable.toString()).toEqual('');
  });
});
