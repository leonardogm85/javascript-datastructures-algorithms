import { Set } from '../../src/data-structures/set';
import { MyObject } from '../../src/models/my-object-model';

describe('Data Structures: Set', () => {
  function addValues(min: number, max: number): Set<number> {
    const set: Set<number> = new Set<number>();

    for (let i: number = min; i <= max; i++) {
      set.add(i);
    }

    return set;
  }

  it('starts empty', () => {
    const set: Set<number> = new Set<number>();
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toBeTruthy();
  });

  it('adds elements', () => {
    const set: Set<number> = new Set<number>();

    for (let i: number = 1; i < 5; i++) {
      expect(set.add(i)).toBeTruthy();
      expect(set.size()).toEqual(i);
    }

    expect(set.isEmpty()).toBeFalsy();
  });

  it('does not allow duplicated elements', () => {
    const set: Set<number> = new Set<number>();

    for (let i: number = 1; i < 5; i++) {
      expect(set.add(i)).toBeTruthy();
    }

    for (let i: number = 1; i < 5; i++) {
      expect(set.add(i)).toBeFalsy();
    }
  });

  it('deletes elements', () => {
    const set: Set<number> = new Set<number>();

    for (let i: number = 1; i < 5; i++) {
      expect(set.add(i)).toBeTruthy();
    }

    for (let i: number = 1; i < 5; i++) {
      expect(set.delete(i)).toBeTruthy();
    }

    for (let i: number = 1; i < 5; i++) {
      expect(set.delete(i)).toBeFalsy();
    }

    expect(set.isEmpty()).toBeTruthy();
  });

  it('returns if element exists', () => {
    const set: Set<number> = new Set<number>();

    for (let i: number = 1; i < 5; i++) {
      expect(set.add(i)).toBeTruthy();
      expect(set.has(i)).toBeTruthy();
    }

    for (let i: number = 1; i < 5; i++) {
      expect(set.delete(i)).toBeTruthy();
      expect(set.has(i)).toBeFalsy();
    }
  });

  it('returns the correct size', () => {
    const set: Set<number> = new Set<number>();

    expect(set.size()).toEqual(0);

    for (let i: number = 1; i < 5; i++) {
      expect(set.add(i)).toBeTruthy();
      expect(set.size()).toEqual(i);
    }

    const max: number = 5;

    for (let i: number = 1; i < max; i++) {
      expect(set.delete(i)).toBeTruthy();
      expect(set.size()).toEqual(max - i - 1);
    }

    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toBeTruthy();
  });

  it('returns if it is empty', () => {
    const set: Set<number> = new Set<number>();

    expect(set.isEmpty()).toBeTruthy();

    for (let i: number = 1; i < 5; i++) {
      expect(set.add(i)).toBeTruthy();
      expect(set.isEmpty()).toBeFalsy();
    }

    for (let i: number = 1; i < 5; i++) {
      expect(set.delete(i)).toBeTruthy();
      expect(set.isEmpty()).toEqual(!(i < 4));
    }

    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toBeTruthy();
  });

  it('clears the set', () => {
    const set: Set<number> = new Set<number>();

    set.clear();
    expect(set.isEmpty()).toBeTruthy();

    expect(set.add(1)).toBeTruthy();
    expect(set.add(2)).toBeTruthy();

    set.clear();
    expect(set.isEmpty()).toBeTruthy();
  });

  it('union between empty sets', () => {
    const set1: Set<number> = new Set<number>();
    const set2: Set<number> = new Set<number>();

    let setResult: Set<number>;

    setResult = set1.union(set2);
    expect(setResult.isEmpty()).toBeTruthy();

    setResult = set2.union(set1);
    expect(setResult.isEmpty()).toBeTruthy();
  });

  it('union between equal sets', () => {
    const set1: Set<number> = addValues(1, 5);
    const set2: Set<number> = addValues(1, 5);

    let setResult: Set<number>;

    setResult = set1.union(set2);

    for (let i: number = 1; i <= 5; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }

    setResult = set2.union(set1);

    for (let i: number = 1; i <= 5; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }
  });

  it('union between different sets', () => {
    const set1: Set<number> = addValues(1, 5);
    const set2: Set<number> = addValues(6, 10);

    let setResult: Set<number>;

    setResult = set1.union(set2);

    for (let i: number = 1; i <= 10; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }

    setResult = set2.union(set1);

    for (let i: number = 1; i <= 10; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }
  });

  it('union between sets with common values', () => {
    const set1: Set<number> = addValues(1, 5);
    const set2: Set<number> = addValues(3, 6);

    let setResult: Set<number>;

    setResult = set1.union(set2);

    for (let i: number = 1; i <= 6; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }

    setResult = set2.union(set1);

    for (let i: number = 1; i <= 6; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }
  });

  it('intersection between empty sets', () => {
    const set1: Set<number> = new Set<number>();
    const set2: Set<number> = new Set<number>();

    let setResult: Set<number>;

    setResult = set1.intersection(set2);
    expect(setResult.isEmpty()).toBeTruthy();

    setResult = set2.intersection(set1);
    expect(setResult.isEmpty()).toBeTruthy();
  });

  it('intersection between equal sets', () => {
    const set1: Set<number> = addValues(1, 5);
    const set2: Set<number> = addValues(1, 5);

    let setResult: Set<number>;

    setResult = set1.intersection(set2);

    for (let i: number = 1; i <= 5; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }

    setResult = set2.intersection(set1);

    for (let i: number = 1; i <= 5; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }
  });

  it('intersection different sets', () => {
    const set1: Set<number> = addValues(1, 5);
    const set2: Set<number> = addValues(6, 10);

    let setResult: Set<number>;

    setResult = set1.intersection(set2);
    expect(setResult.isEmpty()).toBeTruthy();

    setResult = set2.intersection(set1);
    expect(setResult.isEmpty()).toBeTruthy();
  });

  it('intersection between sets with common values', () => {
    const set1: Set<number> = addValues(1, 5);
    const set2: Set<number> = addValues(3, 6);

    let setResult: Set<number>;

    setResult = set1.intersection(set2);

    for (let i: number = 3; i <= 5; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }

    setResult = set2.intersection(set1);

    for (let i: number = 3; i <= 5; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }
  });

  it('difference between empty sets', () => {
    const set1: Set<number> = new Set();
    const set2: Set<number> = new Set();

    let setResult: Set<number>;

    setResult = set1.difference(set2);
    expect(setResult.isEmpty()).toBeTruthy();

    setResult = set2.difference(set1);
    expect(setResult.isEmpty()).toBeTruthy();
  });

  it('difference between equal sets', () => {
    const set1: Set<number> = addValues(1, 5);
    const set2: Set<number> = addValues(1, 5);

    let setResult: Set<number>;

    setResult = set1.difference(set2);
    expect(setResult.isEmpty()).toBeTruthy();

    setResult = set2.difference(set1);
    expect(setResult.isEmpty()).toBeTruthy();
  });

  it('difference different sets', () => {
    const set1: Set<number> = addValues(1, 5);
    const set2: Set<number> = addValues(6, 10);

    let setResult: Set<number>;

    setResult = set1.difference(set2);

    for (let i: number = 1; i <= 5; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }

    setResult = set2.difference(set1);

    for (let i: number = 6; i <= 10; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }
  });

  it('difference between sets with common values', () => {
    const set1: Set<number> = addValues(1, 5);
    const set2: Set<number> = addValues(3, 6);

    let setResult: Set<number>;

    setResult = set1.difference(set2);

    for (let i: number = 1; i <= 2; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }

    setResult = set2.difference(set1);

    for (let i: number = 6; i <= 6; i++) {
      expect(setResult.has(i)).toBeTruthy();
    }
  });

  it('isSubsetOf between empty sets', () => {
    const set1: Set<number> = new Set();
    const set2: Set<number> = new Set();

    expect(set1.isSubsetOf(set2)).toBeTruthy();
    expect(set2.isSubsetOf(set1)).toBeTruthy();
  });

  it('isSubsetOf between equal sets', () => {
    const set1: Set<number> = addValues(1, 5);
    const set2: Set<number> = addValues(1, 5);

    expect(set1.isSubsetOf(set2)).toBeTruthy();
    expect(set2.isSubsetOf(set1)).toBeTruthy();
  });

  it('isSubsetOf different sets', () => {
    const set1: Set<number> = addValues(1, 5);
    const set2: Set<number> = addValues(6, 10);

    expect(set1.isSubsetOf(set2)).toBeFalsy();
    expect(set2.isSubsetOf(set1)).toBeFalsy();
  });

  it('isSubsetOf between sets with common values', () => {
    let set1: Set<number> = addValues(1, 8);
    let set2: Set<number> = addValues(3, 6);

    expect(set1.isSubsetOf(set2)).toBeFalsy();
    expect(set2.isSubsetOf(set1)).toBeTruthy();

    const set3: Set<number> = addValues(1, 5);
    const set4: Set<number> = addValues(3, 6);

    expect(set3.isSubsetOf(set4)).toBeFalsy();
    expect(set4.isSubsetOf(set3)).toBeFalsy();
  });

  it('returns toString primitive types', () => {
    const set: Set<number> = new Set<number>();

    expect(set.toString()).toEqual('');

    set.add(1);
    expect(set.toString()).toEqual('1');

    set.add(2);
    expect(set.toString()).toEqual('1,2');

    set.clear();
    expect(set.toString()).toEqual('');
  });

  it('returns toString primitive types: string', () => {
    const set: Set<string> = new Set<string>();

    set.add('e1');
    expect(set.toString()).toEqual('e1');

    set.add('e2');
    expect(set.toString()).toEqual('e1,e2');
  });

  it('returns toString objects', () => {
    const set: Set<MyObject> = new Set<MyObject>();

    expect(set.toString()).toEqual('');

    set.add(new MyObject(1, 2));
    expect(set.toString()).toEqual('1|2');

    set.add(new MyObject(3, 4));
    expect(set.toString()).toEqual('1|2,3|4');
  });
});
