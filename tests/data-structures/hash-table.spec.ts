import HashTable from '../../src/data-structures/hash-table';
import { ValuePair } from '../../src/models/dictionary-model';
import { MyObject } from '../../src/models/my-object-model';

describe('HashTable', () => {
  it('starts empty', () => {
    const hashTable: HashTable<number, number> = new HashTable<number, number>();
    expect(hashTable.size()).toEqual(0);
    expect(hashTable.isEmpty()).toBeTruthy();
  });

  it('generates hashcode', () => {
    const hashTableNumber: HashTable<number, number> = new HashTable<number, number>();

    expect(hashTableNumber.hashCode(1)).toEqual(1);
    expect(hashTableNumber.hashCode(10)).toEqual(10);
    expect(hashTableNumber.hashCode(100)).toEqual(100);
    expect(hashTableNumber.hashCode(1000)).toEqual(1000);

    const hashTableString: HashTable<string, number> = new HashTable<string, number>();

    expect(hashTableString.hashCode('1')).toEqual(12);
    expect(hashTableString.hashCode('10')).toEqual(23);
    expect(hashTableString.hashCode('100')).toEqual(34);
    expect(hashTableString.hashCode('1000')).toEqual(8);
    expect(hashTableString.hashCode('a')).toEqual(23);
    expect(hashTableString.hashCode('A')).toEqual(28);
    expect(hashTableString.hashCode('Aba')).toEqual(1);

    const hashTableMyObject: HashTable<MyObject, MyObject> = new HashTable<MyObject, MyObject>();

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
    const hashTable: HashTable<string, number> = new HashTable<string, number>();

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

  it('puts values with number key', () => {
    const hashTable: HashTable<number, number> = new HashTable<number, number>();

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

  it('puts values with string key', () => {
    const hashTable: HashTable<string, number> = new HashTable<string, number>();

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

  it('puts values with object key', () => {
    const hashTable: HashTable<MyObject, MyObject> = new HashTable<MyObject, MyObject>();

    const myObjectList = [];

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

  it('does NOT handle collision, replaces values', () => {
    const hashTable: HashTable<number, number> = new HashTable<number, number>();

    for (let i: number = 0; i < 5; i++) {
      expect(hashTable.put(1, i)).toBeTruthy();
    }

    expect(hashTable.size()).toEqual(1);
  });

  it('removes elements', () => {
    const hashTable: HashTable<number, number> = new HashTable<number, number>();

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

  it('returns toString primitive types: number', () => {
    const hashTable: HashTable<number, number> = new HashTable<number, number>();

    expect(hashTable.toString()).toEqual('');

    hashTable.put(1, 1);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]}');

    hashTable.put(2, 2);
    expect(hashTable.toString()).toEqual('{1 => [#1: 1]},{2 => [#2: 2]}');

    hashTable.clear();
    expect(hashTable.toString()).toEqual('');
  });

  it('returns toString primitive types: string', () => {
    const hashTable: HashTable<string, number> = new HashTable<string, number>();

    hashTable.put('e1', 1);
    expect(hashTable.toString()).toEqual('{2 => [#e1: 1]}');

    hashTable.put('e2', 2);
    expect(hashTable.toString()).toEqual('{2 => [#e1: 1]},{3 => [#e2: 2]}');
  });

  it('returns toString objects', () => {
    const hashTable: HashTable<MyObject, MyObject> = new HashTable<MyObject, MyObject>();

    let myObject: MyObject;

    myObject = new MyObject(1, 2);
    hashTable.put(myObject, myObject);
    expect(hashTable.toString()).toEqual('{1 => [#1|2: 1|2]}');

    myObject = new MyObject(3, 4);
    hashTable.put(myObject, myObject);
    expect(hashTable.toString()).toEqual('{1 => [#1|2: 1|2]},{5 => [#3|4: 3|4]}');
  });
});
