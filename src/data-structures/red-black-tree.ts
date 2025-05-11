import { Colors, RedBlackNode } from "../models/tree-model";
import { Compare, defaultCompare, ICompareFunction } from "../util";
import { BinarySearchTree } from "./binary-search-tree";

export class RedBlackTree<T> extends BinarySearchTree<T> {

  protected override root?: RedBlackNode<T> | undefined = undefined;

  constructor(compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn);
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
  private rotationLL(node: RedBlackNode<T>): void {
    const temp: RedBlackNode<T> = node.left!;

    node.left = temp.right;

    if (temp.right) {
      temp.right.parent = node;
    }

    temp.parent = node.parent;

    if (!node.parent) {
      this.root = temp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = temp;
      } else {
        node.parent.right = temp;
      }
    }

    temp.right = node;
    node.parent = temp;
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
  private rotationRR(node: RedBlackNode<T>): void {
    const temp: RedBlackNode<T> = node.right!;

    node.right = temp.left;

    if (temp.left) {
      temp.left.parent = node;
    }

    temp.parent = node.parent;

    if (!node.parent) {
      this.root = temp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = temp;
      } else {
        node.parent.right = temp;
      }
    }

    temp.left = node;
    node.parent = temp;
  }

  insert(key: T): void {
    if (!this.root) {
      this.root = new RedBlackNode(key);
      this.root.color = Colors.BLACK;
    } else {
      const newNode: RedBlackNode<T> = this.insertNode(this.root, key);
      this.fixTreeProperties(newNode);
    }
  }

  protected insertNode(node: RedBlackNode<T>, key: T): RedBlackNode<T> {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (!node.left) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        return node.left;
      } else {
        return this.insertNode(node.left, key);
      }
    } else {
      if (!node.right) {
        node.right = new RedBlackNode(key);
        node.right.parent = node;
        return node.right;
      } else {
        return this.insertNode(node.right, key);
      }
    }
  }

  private fixTreeProperties(node: RedBlackNode<T>): void {
    while (node && node.parent && node.parent.isRed() && node.isRed()) {
      let parent: RedBlackNode<T> = node.parent;

      const grandParent: RedBlackNode<T> | undefined = parent.parent;

      if (grandParent && grandParent.left === parent) {
        // case A: parent is left child of grand parent

        const uncle: RedBlackNode<T> | undefined = grandParent.right;

        // case 1: uncle of node is also red - only recoloring
        if (uncle && uncle.isRed()) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;
        } else {
          // case 2: node is right child - left rotate
          if (node === parent.right) {
            this.rotationRR(parent);
            node = parent;
            parent = node.parent!;
          }

          // case 3: node is left child - right rotate
          this.rotationLL(grandParent);
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = parent;
        }
      } else if (grandParent && grandParent.right === parent) {
        // case B: parent is right child of grand parent

        const uncle: RedBlackNode<T> | undefined = grandParent.left;

        // case 1: uncle is read - only recoloring
        if (uncle && uncle.isRed()) {
          grandParent.color = Colors.RED;
          parent.color = Colors.BLACK;
          uncle.color = Colors.BLACK;
          node = grandParent;
        } else {
          // case 2: node is left child - left rotate
          if (node === parent.left) {
            this.rotationLL(parent);
            node = parent;
            parent = node.parent!;
          }

          // case 3: node is right child - left rotate
          this.rotationRR(grandParent);
          parent.color = Colors.BLACK;
          grandParent.color = Colors.RED;
          node = parent;
        }
      }
    }

    this.root!.color = Colors.BLACK;
  }

  getRoot(): RedBlackNode<T> | undefined {
    return this.root;
  }

}
