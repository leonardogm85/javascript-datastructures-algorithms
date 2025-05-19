import { LinkedList } from './linked-list';
import { ValuePair } from '../models/dictionary-model';
import { Node } from '../models/linked-list-model';
import { ToStringFunction, defaultToString, isNullOrUndefined } from '../util';

export class HashTableSeparateChaining<K, V> {

  private table: { [key: string]: LinkedList<ValuePair<K, V>> } = {};

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

    this.table[position] ??= new LinkedList<ValuePair<K, V>>();

    this.table[position].push(new ValuePair(key, value));

    return true;
  }

  get(key: K): V | undefined {
    const position: number = this.hashCode(key);

    const linkedList: LinkedList<ValuePair<K, V>> = this.table[position];

    if (!(linkedList?.isEmpty() ?? true)) {
      let current: Node<ValuePair<K, V>> | undefined = linkedList.getNodeAt(0);

      while (current) {
        if (current.element.key === key) {
          return current.element.value;
        }

        current = current.next;
      }
    }

    return undefined;
  }

  remove(key: K): boolean {
    const position: number = this.hashCode(key);

    const linkedList: LinkedList<ValuePair<K, V>> = this.table[position];

    if (!(linkedList?.isEmpty() ?? true)) {
      let current: Node<ValuePair<K, V>> | undefined = linkedList.getNodeAt(0);

      while (current) {
        if (current.element.key === key) {
          linkedList.remove(current.element);

          if (linkedList.isEmpty()) {
            delete this.table[position];
          }

          return true;
        }

        current = current.next;
      }
    }

    return false;
  }

  getTable(): { [key: string]: LinkedList<ValuePair<K, V>> } {
    return { ...this.table };
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return Object.values(this.table).reduce(
      (previous: number, current: LinkedList<ValuePair<K, V>>) => previous += current.size(), 0
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

    let objString: string = `{${keys[0]} => ${this.table[keys[0]]}}`;

    for (let i: number = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]]}}`;
    }

    return objString;
  }

}
