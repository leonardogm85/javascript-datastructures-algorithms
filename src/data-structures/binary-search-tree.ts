import { Node } from '../models/tree-model';
import { Compare, ICompareFunction, defaultCompare } from '../util';

export class BinarySearchTree<T> {

  protected root?: Node<T> = undefined;

  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) { }

  getRoot(): Node<T> | undefined {
    return this.root;
  }

  search(key: T): boolean {
    return this.searchNode(this.root, key);
  }

  private searchNode(node: Node<T> | undefined, key: T): boolean {
    if (!node) {
      return false;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    }

    return true;
  }

  inOrderTraverse(callback: Function): void {
    this.inOrderTraverseNode(this.root, callback);
  }

  private inOrderTraverseNode(node: Node<T> | undefined, callback: Function): void {
    if (!node) {
      return;
    }

    this.inOrderTraverseNode(node.left, callback);
    callback(node.key);
    this.inOrderTraverseNode(node.right, callback);
  }

  preOrderTraverse(callback: Function): void {
    this.preOrderTraverseNode(this.root, callback);
  }

  private preOrderTraverseNode(node: Node<T> | undefined, callback: Function): void {
    if (!node) {
      return;
    }

    callback(node.key);
    this.preOrderTraverseNode(node.left, callback);
    this.preOrderTraverseNode(node.right, callback);
  }

  postOrderTraverse(callback: Function): void {
    this.postOrderTraverseNode(this.root, callback);
  }

  private postOrderTraverseNode(node: Node<T> | undefined, callback: Function): void {
    if (!node) {
      return;
    }

    this.postOrderTraverseNode(node.left, callback);
    this.postOrderTraverseNode(node.right, callback);
    callback(node.key);
  }

  min(): Node<T> | undefined {
    return this.minNode(this.root);
  }

  protected minNode(node: Node<T> | undefined): Node<T> | undefined {
    let current: Node<T> | undefined = node;

    while (current?.left) {
      current = current.left;
    }

    return current;
  }

  max(): Node<T> | undefined {
    return this.maxNode(this.root);
  }

  protected maxNode(node: Node<T> | undefined): Node<T> | undefined {
    let current: Node<T> | undefined = node;

    while (current?.right) {
      current = current.right;
    }

    return current;
  }

  insert(key: T): void {
    if (this.root) {
      this.insertNode(this.root, key);
    } else {
      this.root = new Node(key);
    }
  }

  protected insertNode(node: Node<T>, key: T): void {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left) {
        this.insertNode(node.left, key);
      } else {
        node.left = new Node(key);
      }
    } else {
      if (node.right) {
        this.insertNode(node.right, key);
      } else {
        node.right = new Node(key);
      }
    }
  }

  remove(key: T): void {
    this.root = this.removeNode(this.root, key);
  }

  protected removeNode(node: Node<T> | undefined, key: T): Node<T> | undefined {
    if (!node) {
      return undefined;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // key is equal to node.key: handle 3 special conditions

      // case 1: a leaf node
      if (!node.left && !node.right) {
        node = undefined;
        return node;
      }

      // case 2: a node with only 1 child
      if (!node.left) {
        node = node.right;
        return node;
      }
      if (!node.right) {
        node = node.left;
        return node;
      }

      // case 3: a node with 2 children
      const aux: Node<T> = this.minNode(node.right)!;
      node.key = aux.key;
      node.right = this.removeNode(node.right, aux.key);
      return node;
    }
  }

}
