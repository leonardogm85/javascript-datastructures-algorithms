import { ValuePair } from "../models/dictionary-model";
import { IToStringFunction, defaultToString, isNullOrUndefined } from "../util";

export class HashTableLinearProbing<K, V> {

  private table: { [key: string]: ValuePair<K, V> } = {};

  constructor(private toStrFn: IToStringFunction<K> = defaultToString) { }

  private loseloseHashCode(key: K): number {
    if (typeof key === 'number') {
      return key;
    }

    const tableKey: string = this.toStrFn(key);

    let hash: number = 0;

    for (let i: number = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }

    return hash % 37;
  }

  private djb2HashCode(key: K): number {
    const tableKey: string = this.toStrFn(key);

    let hash: number = 5381;

    for (let i: number = 0; i < tableKey.length; i++) {
      hash = (hash * 33) + tableKey.charCodeAt(i);
    }

    return hash % 1013;
  }

  private verifyRemoveSideEffect(key: K, removedPosition: number): void {
    const hash: number = this.hashCode(key);

    let index: number = removedPosition + 1;

    while (this.table[index]) {
      const posHash: number = this.hashCode(this.table[index].key);

      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this.table[index];
        removedPosition = index;
      }

      index++;
    }
  }

  hashCode(key: K): number {
    return this.loseloseHashCode(key);
  }

  put(key: K, value: V): boolean {
    if (isNullOrUndefined(key) || isNullOrUndefined(value)) {
      return false;
    }

    const position: number = this.hashCode(key);

    if (!this.table[position]) {
      this.table[position] = new ValuePair(key, value);
    } else {
      let index: number = position + 1;

      while (this.table[index]) {
        index++;
      }

      this.table[index] = new ValuePair(key, value);
    }

    return true;
  }

  get(key: K): V | undefined {
    const position: number = this.hashCode(key);

    if (this.table[position]) {
      if (this.table[position].key === key) {
        return this.table[position].value;
      }

      let index: number = position + 1;

      while (this.table[index] && this.table[index].key !== key) {
        index++;
      }

      if (this.table[index] && this.table[index].key === key) {
        return this.table[index].value;
      }
    }

    return undefined;
  }

  remove(key: K): boolean {
    const position: number = this.hashCode(key);

    if (this.table[position]) {
      if (this.table[position].key === key) {
        delete this.table[position];
        this.verifyRemoveSideEffect(key, position);
        return true;
      }

      let index: number = position + 1;

      while (this.table[index] && this.table[index].key !== key) {
        index++;
      }

      if (this.table[index] && this.table[index].key === key) {
        delete this.table[index];
        this.verifyRemoveSideEffect(key, index);
        return true;
      }
    }

    return false;
  }

  getTable(): { [key: string]: ValuePair<K, V> } {
    return { ...this.table };
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return Object.keys(this.table).length;
  }

  clear(): void {
    this.table = {};
  }

  toString(): string {
    if (this.isEmpty()) {
      return '';
    }

    const keys: string[] = Object.keys(this.table);

    let objString: string = `{${keys[0]} => ${this.table[keys[0]]}}`;

    for (let i: number = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]]}}`;
    }

    return objString;
  }

}
