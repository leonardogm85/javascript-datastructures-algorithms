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
