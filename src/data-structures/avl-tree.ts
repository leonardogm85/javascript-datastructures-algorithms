import { BinarySearchTree } from './binary-search-tree';
import { BalanceFactor, Node } from '../models/tree-model';
import { Compare, defaultCompare, ICompareFunction } from '../util';

export class AVLTree<T> extends BinarySearchTree<T> {

  constructor(compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn);
  }

  private getNodeHeight(node: Node<T> | undefined): number {
    if (!node) {
      return -1;
    }

    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }

  /**
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @param node Node<T>
   */
  private rotationLL(node: Node<T>): Node<T> {
    const temp: Node<T> = node.left!;
    node.left = temp.right;
    temp.right = node;
    return temp;
  }

  /**
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   * @param node Node<T>
   */
  private rotationRR(node: Node<T>): Node<T> {
    const temp: Node<T> = node.right!;
    node.right = temp.left;
    temp.left = node;
    return temp;
  }

  /**
   * Left right case: rotate left then right
   * @param node Node<T>
   */
  private rotationLR(node: Node<T>): Node<T> {
    node.left = this.rotationRR(node.left!);
    return this.rotationLL(node);
  }

  /**
   * Right left case: rotate right then left
   * @param node Node<T>
   */
  private rotationRL(node: Node<T>): Node<T> {
    node.right = this.rotationLL(node.right!);
    return this.rotationRR(node);
  }

  private getBalanceFactor(node: Node<T>): BalanceFactor {
    const heightDifference: number = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);

    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  insert(key: T): void {
    this.root = this.insertNode(this.root, key);
  }

  protected insertNode(node: Node<T> | undefined, key: T): Node<T> {
    if (!node) {
      return new Node(key);
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else {
      node.right = this.insertNode(node.right, key);
    }

    const balanceFactor: BalanceFactor = this.getBalanceFactor(node);

    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left!.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node);
      } else {
        node = this.rotationLR(node);
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right!.key) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node);
      } else {
        node = this.rotationRL(node);
      }
    }

    return node;
  }

  remove(key: T): void {
    this.root = this.removeNode(this.root, key);
  }

  protected removeNode(node: Node<T> | undefined, key: T) {
    node = super.removeNode(node, key);

    if (!node) {
      return node;
    }

    const balanceFactor: BalanceFactor = this.getBalanceFactor(node);

    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left!.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node);
      } else {
        node = this.rotationLR(node);
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right!.key) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node);
      } else {
        node = this.rotationRL(node);
      }
    }

    return node;
  }

}
