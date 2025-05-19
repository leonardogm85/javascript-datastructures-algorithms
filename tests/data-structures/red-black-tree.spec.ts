import { RedBlackTree } from '../../src/data-structures/red-black-tree';
import { Color, RedBlackNode } from '../../src/models/tree-model';

// TODO: Complete tests

describe('RedBlackTree', () => {
  function verifyNode(node: RedBlackNode<number> | undefined, key: number, color: Color) {
    expect(node?.color).toEqual(color);
    expect(node?.key).toEqual(key);
  }

  it('starts empty', () => {
    const tree: RedBlackTree<number> = new RedBlackTree<number>();
    expect(tree.getRoot()).toBeUndefined();
  });

  it('inserts elements in the RedBlackTree', () => {
    const tree: RedBlackTree<number> = new RedBlackTree<number>();

    expect(tree.getRoot()).toBeUndefined();

    let node: RedBlackNode<number> | undefined;

    //  n0 ->  1(b)
    tree.insert(1);
    verifyNode(tree.getRoot(), 1, Color.BLACK); // n0

    //  n0 ->   1(b)
    //              \
    //  n1 ->        2(r)
    tree.insert(2);
    verifyNode(tree.getRoot(), 1, Color.BLACK); // n0
    verifyNode(tree.getRoot()?.right, 2, Color.RED); // n1

    //  n0 ->    2(b)
    //          /    \
    //  n1 ->  1(r)   3(r)
    tree.insert(3);
    verifyNode(tree.getRoot(), 2, Color.BLACK); // n0
    verifyNode(tree.getRoot()?.right, 3, Color.RED); // n1
    verifyNode(tree.getRoot()?.left, 1, Color.RED); // n1

    //  n0 ->    2(b)
    //          /    \
    //  n1 ->  1(b)   3(b)
    //                   \
    //  n2 ->             4(r)
    tree.insert(4);
    verifyNode(tree.getRoot(), 2, Color.BLACK); // n0
    verifyNode(tree.getRoot()?.left, 1, Color.BLACK); // n1
    verifyNode(tree.getRoot()?.right, 3, Color.BLACK); // n1
    node = tree.getRoot()?.right;
    verifyNode(node?.right, 4, Color.RED); // n2

    //  n0 ->    2(b)
    //          /    \
    //  n1 ->  1(b)   4(b)
    //               /    \
    //  n2 ->       3(r)   5(r)
    tree.insert(5);
    verifyNode(tree.getRoot(), 2, Color.BLACK); // n0
    verifyNode(tree.getRoot()?.left, 1, Color.BLACK); // n1
    verifyNode(tree.getRoot()?.right, 4, Color.BLACK); // n1
    node = tree.getRoot()?.right;
    verifyNode(node?.left, 3, Color.RED); // n2
    verifyNode(node?.right, 5, Color.RED); // n2

    //  n0 ->    2(b)
    //          /    \
    //  n1 ->  1(b)   4(r)
    //               /    \
    //  n2 ->       3(b)   5(b)
    //                      \
    //  n3 ->                6(r)
    tree.insert(6);
    verifyNode(tree.getRoot(), 2, Color.BLACK); // n0
    verifyNode(tree.getRoot()?.left, 1, Color.BLACK); // n1
    verifyNode(tree.getRoot()?.right, 4, Color.RED); // n1
    node = tree.getRoot()?.right;
    verifyNode(node?.left, 3, Color.BLACK); // n2
    verifyNode(node?.right, 5, Color.BLACK); // n2
    node = tree.getRoot()?.right?.right;
    verifyNode(node?.right, 6, Color.RED); // n3

    //  n0 ->    2(b)
    //          /    \
    //  n1 ->  1(b)   4(r)
    //               /    \
    //  n2 ->       3(b)   6(b)
    //                    /    \
    //  n3 ->            5(r)   7(r)
    tree.insert(7);
    verifyNode(tree.getRoot(), 2, Color.BLACK); // n0
    verifyNode(tree.getRoot()?.left, 1, Color.BLACK); // n1
    verifyNode(tree.getRoot()?.right, 4, Color.RED); // n1
    node = tree.getRoot()?.right;
    verifyNode(node?.left, 3, Color.BLACK); // n2
    verifyNode(node?.right, 6, Color.BLACK); // n2
    node = tree.getRoot()?.right?.right;
    verifyNode(node?.right, 7, Color.RED); // n3
    verifyNode(node?.left, 5, Color.RED); // n3

    //  n0 ->             4(b)
    //                 /       \
    //  n1 ->      2(r)         6(r)
    //            /    \       /    \
    //  n2 ->    1(b)  3(b)   5(b)   7(b)
    //                                \
    //  n3 ->                          8(r)
    tree.insert(8);
    verifyNode(tree.getRoot(), 4, Color.BLACK); // n0
    verifyNode(tree.getRoot()?.left, 2, Color.RED); // n1
    verifyNode(tree.getRoot()?.right, 6, Color.RED); // n1
    node = tree.getRoot()?.left;
    verifyNode(node?.left, 1, Color.BLACK); // n2
    verifyNode(node?.right, 3, Color.BLACK); // n2
    node = tree.getRoot()?.right;
    verifyNode(node?.left, 5, Color.BLACK); // n2
    verifyNode(node?.right, 7, Color.BLACK); // n2
    node = tree.getRoot()?.right?.right;
    verifyNode(node?.right, 8, Color.RED); // n3

    //  n0 ->             4(b)
    //                 /       \
    //  n1 ->      2(r)         6(r)
    //            /    \       /    \
    //  n2 ->    1(b)  3(b)   5(b)   8(b)
    //                              /    \
    //  n3 ->                      7(r)   9(r)
    tree.insert(9);
    verifyNode(tree.getRoot(), 4, Color.BLACK); // n0
    verifyNode(tree.getRoot()?.left, 2, Color.RED); // n1
    verifyNode(tree.getRoot()?.right, 6, Color.RED); // n1
    node = tree.getRoot()?.left;
    verifyNode(node?.left, 1, Color.BLACK); // n2
    verifyNode(node?.right, 3, Color.BLACK); // n2
    node = tree.getRoot()?.right;
    verifyNode(node?.left, 5, Color.BLACK); // n2
    verifyNode(node?.right, 8, Color.BLACK); // n2
    node = tree.getRoot()?.right?.right;
    verifyNode(node?.left, 7, Color.RED); // n3
    verifyNode(node?.right, 9, Color.RED); // n3

    //  n0 ->             4(b)
    //                 /       \
    //  n1 ->      2(b)         6(b)
    //            /    \       /    \
    //  n2 ->    1(b)  3(b)   5(b)   8(r)
    //                              /    \
    //  n3 ->                      7(b)   9(b)
    //                                        \
    //  n4 ->                                 10(r)
    tree.insert(10);
    verifyNode(tree.getRoot(), 4, Color.BLACK); // n0
    verifyNode(tree.getRoot()?.left, 2, Color.BLACK); // n1
    verifyNode(tree.getRoot()?.right, 6, Color.BLACK); // n1
    node = tree.getRoot()?.left;
    verifyNode(node?.left, 1, Color.BLACK); // n2
    verifyNode(node?.right, 3, Color.BLACK); // n2
    node = tree.getRoot()?.right;
    verifyNode(node?.left, 5, Color.BLACK); // n2
    verifyNode(node?.right, 8, Color.RED); // n2
    node = tree.getRoot()?.right?.right;
    verifyNode(node?.left, 7, Color.BLACK); // n3
    verifyNode(node?.right, 9, Color.BLACK); // n3
    node = tree.getRoot()?.right?.right?.right;
    verifyNode(node?.right, 10, Color.RED); // n4
  });
});
