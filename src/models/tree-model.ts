export class Node<K> {

  constructor(
    public key: K,
    public left?: Node<K>,
    public right?: Node<K>
  ) { }

  toString(): string {
    return `${this.key}`;
  }

}

export class RedBlackNode<K> extends Node<K> {

  constructor(
    override key: K,
    override left?: RedBlackNode<K>,
    override right?: RedBlackNode<K>,
    public parent?: RedBlackNode<K>,
    public color: Colors = Colors.RED
  ) {
    super(key, left, right);
  }

  isRed(): boolean {
    return this.color === Colors.RED;
  }

}

export enum BalanceFactor {
  UNBALANCED_RIGHT = 1,
  SLIGHTLY_UNBALANCED_RIGHT = 2,
  BALANCED = 3,
  SLIGHTLY_UNBALANCED_LEFT = 4,
  UNBALANCED_LEFT = 5
}

export enum Colors {
  RED = 0,
  BLACK = 1
}
