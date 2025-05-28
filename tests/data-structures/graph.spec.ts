import { Graph } from '../../src/data-structures/graph';

describe('Queue', () => {
  it('starts empty', () => {
    const graph: Graph = new Graph();
    expect(graph.isEmpty()).toBeTruthy();
  });

  it('add vertices and edges (directed graph: false)', () => {
    const isDirected: boolean = false;

    const graph: Graph = new Graph(isDirected);

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual(['B', 'C', 'D']);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['A', 'E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['A', 'D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['A', 'C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['B', 'I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual(['B']);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual(['C', 'D']);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual(['D']);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual(['E']);

    expect(graph.isEmpty()).toBeFalsy();
  });

  it('add vertices and edges (directed graph: true)', () => {
    const isDirected: boolean = true;

    const graph: Graph = new Graph(isDirected);

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'C');
    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual(['B', 'C', 'D']);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual([]);

    expect(graph.isEmpty()).toBeFalsy();
  });

  it('add only vertices', () => {
    const graph: Graph = new Graph();

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual([]);

    expect(graph.isEmpty()).toBeFalsy();
  });

  it('add duplicate vertices', () => {
    const graph: Graph = new Graph();

    graph.addVertex('A');
    graph.addVertex('A');
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('B');
    graph.addVertex('C');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual([]);

    expect(graph.isEmpty()).toBeFalsy();
  });

  it('add only edges', () => {
    const graph: Graph = new Graph();

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');
    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');
    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');
    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');
    graph.addEdge('E', 'I');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual(['B', 'C', 'D']);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['A', 'E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['A', 'D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['A', 'C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['B', 'I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual(['B']);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual(['C', 'D']);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual(['D']);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual(['E']);

    expect(graph.isEmpty()).toBeFalsy();
  });

  it('add duplicate edges', () => {
    const graph: Graph = new Graph();

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');
    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');
    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');
    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');
    graph.addEdge('E', 'I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual(['B', 'C', 'D']);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['A', 'E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['A', 'D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['A', 'C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['B', 'I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual(['B']);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual(['C', 'D']);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual(['D']);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual(['E']);

    expect(graph.isEmpty()).toBeFalsy();
  });

  it('remove vertices (directed graph: false)', () => {
    const isDirected: boolean = false;

    const graph: Graph = new Graph(isDirected);

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual(['B', 'C', 'D']);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['A', 'E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['A', 'D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['A', 'C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['B', 'I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual(['B']);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual(['C', 'D']);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual(['D']);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual(['E']);

    graph.removeVertex('A');

    expect(graph.getVertices().values()).toEqual(['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['B', 'I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual(['B']);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual(['C', 'D']);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual(['D']);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual(['E']);

    graph.removeVertex('B');
    graph.removeVertex('C');
    graph.removeVertex('D');
    graph.removeVertex('E');
    graph.removeVertex('F');
    graph.removeVertex('G');
    graph.removeVertex('H');
    graph.removeVertex('I');

    expect(graph.getVertices().values()).toEqual([]);

    expect(graph.getAdjacencyList().get('A')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('B')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('C')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('D')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('E')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('F')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('G')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('H')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('I')?.values()).toBeUndefined();

    graph.removeVertex('X');
    graph.removeVertex('Y');

    expect(graph.getVertices().values()).toEqual([]);

    expect(graph.getAdjacencyList().get('X')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('Y')?.values()).toBeUndefined();
  });

  it('remove vertices (directed graph: true)', () => {
    const isDirected: boolean = true;

    const graph: Graph = new Graph(isDirected);

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'C');
    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual(['B', 'C', 'D']);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual([]);

    graph.removeVertex('A');

    expect(graph.getVertices().values()).toEqual(['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual([]);

    graph.removeVertex('B');
    graph.removeVertex('C');
    graph.removeVertex('D');
    graph.removeVertex('E');
    graph.removeVertex('F');
    graph.removeVertex('G');
    graph.removeVertex('H');
    graph.removeVertex('I');

    expect(graph.getVertices().values()).toEqual([]);

    expect(graph.getAdjacencyList().get('A')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('B')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('C')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('D')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('E')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('F')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('G')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('H')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('I')?.values()).toBeUndefined();

    graph.removeVertex('X');
    graph.removeVertex('Y');

    expect(graph.getVertices().values()).toEqual([]);

    expect(graph.getAdjacencyList().get('X')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('Y')?.values()).toBeUndefined();
  });

  it('remove edge (directed graph: false)', () => {
    const isDirected: boolean = false;

    const graph: Graph = new Graph(isDirected);

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual(['B', 'C', 'D']);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['A', 'E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['A', 'D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['A', 'C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['B', 'I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual(['B']);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual(['C', 'D']);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual(['D']);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual(['E']);

    graph.removeEdge('X', 'A');
    graph.removeEdge('A', 'Y');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual(['B', 'C', 'D']);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['A', 'E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['A', 'D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['A', 'C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['B', 'I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual(['B']);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual(['C', 'D']);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual(['D']);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual(['E']);

    graph.removeEdge('A', 'B');
    graph.removeEdge('A', 'C');
    graph.removeEdge('A', 'D');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['B', 'I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual(['B']);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual(['C', 'D']);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual(['D']);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual(['E']);

    graph.removeEdge('B', 'E');
    graph.removeEdge('B', 'F');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual(['C', 'D']);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual(['D']);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual(['E']);

    graph.removeEdge('C', 'D');
    graph.removeEdge('C', 'G');

    graph.removeEdge('D', 'G');
    graph.removeEdge('D', 'H');

    graph.removeEdge('E', 'I');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual([]);
  });

  it('remove edge (directed graph: true)', () => {
    const isDirected: boolean = true;

    const graph: Graph = new Graph(isDirected);

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'C');
    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual(['B', 'C', 'D']);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual([]);

    graph.removeEdge('X', 'A');
    graph.removeEdge('A', 'Y');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual(['B', 'C', 'D']);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual([]);

    graph.removeEdge('A', 'B');
    graph.removeEdge('A', 'C');
    graph.removeEdge('A', 'D');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual([]);

    graph.removeEdge('B', 'E');
    graph.removeEdge('B', 'F');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual([]);

    graph.removeEdge('C', 'D');
    graph.removeEdge('C', 'G');

    graph.removeEdge('D', 'C');
    graph.removeEdge('D', 'G');
    graph.removeEdge('D', 'H');

    graph.removeEdge('E', 'I');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual([]);
  });

  it('has vertices and edge (directed graph: false)', () => {
    const isDirected: boolean = false;

    const graph: Graph = new Graph(isDirected);

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    expect(graph.hasVertex('A')).toBeTruthy();
    expect(graph.hasVertex('B')).toBeTruthy();
    expect(graph.hasVertex('C')).toBeTruthy();
    expect(graph.hasVertex('D')).toBeTruthy();
    expect(graph.hasVertex('E')).toBeTruthy();
    expect(graph.hasVertex('F')).toBeTruthy();
    expect(graph.hasVertex('G')).toBeTruthy();
    expect(graph.hasVertex('H')).toBeTruthy();
    expect(graph.hasVertex('I')).toBeTruthy();

    expect(graph.hasVertex('X')).toBeFalsy();
    expect(graph.hasVertex('Y')).toBeFalsy();

    expect(graph.hasEdge('A', 'B')).toBeTruthy();
    expect(graph.hasEdge('A', 'C')).toBeTruthy();
    expect(graph.hasEdge('A', 'D')).toBeTruthy();

    expect(graph.hasEdge('B', 'A')).toBeTruthy();
    expect(graph.hasEdge('B', 'E')).toBeTruthy();
    expect(graph.hasEdge('B', 'F')).toBeTruthy();

    expect(graph.hasEdge('C', 'A')).toBeTruthy();
    expect(graph.hasEdge('C', 'D')).toBeTruthy();
    expect(graph.hasEdge('C', 'G')).toBeTruthy();

    expect(graph.hasEdge('D', 'A')).toBeTruthy();
    expect(graph.hasEdge('D', 'C')).toBeTruthy();
    expect(graph.hasEdge('D', 'G')).toBeTruthy();
    expect(graph.hasEdge('D', 'H')).toBeTruthy();

    expect(graph.hasEdge('E', 'B')).toBeTruthy();
    expect(graph.hasEdge('E', 'I')).toBeTruthy();

    expect(graph.hasEdge('F', 'B')).toBeTruthy();

    expect(graph.hasEdge('G', 'C')).toBeTruthy();
    expect(graph.hasEdge('G', 'D')).toBeTruthy();

    expect(graph.hasEdge('H', 'D')).toBeTruthy();

    expect(graph.hasEdge('I', 'E')).toBeTruthy();

    expect(graph.hasEdge('A', 'X')).toBeFalsy();
    expect(graph.hasEdge('A', 'Y')).toBeFalsy();
  });

  it('has vertices and edge (directed graph: true)', () => {
    const isDirected: boolean = true;

    const graph: Graph = new Graph(isDirected);

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'C');
    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    expect(graph.hasVertex('A')).toBeTruthy();
    expect(graph.hasVertex('B')).toBeTruthy();
    expect(graph.hasVertex('C')).toBeTruthy();
    expect(graph.hasVertex('D')).toBeTruthy();
    expect(graph.hasVertex('E')).toBeTruthy();
    expect(graph.hasVertex('F')).toBeTruthy();
    expect(graph.hasVertex('G')).toBeTruthy();
    expect(graph.hasVertex('H')).toBeTruthy();
    expect(graph.hasVertex('I')).toBeTruthy();

    expect(graph.hasVertex('X')).toBeFalsy();
    expect(graph.hasVertex('Y')).toBeFalsy();

    expect(graph.hasEdge('A', 'B')).toBeTruthy();
    expect(graph.hasEdge('A', 'C')).toBeTruthy();
    expect(graph.hasEdge('A', 'D')).toBeTruthy();

    expect(graph.hasEdge('B', 'A')).toBeFalsy();
    expect(graph.hasEdge('B', 'E')).toBeTruthy();
    expect(graph.hasEdge('B', 'F')).toBeTruthy();

    expect(graph.hasEdge('C', 'A')).toBeFalsy();
    expect(graph.hasEdge('C', 'D')).toBeTruthy();
    expect(graph.hasEdge('C', 'G')).toBeTruthy();

    expect(graph.hasEdge('D', 'A')).toBeFalsy();
    expect(graph.hasEdge('D', 'C')).toBeTruthy();
    expect(graph.hasEdge('D', 'G')).toBeTruthy();
    expect(graph.hasEdge('D', 'H')).toBeTruthy();

    expect(graph.hasEdge('E', 'B')).toBeFalsy();
    expect(graph.hasEdge('E', 'I')).toBeTruthy();

    expect(graph.hasEdge('F', 'B')).toBeFalsy();

    expect(graph.hasEdge('G', 'C')).toBeFalsy();
    expect(graph.hasEdge('G', 'D')).toBeFalsy();

    expect(graph.hasEdge('H', 'D')).toBeFalsy();

    expect(graph.hasEdge('I', 'E')).toBeFalsy();
  });

  it('get vertices, adjacencyList and neighbors (directed graph: false)', () => {
    const isDirected: boolean = false;

    const graph: Graph = new Graph(isDirected);

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual(['B', 'C', 'D']);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['A', 'E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['A', 'D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['A', 'C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['B', 'I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual(['B']);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual(['C', 'D']);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual(['D']);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual(['E']);

    expect(graph.getAdjacencyList().get('X')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('Y')?.values()).toBeUndefined();

    expect(graph.getNeighbors('A')?.values()).toEqual(graph.getAdjacencyList().get('A')?.values());
    expect(graph.getNeighbors('B')?.values()).toEqual(graph.getAdjacencyList().get('B')?.values());
    expect(graph.getNeighbors('C')?.values()).toEqual(graph.getAdjacencyList().get('C')?.values());
    expect(graph.getNeighbors('D')?.values()).toEqual(graph.getAdjacencyList().get('D')?.values());
    expect(graph.getNeighbors('E')?.values()).toEqual(graph.getAdjacencyList().get('E')?.values());
    expect(graph.getNeighbors('F')?.values()).toEqual(graph.getAdjacencyList().get('F')?.values());
    expect(graph.getNeighbors('G')?.values()).toEqual(graph.getAdjacencyList().get('G')?.values());
    expect(graph.getNeighbors('H')?.values()).toEqual(graph.getAdjacencyList().get('H')?.values());
    expect(graph.getNeighbors('I')?.values()).toEqual(graph.getAdjacencyList().get('I')?.values());

    expect(graph.getNeighbors('X')?.values()).toBeUndefined();
    expect(graph.getNeighbors('Y')?.values()).toBeUndefined();
  });

  it('get vertices, adjacencyList and neighbors (directed graph: true)', () => {
    const isDirected: boolean = true;

    const graph: Graph = new Graph(isDirected);

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'C');
    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    expect(graph.getVertices().values()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    expect(graph.getAdjacencyList().get('A')?.values()).toEqual(['B', 'C', 'D']);
    expect(graph.getAdjacencyList().get('B')?.values()).toEqual(['E', 'F']);
    expect(graph.getAdjacencyList().get('C')?.values()).toEqual(['D', 'G']);
    expect(graph.getAdjacencyList().get('D')?.values()).toEqual(['C', 'G', 'H']);
    expect(graph.getAdjacencyList().get('E')?.values()).toEqual(['I']);
    expect(graph.getAdjacencyList().get('F')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('G')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('H')?.values()).toEqual([]);
    expect(graph.getAdjacencyList().get('I')?.values()).toEqual([]);

    expect(graph.getAdjacencyList().get('X')?.values()).toBeUndefined();
    expect(graph.getAdjacencyList().get('Y')?.values()).toBeUndefined();

    expect(graph.getNeighbors('A')?.values()).toEqual(graph.getAdjacencyList().get('A')?.values());
    expect(graph.getNeighbors('B')?.values()).toEqual(graph.getAdjacencyList().get('B')?.values());
    expect(graph.getNeighbors('C')?.values()).toEqual(graph.getAdjacencyList().get('C')?.values());
    expect(graph.getNeighbors('D')?.values()).toEqual(graph.getAdjacencyList().get('D')?.values());
    expect(graph.getNeighbors('E')?.values()).toEqual(graph.getAdjacencyList().get('E')?.values());
    expect(graph.getNeighbors('F')?.values()).toEqual(graph.getAdjacencyList().get('F')?.values());
    expect(graph.getNeighbors('G')?.values()).toEqual(graph.getAdjacencyList().get('G')?.values());
    expect(graph.getNeighbors('H')?.values()).toEqual(graph.getAdjacencyList().get('H')?.values());
    expect(graph.getNeighbors('I')?.values()).toEqual(graph.getAdjacencyList().get('I')?.values());

    expect(graph.getNeighbors('X')?.values()).toBeUndefined();
    expect(graph.getNeighbors('Y')?.values()).toBeUndefined();
  });

  it('returns if it is empty', () => {
    const graph: Graph = new Graph();

    expect(graph.isEmpty()).toBeTruthy();

    graph.clear();
    expect(graph.isEmpty()).toBeTruthy();

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    expect(graph.isEmpty()).toBeFalsy();

    graph.clear();
    expect(graph.isEmpty()).toBeTruthy();
  });

  it('clears the graph', () => {
    const graph: Graph = new Graph();

    expect(graph.isEmpty()).toBeTruthy();

    graph.clear();
    expect(graph.isEmpty()).toBeTruthy();

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    expect(graph.isEmpty()).toBeFalsy();

    graph.clear();
    expect(graph.isEmpty()).toBeTruthy();
  });

  it('returns toString (directed graph: false)', () => {
    const isDirected: boolean = false;

    const graph: Graph = new Graph(isDirected);

    expect(graph.toString()).toEqual('');

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    let objString: string | undefined = '';

    objString += 'A->B,C,D\n';
    objString += 'B->A,E,F\n';
    objString += 'C->A,D,G\n';
    objString += 'D->A,C,G,H\n';
    objString += 'E->B,I\n';
    objString += 'F->B\n';
    objString += 'G->C,D\n';
    objString += 'H->D\n';
    objString += 'I->E\n';

    expect(graph.toString()).toEqual(objString);

    graph.clear();

    objString = '';
    expect(graph.toString()).toEqual(objString);
  });

  it('returns toString (directed graph: true)', () => {
    const isDirected: boolean = true;

    const graph: Graph = new Graph(isDirected);

    expect(graph.toString()).toEqual('');

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');
    graph.addVertex('H');
    graph.addVertex('I');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');

    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');

    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');

    graph.addEdge('E', 'I');

    let objString: string | undefined = '';

    objString += 'A->B,C,D\n';
    objString += 'B->E,F\n';
    objString += 'C->D,G\n';
    objString += 'D->G,H\n';
    objString += 'E->I\n';
    objString += 'F->\n';
    objString += 'G->\n';
    objString += 'H->\n';
    objString += 'I->\n';

    expect(graph.toString()).toEqual(objString);

    graph.clear();

    objString = '';
    expect(graph.toString()).toEqual(objString);
  });
});
