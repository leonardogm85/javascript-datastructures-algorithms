import { Dictionary } from './dictionary';
import { Set } from './set';

export class Graph {

  private vertices: Set<string | number> = new Set<string | number>();

  private adjacencyList: Dictionary<string | number, Set<string | number>> = new Dictionary<string | number, Set<string | number>>();

  constructor(private isDirected: boolean = false) { }

  addVertex(vertex: string | number): void {
    if (this.vertices.has(vertex)) {
      return;
    }

    this.vertices.add(vertex);

    this.adjacencyList.set(vertex, new Set<string | number>());
  }

  addEdge(aVertex: string | number, bVertex: string | number): void {
    if (!this.adjacencyList.hasKey(aVertex)) {
      this.addVertex(aVertex);
    }

    if (!this.adjacencyList.hasKey(bVertex)) {
      this.addVertex(bVertex);
    }

    this.adjacencyList.get(aVertex)!.add(bVertex);

    if (!this.isDirected) {
      this.adjacencyList.get(bVertex)!.add(aVertex);
    }
  }

  removeVertex(vertex: string | number): void {
    if (!this.vertices.has(vertex)) {
      return;
    }

    this.vertices.delete(vertex);

    this.adjacencyList.remove(vertex);

    const vertices: (string | number)[] = this.vertices.values();

    for (let i: number = 0; i < vertices.length; i++) {
      this.adjacencyList.get(vertices.at(i)!)!.delete(vertex);
    }
  }

  removeEdge(aVertex: string | number, bVertex: string | number): void {
    if (!this.vertices.has(aVertex) || !this.vertices.has(bVertex)) {
      return
    }

    this.adjacencyList.get(aVertex)?.delete(bVertex);

    if (!this.isDirected) {
      this.adjacencyList.get(bVertex)?.delete(aVertex);
    }
  }

  hasVertex(vertex: string | number): boolean {
    return this.vertices.has(vertex);
  }

  hasEdge(aVertex: string | number, bVertex: string | number): boolean {
    if (!this.hasVertex(aVertex)) {
      return false;
    }

    return this.adjacencyList.get(aVertex)!.has(bVertex);
  }

  getNeighbors(vertex: string | number): Set<string | number> | undefined {
    if (!this.hasVertex(vertex)) {
      return undefined;
    }

    return this.adjacencyList.get(vertex);
  }

  getVertices(): Set<string | number> {
    return this.vertices;
  }

  getAdjacencyList(): Dictionary<string | number, Set<string | number>> {
    return this.adjacencyList;
  }

  isEmpty(): boolean {
    return this.vertices.isEmpty() && this.adjacencyList.isEmpty();
  }

  clear(): void {
    this.vertices = new Set<string | number>();
    this.adjacencyList = new Dictionary<string | number, Set<string | number>>();
  }

  toString(): string {
    let objString: string = '';

    const vertices: (string | number)[] = this.vertices.values();

    let vertex: string | number | undefined;

    let neighbors: (string | number)[] | undefined;

    for (let i: number = 0; i < vertices.length; i++) {
      vertex = vertices.at(i);

      neighbors = this.adjacencyList.get(vertex!)!.values();

      objString += `${vertex}->${neighbors}\n`;
    }

    return objString;
  }

}
