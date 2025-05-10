import { BinarySearchTree } from '../../src/data-structures/binary-search-tree';
import { Node } from '../../src/models/tree-model';

describe('BinarySearchTree', () => {
  function insertsElements(tree: BinarySearchTree<number>): void {
    //  n0 ->              11
    //                 /        \
    //  n1 ->       7             15
    //            /   \         /   \
    //  n2 ->    5     9       13    20
    //          /     / \     / \    / \
    //  n3 ->  3     8   10  12 14  18 25

    tree.insert(11);
    tree.insert(7);
    tree.insert(15);
    tree.insert(5);
    tree.insert(3);
    tree.insert(9);
    tree.insert(8);
    tree.insert(10);
    tree.insert(13);
    tree.insert(12);
    tree.insert(14);
    tree.insert(20);
    tree.insert(18);
    tree.insert(25);
  }

  function verifyNode(node: Node<number> | undefined, key: number | undefined, left: number | undefined, right: number | undefined): void {
    if (key) {
      expect(node?.key).toEqual(key);
    } else {
      expect(node).toBeUndefined();
      return;
    }

    if (left) {
      expect(node?.left?.key).toEqual(left);
    } else {
      expect(node?.left).toBeUndefined();
    }

    if (right) {
      expect(node?.right?.key).toEqual(right);
    } else {
      expect(node?.right).toBeUndefined();
    }
  }

  it('starts empty', () => {
    const tree: BinarySearchTree<number> = new BinarySearchTree<number>();
    expect(tree.getRoot()).toBeUndefined();
  });

  it('inserts elements', () => {
    const tree: BinarySearchTree<number> = new BinarySearchTree<number>();

    expect(tree.getRoot()).toBeUndefined();

    insertsElements(tree);

    let node: Node<number> | undefined;

    //  n0 ->              11
    //                 /        \
    //  n1 ->       7             15
    //            /   \         /   \
    //  n2 ->    5     9       13    20
    //          /     / \     / \    / \
    //  n3 ->  3     8   10  12 14  18 25

    node = tree.getRoot(); // n0
    verifyNode(node, 11, 7, 15);

    node = tree.getRoot()?.left; // n1
    verifyNode(node, 7, 5, 9);

    node = tree.getRoot()?.left?.left; // n2
    verifyNode(node, 5, 3, undefined);

    node = tree.getRoot()?.left?.left?.left; // n3
    verifyNode(node, 3, undefined, undefined);

    node = tree.getRoot()?.left?.left?.right; // n3
    verifyNode(node, undefined, undefined, undefined);

    node = tree.getRoot()?.left?.right; // n2
    verifyNode(node, 9, 8, 10);

    node = tree.getRoot()?.left?.right?.left; // n3
    verifyNode(node, 8, undefined, undefined);

    node = tree.getRoot()?.left?.right?.right; // n3
    verifyNode(node, 10, undefined, undefined);

    node = tree.getRoot()?.right; // n1
    verifyNode(node, 15, 13, 20);

    node = tree.getRoot()?.right?.left; // n2
    verifyNode(node, 13, 12, 14);

    node = tree.getRoot()?.right?.left?.left; // n3
    verifyNode(node, 12, undefined, undefined);

    node = tree.getRoot()?.right?.left?.right; // n3
    verifyNode(node, 14, undefined, undefined);

    node = tree.getRoot()?.right?.right; // n2
    verifyNode(node, 20, 18, 25);

    node = tree.getRoot()?.right?.right?.left; // n3
    verifyNode(node, 18, undefined, undefined);

    node = tree.getRoot()?.right?.right?.right; // n3
    verifyNode(node, 25, undefined, undefined);
  });

  it('verifies if element exists', () => {
    const tree: BinarySearchTree<number> = new BinarySearchTree<number>();
    expect(tree.getRoot()).toBeUndefined();
  });

  it('removes a leaf', () => {
    const tree: BinarySearchTree<number> = new BinarySearchTree<number>();
    expect(tree.getRoot()).toBeUndefined();
  });
});
