import { IToStringFunction, defaultToString } from '../util';

export class HashSet<T> {

  private items: { [key: number]: T } = {};

  constructor(private toStrFn: IToStringFunction<T> = defaultToString) { }

  private loseloseHashCode(value: T): number {
    if (typeof value === 'number') {
      return value;
    }

    const tableKey: string = this.toStrFn(value);

    let hash: number = 0;

    for (let i: number = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }

    return hash % 37;
  }

  private djb2HashCode(value: T): number {
    const tableKey: string = this.toStrFn(value);

    let hash: number = 5381;

    for (let i: number = 0; i < tableKey.length; i++) {
      hash = (hash * 33) + tableKey.charCodeAt(i);
    }

    return hash % 1013;
  }

  hashCode(value: T): number {
    return this.loseloseHashCode(value);
  }

  add(element: T): boolean {
    if (this.has(element)) {
      return false;
    }

    this.items[this.hashCode(element)] = element;

    return true;
  }

  delete(element: T): boolean {
    if (!this.has(element)) {
      return false;
    }

    delete this.items[this.hashCode(element)];

    return true;
  }

  has(element: T): boolean {
    return Object.prototype.hasOwnProperty.call(this.items, this.hashCode(element));
  }

  values(): T[] {
    return Object.values(this.items);
  }

  union(otherSet: HashSet<T>): HashSet<T> {
    const unionSet: HashSet<T> = new HashSet<T>();

    this.values().forEach(value => unionSet.add(value));

    otherSet.values().forEach(value => unionSet.add(value));

    return unionSet;
  }

  intersection(otherSet: HashSet<T>): HashSet<T> {
    const intersectionSet: HashSet<T> = new HashSet<T>();

    const values: T[] = this.values();
    const otherValues: T[] = otherSet.values();

    const [biggerSet, smallerSet]: [T[], T[]] = otherValues.length - values.length > 0
      ? [otherValues, values]
      : [values, otherValues];

    smallerSet.forEach(value => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value);
      }
    });

    return intersectionSet;
  }

  difference(otherSet: HashSet<T>): HashSet<T> {
    const differenceSet: HashSet<T> = new HashSet<T>();

    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });

    return differenceSet;
  }

  isSubsetOf(otherSet: HashSet<T>): boolean {
    return this.values().every((value) => otherSet.has(value));
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return Object.keys(this.items).length;
  }

  clear(): void {
    this.items = {};
  }

  toString(): string {
    if (this.isEmpty()) {
      return '';
    }

    const values: T[] = this.values();

    let objString: string = `${values[0]}`;

    for (let i: number = 1; i < values.length; i++) {
      objString = `${objString},${values[i]}`;
    }

    return objString;
  }

}
