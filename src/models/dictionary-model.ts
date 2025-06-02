export class ValuePair<K, V> {

  constructor(
    public key: K,
    public value: V
  ) { }

  toString(): string {
    return `[#${this.key}: ${this.value}]`;
  }

}

export class ValuePairLazy<K, V> extends ValuePair<K, V> {

  constructor(
    override key: K,
    override value: V,
    public isDeleted = false
  ) {
    super(key, value);
  }

}

export type Callback<K, V> = (key: K, value: V) => void | boolean;
