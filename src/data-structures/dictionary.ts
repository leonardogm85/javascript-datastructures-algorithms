import { ValuePair } from '../models/dictionary-model';
import { defaultToString, isNullOrUndefined, ToStringFunction } from '../util';

export class Dictionary<K, V> {

  private table: { [key: string]: ValuePair<K, V> } = {};

  constructor(private toStrFn: ToStringFunction<K> = defaultToString) { }

  set(key: K, value: V): boolean {
    if (isNullOrUndefined(key) || isNullOrUndefined(value)) {
      return false;
    }

    const tableKey: string = this.toStrFn(key);

    this.table[tableKey] = new ValuePair(key, value);

    return true;
  }

  get(key: K): V | undefined {
    const tableKey: string = this.toStrFn(key);

    const valuePair: ValuePair<K, V> | undefined = this.table[tableKey];

    return valuePair?.value;
  }

  hasKey(key: K): boolean {
    return !!this.table[this.toStrFn(key)];
  }

  remove(key: K): boolean {
    if (!this.hasKey(key)) {
      return false;
    }

    const tableKey: string = this.toStrFn(key);

    delete this.table[tableKey];

    return true;
  }

  values(): V[] {
    return this.keyValues().map((valuePair: ValuePair<K, V>) => valuePair.value);
  }

  keys(): K[] {
    return this.keyValues().map((valuePair: ValuePair<K, V>) => valuePair.key);
  }

  keyValues(): ValuePair<K, V>[] {
    return Object.values(this.table);
  }

  forEach(callbackFn: (key: K, value: V) => void | boolean): void {
    const valuePairs: ValuePair<K, V>[] = this.keyValues();

    for (let i: number = 0; i < valuePairs.length; i++) {
      const result: void | boolean = callbackFn(valuePairs[i].key, valuePairs[i].value);

      if (result === false) {
        break;
      }
    }
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

    const valuePairs: ValuePair<K, V>[] = this.keyValues();

    let objString: string = `${valuePairs[0]}`;

    for (let i: number = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i]}`;
    }

    return objString;
  }

}
