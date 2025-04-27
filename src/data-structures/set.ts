export class Set<T> {

  private items: any = {};

  add(element: T): boolean {
    if (this.has(element)) {
      return false;
    }

    this.items[element] = element;

    return true;
  }

  delete(element: T): boolean {
    if (!this.has(element)) {
      return false;
    }

    delete this.items[element];

    return true;
  }

  has(element: T): boolean {
    return Object.prototype.hasOwnProperty.call(this.items, <any>element);
  }

  values(): T[] {
    return Object.values(this.items);
  }

  union(otherSet: Set<T>): Set<T> {
    const unionSet: Set<T> = new Set<T>();

    this.values().forEach(value => unionSet.add(value));

    otherSet.values().forEach(value => unionSet.add(value));

    return unionSet;
  }

  intersection(otherSet: Set<T>): Set<T> {
    const intersectionSet: Set<T> = new Set<T>();

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

  difference(otherSet: Set<T>): Set<T> {
    const differenceSet: Set<T> = new Set<T>();

    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });

    return differenceSet;
  }

  isSubsetOf(otherSet: Set<T>): boolean {
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
