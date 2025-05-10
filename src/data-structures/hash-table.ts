import { ValuePair } from '../models/dictionary-model';
import { IToStringFunction, defaultToString, isNullOrUndefined } from '../util';

export class HashTable<K, V> {

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

  hashCode(key: K): number {
    return this.loseloseHashCode(key);
  }

  put(key: K, value: V): boolean {
    if (isNullOrUndefined(key) || isNullOrUndefined(value)) {
      return false;
    }

    const position: number = this.hashCode(key);

    this.table[position] = new ValuePair(key, value);

    return true;
  }

  get(key: K): V | undefined {
    const position: number = this.hashCode(key);

    const valuePair: ValuePair<K, V> | undefined = this.table[position];

    return valuePair?.value;
  }

  remove(key: K): boolean {
    const position: number = this.hashCode(key);

    const valuePair: ValuePair<K, V> | undefined = this.table[position];

    if (!valuePair) {
      return false;
    }

    delete this.table[position];

    return true;
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
