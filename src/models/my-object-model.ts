export class MyObject {

  constructor(
    public e1: number,
    public e2: number
  ) { }

  toString() {
    return `${this.e1}|${this.e2}`;
  }

}
