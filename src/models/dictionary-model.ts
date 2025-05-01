export class ValuePair<K, V> {

  constructor(
    public key: K,
    public value: V
  ) { }

  toString() {
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
