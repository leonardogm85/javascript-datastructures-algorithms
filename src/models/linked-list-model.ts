export class Node<T> {

  constructor(
    public element: T,
    public next?: Node<T>
  ) { }

}

export class DoublyNode<T> extends Node<T> {

  constructor(
    override element: T,
    override next?: DoublyNode<T>,
    public prev?: DoublyNode<T>
  ) {
    super(element, next);
  }

}
