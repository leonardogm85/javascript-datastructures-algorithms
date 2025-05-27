import { ValuePairLazy } from '../models/dictionary-model';
import { defaultToString, isNullOrUndefined, isNullOrUndefinedOrWhiteSpace, ToStringFunction } from '../util';

export class HashTableLinearProbingLazy<K, V> {

  private table: { [key: string]: ValuePairLazy<K, V> } = {};

  constructor(private toStrFn: ToStringFunction<K> = defaultToString) { }

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

    if (!this.table[position] || this.table[position].isDeleted) {
      this.table[position] = new ValuePairLazy(key, value);
    } else {
      let index: number = position + 1;

      while (this.table[index] && !this.table[position].isDeleted) {
        index++;
      }

      this.table[index] = new ValuePairLazy(key, value);
    }

    return true;
  }

  get(key: K): V | undefined {
    const position: number = this.hashCode(key);

    if (this.table[position]) {
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        return this.table[position].value;
      }

      let index: number = position + 1;

      while (this.table[index] && (this.table[index].key !== key || this.table[index].isDeleted)) {
        index++;
      }

      if (this.table[index] && this.table[index].key === key && !this.table[index].isDeleted) {
        return this.table[index].value;
      }
    }

    return undefined;
  }

  remove(key: K): boolean {
    const position: number = this.hashCode(key);

    if (this.table[position]) {
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        this.table[position].isDeleted = true;
        return true;
      }

      let index: number = position + 1;

      while (this.table[index] && (this.table[index].key !== key || this.table[index].isDeleted)) {
        index++;
      }

      if (this.table[index] && this.table[index].key === key && !this.table[index].isDeleted) {
        this.table[index].isDeleted = true;
        return true;
      }
    }

    return false;
  }

  getTable(): { [key: string]: ValuePairLazy<K, V> } {
    return { ...this.table };
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return Object.values(this.table).reduce(
      (previous: number, current: ValuePairLazy<K, V>) => previous += current.isDeleted ? 0 : 1, 0
    );
  }

  clear(): void {
    this.table = {};
  }

  toString(): string {
    if (this.isEmpty()) {
      return '';
    }

    const keys: string[] = Object.keys(this.table);

    let objString: string = '';

    for (let i: number = 0; i < keys.length; i++) {
      if (!this.table[keys[i]].isDeleted) {
        if (!isNullOrUndefinedOrWhiteSpace(objString)) {
          objString += ',';
        }

        objString += `{${keys[i]} => ${this.table[keys[i]]}}`;
      }
    }

    return objString;
  }

}
