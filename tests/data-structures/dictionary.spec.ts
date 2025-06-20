import { Dictionary } from '../../src/data-structures/dictionary';
import { ValuePair } from '../../src/models/dictionary-model';
import { MyObject } from '../../src/models/my-object-model';

describe('Data Structures: Dictionary', () => {
  function customToString(key: MyObject) {
    return `####${key}`;
  }

  it('starts empty', () => {
    const dictionary: Dictionary<number, number> = new Dictionary<number, number>();
    expect(dictionary.size()).toEqual(0);
    expect(dictionary.isEmpty()).toBeTruthy();
  });

  it('sets undefined and null keys and values', () => {
    const dictionary: Dictionary<string, number> = new Dictionary<string, number>();

    expect(dictionary.set('undefined', undefined!)).toBeFalsy();
    expect(dictionary.get('undefined')).toBeUndefined();

    expect(dictionary.set('undefined', 1)).toBeTruthy();
    expect(dictionary.get('undefined')).toEqual(1);

    expect(dictionary.set('null', null!)).toBeFalsy();
    expect(dictionary.get('null')).toBeUndefined();

    expect(dictionary.set('null', 1)).toBeTruthy();
    expect(dictionary.get('null')).toEqual(1);

    dictionary.clear();

    expect(dictionary.set(undefined!, undefined!)).toBeFalsy();
    expect(dictionary.get(undefined!)).toBeUndefined();

    expect(dictionary.set(undefined!, 1)).toBeFalsy();
    expect(dictionary.get(undefined!)).toBeUndefined();

    expect(dictionary.set(null!, null!)).toBeFalsy();
    expect(dictionary.get(null!)).toBeUndefined();

    expect(dictionary.set(null!, 1)).toBeFalsy();
    expect(dictionary.get(null!)).toBeUndefined();
  });

  it('sets values with string key', () => {
    const dictionary: Dictionary<string, number> = new Dictionary<string, number>();

    const min: number = 1;
    const max: number = 5;

    const size: number = max - min + 1;

    for (let i: number = min; i <= max; i++) {
      expect(dictionary.set(`${i}`, i)).toBeTruthy();
    }

    expect(dictionary.size()).toEqual(size);

    const keys: string[] = dictionary.keys();

    expect(keys.length).toEqual(size);

    for (let i: number = 0; i < keys.length; i++) {
      expect(keys[i]).toEqual(`${i + 1}`);
    }

    dictionary.set('a', 1);
    expect(dictionary.get('a')).toEqual(1);
  });

  it('sets values with number key', () => {
    const dictionary: Dictionary<number, number> = new Dictionary<number, number>();

    const min: number = 1;
    const max: number = 5;

    const size: number = max - min + 1;

    for (let i: number = min; i <= max; i++) {
      expect(dictionary.set(i, i)).toBeTruthy();
    }

    expect(dictionary.size()).toEqual(size);

    const keys: number[] = dictionary.keys();

    expect(keys.length).toEqual(size);

    for (let i: number = 0; i < keys.length; i++) {
      expect(keys[i]).toEqual(i + 1);
    }
  });

  it('sets values with object', () => {
    const dictionary: Dictionary<MyObject, MyObject> = new Dictionary<MyObject, MyObject>();

    const min: number = 0;
    const max: number = 5;

    const size: number = max - min;

    const myObjectList: MyObject[] = [];

    for (let i: number = min; i < max; i++) {
      myObjectList.push(new MyObject(i, i + 1));
    }

    for (let i: number = min; i < max; i++) {
      expect(dictionary.set(myObjectList[i], myObjectList[i])).toBeTruthy();
    }

    expect(dictionary.size()).toEqual(size);

    for (let i: number = min; i < max; i++) {
      expect(dictionary.get(myObjectList[i])).toEqual(myObjectList[i]);
    }

    const keys: MyObject[] = dictionary.keys();

    expect(keys.length).toEqual(size);

    for (let i: number = 0; i < keys.length; i++) {
      expect(keys[i]).toEqual(myObjectList[i]);
    }

    const values: MyObject[] = dictionary.values();

    expect(values.length).toEqual(size);

    for (let i: number = 0; i < values.length; i++) {
      expect(values[i]).toEqual(myObjectList[i]);
    }
  });

  it('sets values with custom toString function', () => {
    const dictionary: Dictionary<MyObject, MyObject> = new Dictionary<MyObject, MyObject>(customToString);

    const min: number = 0;
    const max: number = 5;

    const size: number = max - min;

    const myObjectList: MyObject[] = [];

    for (let i: number = min; i < max; i++) {
      myObjectList.push(new MyObject(i, i + 1));
    }

    for (let i: number = min; i < max; i++) {
      expect(dictionary.set(myObjectList[i], myObjectList[i])).toBeTruthy();
    }

    expect(dictionary.size()).toEqual(size);

    for (let i: number = min; i < max; i++) {
      expect(dictionary.get(myObjectList[i])).toEqual(myObjectList[i]);
    }

    const keys: MyObject[] = dictionary.keys();

    expect(keys.length).toEqual(size);

    for (let i: number = 0; i < keys.length; i++) {
      expect(keys[i]).toEqual(myObjectList[i]);
    }

    const values: MyObject[] = dictionary.values();

    expect(values.length).toEqual(size);

    for (let i: number = 0; i < values.length; i++) {
      expect(values[i]).toEqual(myObjectList[i]);
    }
  });

  it('removes elements', () => {
    const dictionary: Dictionary<number, number> = new Dictionary<number, number>();

    const min: number = 1;
    const max: number = 5;

    const size: number = max - min + 1;

    for (let i: number = min; i <= max; i++) {
      expect(dictionary.set(i, i)).toBeTruthy();
    }

    expect(dictionary.size()).toEqual(size);

    for (let i: number = min; i <= max; i++) {
      expect(dictionary.remove(i)).toBeTruthy();
    }

    for (let i: number = min; i <= max; i++) {
      expect(dictionary.remove(i)).toBeFalsy();
    }

    expect(dictionary.isEmpty()).toBeTruthy();
  });

  it('returns the correct size', () => {
    const dictionary: Dictionary<number, number> = new Dictionary<number, number>();

    expect(dictionary.size()).toEqual(0);

    const max: number = 5;

    for (let i: number = 1; i < max; i++) {
      dictionary.set(i, i);
      expect(dictionary.size()).toEqual(i);
    }

    for (let i: number = 1; i < max; i++) {
      dictionary.remove(i);
      expect(dictionary.size()).toEqual(max - i - 1);
    }

    expect(dictionary.size()).toEqual(0);
    expect(dictionary.isEmpty()).toBeTruthy();
  });

  it('returns if element exists', () => {
    const dictionary: Dictionary<number, number> = new Dictionary<number, number>();

    const min: number = 1;
    const max: number = 5;

    const size: number = max - min + 1;

    for (let i: number = min; i <= max; i++) {
      expect(dictionary.set(i, i)).toBeTruthy();
    }

    expect(dictionary.size()).toEqual(size);

    for (let i: number = min; i <= max; i++) {
      expect(dictionary.hasKey(i)).toBeTruthy();
      expect(dictionary.remove(i)).toBeTruthy();
      expect(dictionary.hasKey(i)).toBeFalsy();
    }
  });

  it('returns if it is empty', () => {
    const dictionary: Dictionary<number, number> = new Dictionary<number, number>();

    expect(dictionary.isEmpty()).toBeTruthy();

    for (let i: number = 1; i < 5; i++) {
      dictionary.set(i, i);
      expect(dictionary.isEmpty()).toBeFalsy();
    }

    for (let i: number = 1; i < 5; i++) {
      dictionary.remove(i);
      expect(dictionary.isEmpty()).toEqual(!(i < 4));
    }

    expect(dictionary.size()).toEqual(0);
    expect(dictionary.isEmpty()).toBeTruthy();
  });

  it('clears the dictionary', () => {
    const dictionary: Dictionary<number, number> = new Dictionary<number, number>();

    dictionary.clear();
    expect(dictionary.isEmpty()).toBeTruthy();

    dictionary.set(1, 1);
    dictionary.set(2, 2);

    dictionary.clear();
    expect(dictionary.isEmpty()).toBeTruthy();
  });

  it('returns values, keys and value pairs', () => {
    const dictionary: Dictionary<number, number> = new Dictionary<number, number>();

    const min: number = 1;
    const max: number = 5;

    const size: number = max - min + 1;

    for (let i: number = min; i <= max; i++) {
      expect(dictionary.set(i, i)).toBeTruthy();
    }

    expect(dictionary.size()).toEqual(size);

    const keys: number[] = dictionary.keys();
    const values: number[] = dictionary.values();

    const valuePairs: ValuePair<number, number>[] = dictionary.keyValues();

    expect(keys.length).toEqual(size);
    expect(values.length).toEqual(size);
    expect(valuePairs.length).toEqual(size);

    for (let i: number = 0; i < keys.length; i++) {
      expect(keys[i]).toEqual(i + 1);
      expect(values[i]).toEqual(i + 1);
      expect(valuePairs[i].key).toEqual(i + 1);
      expect(valuePairs[i].value).toEqual(i + 1);
    }
  });

  it('allows to iterate with forEach', () => {
    const dictionary: Dictionary<number, number> = new Dictionary<number, number>();

    for (let i: number = 1; i <= 5; i++) {
      expect(dictionary.set(i, i)).toBeTruthy();
    }

    dictionary.forEach((k: number, v: number) => {
      expect(dictionary.hasKey(k)).toBeTruthy();
      expect(dictionary.get(k)).toEqual(v);
    });
  });

  it('allows to iterate with forEach and interrupt', () => {
    const dictionary: Dictionary<number, number> = new Dictionary<number, number>();

    for (let i: number = 1; i <= 5; i++) {
      expect(dictionary.set(i, i)).toBeTruthy();
    }

    const size: number = dictionary.keys().length;

    let index: number = 1;

    dictionary.forEach((k: number, v: number) => {
      expect(dictionary.hasKey(k)).toBeTruthy();
      expect(dictionary.get(k)).toEqual(v);
      index++;
    });

    expect(index).toEqual(size + 1);

    index = 1;

    dictionary.forEach((k: number, v: number) => {
      expect(dictionary.hasKey(k)).toBeTruthy();
      expect(dictionary.get(k)).toEqual(v);
      index++;
      return !(k % 3 === 0);
    });

    expect(index).toEqual(size - 1);
  });

  it('returns toString primitive types', () => {
    const dictionary: Dictionary<number, number> = new Dictionary<number, number>();

    expect(dictionary.toString()).toEqual('');

    dictionary.set(1, 1);
    expect(dictionary.toString()).toEqual('[#1: 1]');

    dictionary.set(2, 2);
    expect(dictionary.toString()).toEqual('[#1: 1],[#2: 2]');

    dictionary.clear();
    expect(dictionary.toString()).toEqual('');
  });

  it('returns toString primitive types: string', () => {
    const dictionary: Dictionary<string, number> = new Dictionary<string, number>();

    dictionary.set('e1', 1);
    expect(dictionary.toString()).toEqual('[#e1: 1]');

    dictionary.set('e2', 2);
    expect(dictionary.toString()).toEqual('[#e1: 1],[#e2: 2]');
  });

  it('returns toString objects', () => {
    const dictionary: Dictionary<MyObject, MyObject> = new Dictionary<MyObject, MyObject>();

    expect(dictionary.toString()).toEqual('');

    let myObject: MyObject = new MyObject(1, 2);

    dictionary.set(myObject, myObject);
    expect(dictionary.toString()).toEqual('[#1|2: 1|2]');

    myObject = new MyObject(3, 4);

    dictionary.set(myObject, myObject);
    expect(dictionary.toString()).toEqual('[#1|2: 1|2],[#3|4: 3|4]');
  });
});
