import { HashSet } from '../../src/data-structures/hash-set';
import { MyObject } from '../../src/models/my-object-model';

describe('Data Structures: Hash Set', () => {
  function addValues(min: number, max: number): HashSet<number> {
    const hashSet: HashSet<number> = new HashSet<number>();

    for (let i: number = min; i <= max; i++) {
      hashSet.add(i);
    }

    return hashSet;
  }

  it('starts empty', () => {
    const hashSet: HashSet<number> = new HashSet<number>();
    expect(hashSet.size()).toEqual(0);
    expect(hashSet.isEmpty()).toBeTruthy();
  });

  it('generates hashcode', () => {
    const hashSetNumber: HashSet<number> = new HashSet<number>();

    expect(hashSetNumber.hashCode(1)).toEqual(1);
    expect(hashSetNumber.hashCode(10)).toEqual(10);
    expect(hashSetNumber.hashCode(100)).toEqual(100);
    expect(hashSetNumber.hashCode(1000)).toEqual(1000);

    const hashSetString: HashSet<string> = new HashSet<string>();

    expect(hashSetString.hashCode('1')).toEqual(12);
    expect(hashSetString.hashCode('10')).toEqual(23);
    expect(hashSetString.hashCode('100')).toEqual(34);
    expect(hashSetString.hashCode('1000')).toEqual(8);
    expect(hashSetString.hashCode('a')).toEqual(23);
    expect(hashSetString.hashCode('A')).toEqual(28);
    expect(hashSetString.hashCode('Aba')).toEqual(1);

    const hashSetMyObject: HashSet<MyObject> = new HashSet<MyObject>();

    const myObjectList: MyObject[] = [];

    for (let i: number = 1; i <= 5; i++) {
      myObjectList.push(new MyObject(i, i + 1));
    }

    expect(hashSetMyObject.hashCode(myObjectList[0])).toEqual(1);
    expect(hashSetMyObject.hashCode(myObjectList[1])).toEqual(3);
    expect(hashSetMyObject.hashCode(myObjectList[2])).toEqual(5);
    expect(hashSetMyObject.hashCode(myObjectList[3])).toEqual(7);
    expect(hashSetMyObject.hashCode(myObjectList[4])).toEqual(9);
  });

  it('adds elements', () => {
    const hashSet: HashSet<number> = new HashSet<number>();

    for (let i: number = 1; i < 5; i++) {
      expect(hashSet.add(i)).toBeTruthy();
      expect(hashSet.size()).toEqual(i);
    }

    expect(hashSet.isEmpty()).toBeFalsy();
  });

  it('does not allow duplicated elements', () => {
    const hashSet: HashSet<number> = new HashSet<number>();

    for (let i: number = 1; i < 5; i++) {
      expect(hashSet.add(i)).toBeTruthy();
    }

    for (let i: number = 1; i < 5; i++) {
      expect(hashSet.add(i)).toBeFalsy();
    }
  });

  it('deletes elements', () => {
    const hashSet: HashSet<number> = new HashSet<number>();

    for (let i: number = 1; i < 5; i++) {
      expect(hashSet.add(i)).toBeTruthy();
    }

    for (let i: number = 1; i < 5; i++) {
      expect(hashSet.delete(i)).toBeTruthy();
    }

    for (let i: number = 1; i < 5; i++) {
      expect(hashSet.delete(i)).toBeFalsy();
    }

    expect(hashSet.isEmpty()).toBeTruthy();
  });

  it('returns if element exists', () => {
    const hashSet: HashSet<number> = new HashSet<number>();

    for (let i: number = 1; i < 5; i++) {
      expect(hashSet.add(i)).toBeTruthy();
      expect(hashSet.has(i)).toBeTruthy();
    }

    for (let i: number = 1; i < 5; i++) {
      expect(hashSet.delete(i)).toBeTruthy();
      expect(hashSet.has(i)).toBeFalsy();
    }
  });

  it('returns the correct size', () => {
    const hashSet: HashSet<number> = new HashSet<number>();

    expect(hashSet.size()).toEqual(0);

    for (let i: number = 1; i < 5; i++) {
      expect(hashSet.add(i)).toBeTruthy();
      expect(hashSet.size()).toEqual(i);
    }

    const max: number = 5;

    for (let i: number = 1; i < max; i++) {
      expect(hashSet.delete(i)).toBeTruthy();
      expect(hashSet.size()).toEqual(max - i - 1);
    }

    expect(hashSet.size()).toEqual(0);
    expect(hashSet.isEmpty()).toBeTruthy();
  });

  it('returns if it is empty', () => {
    const hashSet: HashSet<number> = new HashSet<number>();

    expect(hashSet.isEmpty()).toBeTruthy();

    for (let i: number = 1; i < 5; i++) {
      expect(hashSet.add(i)).toBeTruthy();
      expect(hashSet.isEmpty()).toBeFalsy();
    }

    for (let i: number = 1; i < 5; i++) {
      expect(hashSet.delete(i)).toBeTruthy();
      expect(hashSet.isEmpty()).toEqual(!(i < 4));
    }

    expect(hashSet.size()).toEqual(0);
    expect(hashSet.isEmpty()).toBeTruthy();
  });

  it('clears the set', () => {
    const hashSet: HashSet<number> = new HashSet<number>();

    hashSet.clear();
    expect(hashSet.isEmpty()).toBeTruthy();

    expect(hashSet.add(1)).toBeTruthy();
    expect(hashSet.add(2)).toBeTruthy();

    hashSet.clear();
    expect(hashSet.isEmpty()).toBeTruthy();
  });

  it('union between empty sets', () => {
    const hashSet1: HashSet<number> = new HashSet<number>();
    const hashSet2: HashSet<number> = new HashSet<number>();

    let hashSetResult: HashSet<number>;

    hashSetResult = hashSet1.union(hashSet2);
    expect(hashSetResult.isEmpty()).toBeTruthy();

    hashSetResult = hashSet2.union(hashSet1);
    expect(hashSetResult.isEmpty()).toBeTruthy();
  });

  it('union between equal sets', () => {
    const hashSet1: HashSet<number> = addValues(1, 5);
    const hashSet2: HashSet<number> = addValues(1, 5);

    let hashSetResult: HashSet<number>;

    hashSetResult = hashSet1.union(hashSet2);

    for (let i: number = 1; i <= 5; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }

    hashSetResult = hashSet2.union(hashSet1);

    for (let i: number = 1; i <= 5; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }
  });

  it('union between different sets', () => {
    const hashSet1: HashSet<number> = addValues(1, 5);
    const hashSet2: HashSet<number> = addValues(6, 10);

    let hashSetResult: HashSet<number>;

    hashSetResult = hashSet1.union(hashSet2);

    for (let i: number = 1; i <= 10; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }

    hashSetResult = hashSet2.union(hashSet1);

    for (let i: number = 1; i <= 10; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }
  });

  it('union between sets with common values', () => {
    const hashSet1: HashSet<number> = addValues(1, 5);
    const hashSet2: HashSet<number> = addValues(3, 6);

    let hashSetResult: HashSet<number>;

    hashSetResult = hashSet1.union(hashSet2);

    for (let i: number = 1; i <= 6; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }

    hashSetResult = hashSet2.union(hashSet1);

    for (let i: number = 1; i <= 6; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }
  });

  it('intersection between empty sets', () => {
    const hashSet1: HashSet<number> = new HashSet<number>();
    const hashSet2: HashSet<number> = new HashSet<number>();

    let hashSetResult: HashSet<number>;

    hashSetResult = hashSet1.intersection(hashSet2);
    expect(hashSetResult.isEmpty()).toBeTruthy();

    hashSetResult = hashSet2.intersection(hashSet1);
    expect(hashSetResult.isEmpty()).toBeTruthy();
  });

  it('intersection between equal sets', () => {
    const hashSet1: HashSet<number> = addValues(1, 5);
    const hashSet2: HashSet<number> = addValues(1, 5);

    let hashSetResult: HashSet<number>;

    hashSetResult = hashSet1.intersection(hashSet2);

    for (let i: number = 1; i <= 5; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }

    hashSetResult = hashSet2.intersection(hashSet1);

    for (let i: number = 1; i <= 5; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }
  });

  it('intersection different sets', () => {
    const hashSet1: HashSet<number> = addValues(1, 5);
    const hashSet2: HashSet<number> = addValues(6, 10);

    let hashSetResult: HashSet<number>;

    hashSetResult = hashSet1.intersection(hashSet2);
    expect(hashSetResult.isEmpty()).toBeTruthy();

    hashSetResult = hashSet2.intersection(hashSet1);
    expect(hashSetResult.isEmpty()).toBeTruthy();
  });

  it('intersection between sets with common values', () => {
    const hashSet1: HashSet<number> = addValues(1, 5);
    const hashSet2: HashSet<number> = addValues(3, 6);

    let hashSetResult: HashSet<number>;

    hashSetResult = hashSet1.intersection(hashSet2);

    for (let i: number = 3; i <= 5; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }

    hashSetResult = hashSet2.intersection(hashSet1);

    for (let i: number = 3; i <= 5; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }
  });

  it('difference between empty sets', () => {
    const hashSet1: HashSet<number> = new HashSet();
    const hashSet2: HashSet<number> = new HashSet();

    let hashSetResult: HashSet<number>;

    hashSetResult = hashSet1.difference(hashSet2);
    expect(hashSetResult.isEmpty()).toBeTruthy();

    hashSetResult = hashSet2.difference(hashSet1);
    expect(hashSetResult.isEmpty()).toBeTruthy();
  });

  it('difference between equal sets', () => {
    const hashSet1: HashSet<number> = addValues(1, 5);
    const hashSet2: HashSet<number> = addValues(1, 5);

    let hashSetResult: HashSet<number>;

    hashSetResult = hashSet1.difference(hashSet2);
    expect(hashSetResult.isEmpty()).toBeTruthy();

    hashSetResult = hashSet2.difference(hashSet1);
    expect(hashSetResult.isEmpty()).toBeTruthy();
  });

  it('difference different sets', () => {
    const hashSet1: HashSet<number> = addValues(1, 5);
    const hashSet2: HashSet<number> = addValues(6, 10);

    let hashSetResult: HashSet<number>;

    hashSetResult = hashSet1.difference(hashSet2);

    for (let i: number = 1; i <= 5; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }

    hashSetResult = hashSet2.difference(hashSet1);

    for (let i: number = 6; i <= 10; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }
  });

  it('difference between sets with common values', () => {
    const hashSet1: HashSet<number> = addValues(1, 5);
    const hashSet2: HashSet<number> = addValues(3, 6);

    let hashSetResult: HashSet<number>;

    hashSetResult = hashSet1.difference(hashSet2);

    for (let i: number = 1; i <= 2; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }

    hashSetResult = hashSet2.difference(hashSet1);

    for (let i: number = 6; i <= 6; i++) {
      expect(hashSetResult.has(i)).toBeTruthy();
    }
  });

  it('isSubsetOf between empty sets', () => {
    const hashSet1: HashSet<number> = new HashSet();
    const hashSet2: HashSet<number> = new HashSet();

    expect(hashSet1.isSubsetOf(hashSet2)).toBeTruthy();
    expect(hashSet2.isSubsetOf(hashSet1)).toBeTruthy();
  });

  it('isSubsetOf between equal sets', () => {
    const hashSet1: HashSet<number> = addValues(1, 5);
    const hashSet2: HashSet<number> = addValues(1, 5);

    expect(hashSet1.isSubsetOf(hashSet2)).toBeTruthy();
    expect(hashSet2.isSubsetOf(hashSet1)).toBeTruthy();
  });

  it('isSubsetOf different sets', () => {
    const hashSet1: HashSet<number> = addValues(1, 5);
    const hashSet2: HashSet<number> = addValues(6, 10);

    expect(hashSet1.isSubsetOf(hashSet2)).toBeFalsy();
    expect(hashSet2.isSubsetOf(hashSet1)).toBeFalsy();
  });

  it('isSubsetOf between sets with common values', () => {
    let hashSet1: HashSet<number> = addValues(1, 8);
    let hashSet2: HashSet<number> = addValues(3, 6);

    expect(hashSet1.isSubsetOf(hashSet2)).toBeFalsy();
    expect(hashSet2.isSubsetOf(hashSet1)).toBeTruthy();

    const hashSet3: HashSet<number> = addValues(1, 5);
    const hashSet4: HashSet<number> = addValues(3, 6);

    expect(hashSet3.isSubsetOf(hashSet4)).toBeFalsy();
    expect(hashSet4.isSubsetOf(hashSet3)).toBeFalsy();
  });

  it('returns toString primitive types', () => {
    const hashSet: HashSet<number> = new HashSet<number>();

    expect(hashSet.toString()).toEqual('');

    hashSet.add(1);
    expect(hashSet.toString()).toEqual('1');

    hashSet.add(2);
    expect(hashSet.toString()).toEqual('1,2');

    hashSet.clear();
    expect(hashSet.toString()).toEqual('');
  });

  it('returns toString primitive types: string', () => {
    const hashSet: HashSet<string> = new HashSet<string>();

    hashSet.add('e1');
    expect(hashSet.toString()).toEqual('e1');

    hashSet.add('e2');
    expect(hashSet.toString()).toEqual('e1,e2');
  });

  it('returns toString objects', () => {
    const hashSet: HashSet<MyObject> = new HashSet<MyObject>();

    expect(hashSet.toString()).toEqual('');

    hashSet.add(new MyObject(1, 2));
    expect(hashSet.toString()).toEqual('1|2');

    hashSet.add(new MyObject(3, 4));
    expect(hashSet.toString()).toEqual('1|2,3|4');
  });
});
