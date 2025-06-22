import { depthFirstSearchCallback, depthFirstSearchTopologicalSort } from '../../../src/algorithms/graph/depth-first-search';
import { Graph } from '../../../src/data-structures/graph';
import { Callback, Discovery, Finished, Predecessors, TopologicalSort, Vertex } from '../../../src/models/graph-model';

describe('Algorithms - Graph: Depth First Search', () => {
  function assertCallback(vertices: Vertex[]): Callback {
    let count: number = 0;

    const callbackFn: Callback = (vertex: Vertex): void => {
      expect(vertex).toEqual(vertices[count++]);
    };

    return callbackFn;
  }

  it('depthFirstSearch: callback', () => {
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

    // A - B - E - I - I - E - F - F - B - C - D - G - G - H - H - D - C - A

    // A: 1/18
    // B: 2/9
    // E: 3/6
    // I: 4/5
    // F: 7/8
    // C: 10/17
    // D: 11/16
    // G: 12/13
    // H: 14/15

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

    const visited: Vertex[] = ['A', 'B', 'E', 'I', 'F', 'C', 'D', 'G', 'H'];

    depthFirstSearchCallback(graph, assertCallback(visited));
  });

  it('depthFirstSearch: topological sort', () => {
    const isDirected: boolean = true;

    const graph: Graph = new Graph(isDirected);

    const vertices: Vertex[] = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (let i: number = 0; i < vertices.length; i++) {
      graph.addVertex(vertices[i]);
    }

    //          A    B
    //        ↙  ↘↙  ↘
    //        C   D   E
    //         ↘    ↗
    //            F

    // A - C - F - E - E - F - C - D - D - A - B - B

    // A: 1/10
    // C: 2/7
    // F: 3/6
    // E: 4/5
    // D: 8:9
    // B: 11/12

    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');

    graph.addEdge('B', 'D');
    graph.addEdge('B', 'E');

    graph.addEdge('C', 'F');

    graph.addEdge('F', 'E');

    const discovery: Discovery = {
      A: 1,
      B: 11,
      C: 2,
      D: 8,
      E: 4,
      F: 3
    };

    const finished: Finished = {
      A: 10,
      B: 12,
      C: 7,
      D: 9,
      E: 5,
      F: 6
    };

    const predecessors: Predecessors = {
      A: undefined,
      B: undefined,
      C: 'A',
      D: 'A',
      E: 'F',
      F: 'C'
    };

    const topologicalSort: TopologicalSort = depthFirstSearchTopologicalSort(graph);

    expect(topologicalSort.discovery).toEqual(discovery);
    expect(topologicalSort.finished).toEqual(finished);
    expect(topologicalSort.predecessors).toEqual(predecessors);

    const newFinished: Finished = { ...finished };

    const descendingOrder: Vertex[] = [];

    for (let i: number = 0; i < vertices.length; i++) {
      let lastVertex: Vertex | undefined = undefined;
      let lastIndex: number = 0;

      for (let j: number = 0; j < vertices.length; j++) {
        const currentVertex: Vertex = vertices[j];
        const currentIndex: number = newFinished[currentVertex];

        if (currentIndex > lastIndex) {
          lastIndex = currentIndex;
          lastVertex = currentVertex;
        }
      }

      descendingOrder[i] = lastVertex!;

      delete newFinished[lastVertex!];
    }

    const expectedOrder: Vertex[] = [
      'B',
      'A',
      'D',
      'C',
      'F',
      'E'
    ];

    expect(descendingOrder).toEqual(expectedOrder);
  });
});
