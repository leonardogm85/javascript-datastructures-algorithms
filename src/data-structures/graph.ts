import { Vertex } from '../models/graph-model';
import { Dictionary } from './dictionary';
import { Set } from './set';

export class Graph {

  private vertices: Set<Vertex> = new Set<Vertex>();

  private adjacencyList: Dictionary<Vertex, Set<Vertex>> = new Dictionary<Vertex, Set<Vertex>>();

  constructor(private isDirected: boolean = false) { }

  addVertex(vertex: Vertex): void {
    if (this.vertices.has(vertex)) {
      return;
    }

    this.vertices.add(vertex);

    this.adjacencyList.set(vertex, new Set<Vertex>());
  }

  addEdge(aVertex: Vertex, bVertex: Vertex): void {
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

  removeVertex(vertex: Vertex): void {
    if (!this.vertices.has(vertex)) {
      return;
    }

    this.vertices.delete(vertex);

    this.adjacencyList.remove(vertex);

    const vertices: Vertex[] = this.vertices.values();

    for (let i: number = 0; i < vertices.length; i++) {
      this.adjacencyList.get(vertices.at(i)!)!.delete(vertex);
    }
  }

  removeEdge(aVertex: Vertex, bVertex: Vertex): void {
    if (!this.vertices.has(aVertex) || !this.vertices.has(bVertex)) {
      return
    }

    this.adjacencyList.get(aVertex)?.delete(bVertex);

    if (!this.isDirected) {
      this.adjacencyList.get(bVertex)?.delete(aVertex);
    }
  }

  hasVertex(vertex: Vertex): boolean {
    return this.vertices.has(vertex);
  }

  hasEdge(aVertex: Vertex, bVertex: Vertex): boolean {
    if (!this.hasVertex(aVertex)) {
      return false;
    }

    return this.adjacencyList.get(aVertex)!.has(bVertex);
  }

  getNeighbors(vertex: Vertex): Set<Vertex> | undefined {
    if (!this.hasVertex(vertex)) {
      return undefined;
    }

    return this.adjacencyList.get(vertex);
  }

  getVertices(): Set<Vertex> {
    return this.vertices;
  }

  getAdjacencyList(): Dictionary<Vertex, Set<Vertex>> {
    return this.adjacencyList;
  }

  isEmpty(): boolean {
    return this.vertices.isEmpty() && this.adjacencyList.isEmpty();
  }

  clear(): void {
    this.vertices = new Set<Vertex>();
    this.adjacencyList = new Dictionary<Vertex, Set<Vertex>>();
  }

  toString(): string {
    let objString: string = '';

    const vertices: Vertex[] = this.vertices.values();

    let vertex: Vertex | undefined;

    let neighbors: Vertex[] | undefined;

    for (let i: number = 0; i < vertices.length; i++) {
      vertex = vertices.at(i);

      neighbors = this.adjacencyList.get(vertex!)!.values();

      objString += `${vertex}->${neighbors}\n`;
    }

    return objString;
  }

}
