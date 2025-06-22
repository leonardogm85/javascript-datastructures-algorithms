import { breadthFirstSearchCallback, breadthFirstSearchSorthestPath } from '../../../src/algorithms/graph/breadth-first-search';
import { Dictionary } from '../../../src/data-structures/dictionary';
import { Graph } from '../../../src/data-structures/graph';
import { Stack } from '../../../src/data-structures/stack';
import { Callback, Distances, Predecessors, SorthestPath, Vertex } from '../../../src/models/graph-model';

describe('Algorithms - Graph: Breadth First Search', () => {
  function assertCallback(vertices: Vertex[]): Callback {
    let count: number = 0;

    const callbackFn: Callback = (vertex: Vertex): void => {
      expect(vertex).toEqual(vertices[count++]);
    };

    return callbackFn;
  }

  it('breadthFirstSearch: callback', () => {
    const isDirected: boolean = false;

    const graph: Graph = new Graph(isDirected);

    const vertices: Vertex[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    for (let i: number = 0; i < vertices.length; i++) {
      graph.addVertex(vertices[i]);
    }

    //        A
    //     /  |  \
    //    B   C —— D
    //  /  \   \ / \
    //  E  F    G   H
    //  |
    //  I

    // A - B - C - D - E - F - G - H - I

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

    breadthFirstSearchCallback(graph, vertices[0], assertCallback(vertices));
  });

  it('breadthFirstSearch: sorthest path', () => {
    const isDirected: boolean = false;

    const graph: Graph = new Graph(isDirected);

    const vertices: Vertex[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    for (let i: number = 0; i < vertices.length; i++) {
      graph.addVertex(vertices[i]);
    }

    //        A
    //     /  |  \
    //    B   C —— D
    //  /  \   \ / \
    //  E  F    G   H
    //  |
    //  I

    // A - B - C - D - E - F - G - H - I

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

    const distances: Distances = {
      A: 0,
      B: 1, // A-B (1 edge)
      C: 1, // A-C (1 edge)
      D: 1, // A-D (1 edge)
      E: 2, // A-B-E (2 edge)
      F: 2, // A-B-F (2 edge)
      G: 2, // A-C-G (2 edge)
      H: 2, // A-D-H (2 edge)
      I: 3  // A-B-E-I (3 edge)
    };

    const predecessors: Predecessors = {
      A: undefined,
      B: 'A', // A-B (1 edge)
      C: 'A', // A-C (1 edge)
      D: 'A', // A-D (1 edge)
      E: 'B', // A-B-E (2 edge)
      F: 'B', // A-B-F (2 edge)
      G: 'C', // A-C-G (2 edge)
      H: 'D', // A-D-H (2 edge)
      I: 'E'  // A-B-E-I (3 edge)
    };

    const fromVertex: Vertex = vertices[0];

    const shortestPathA: SorthestPath = breadthFirstSearchSorthestPath(graph, fromVertex);

    expect(shortestPathA.distances).toEqual(distances);
    expect(shortestPathA.predecessors).toEqual(predecessors);

    const dictionary: Dictionary<Vertex, Vertex[]> = new Dictionary<Vertex, Vertex[]>();

    for (let i: number = 1; i < vertices.length; i++) {
      const toVertex: Vertex = vertices[i];

      const path: Stack<Vertex> = new Stack<Vertex>();

      for (let v: Vertex = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]!) {
        path.push(v);
      }

      path.push(fromVertex);

      const array: Vertex[] = [];

      while (!path.isEmpty()) {
        array.push(path.pop()!);
      }

      dictionary.set(toVertex, array);
    }

    //        A
    //     /  |  \
    //    B   C —— D
    //  /  \   \ / \
    //  E  F    G   H
    //  |
    //  I

    // A - B - C - D - E - F - G - H - I

    expect(dictionary.get('B')).toEqual(['A', 'B']); // from A to B
    expect(dictionary.get('C')).toEqual(['A', 'C']); // from A to C
    expect(dictionary.get('D')).toEqual(['A', 'D']); // from A to D
    expect(dictionary.get('E')).toEqual(['A', 'B', 'E']); // from A to E
    expect(dictionary.get('F')).toEqual(['A', 'B', 'F']); // from A to F
    expect(dictionary.get('G')).toEqual(['A', 'C', 'G']); // from A to G
    expect(dictionary.get('H')).toEqual(['A', 'D', 'H']); // from A to H
    expect(dictionary.get('I')).toEqual(['A', 'B', 'E', 'I']); // from A to I
  });
});
