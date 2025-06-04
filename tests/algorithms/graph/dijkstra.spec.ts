import { dijkstra } from '../../../src/algorithms/graph/dijkstra';

describe('Algorithm of Dijkstra', () => {
  it('Shortest Path', () => {

    //     A B C D E F
    //  A  0 2 4 0 0 0
    //  B  0 0 2 4 2 0
    //  C  0 0 0 0 3 0
    //  D  0 0 0 0 0 2
    //  E  0 0 0 3 0 2
    //  F  0 0 0 0 0 0

    // Source: A -> Shortest Path

    //  Vertex  Distance
    //  A       0 (A)
    //  B       2 (A, B)
    //  C       4 (A, C)
    //  D       6 (A, B, D)
    //  E       4 (A, B, E)
    //  F       6 (A, B, E, F)

    const graph: number[][] = [
      [0, 2, 4, 0, 0, 0],
      [0, 0, 2, 4, 2, 0],
      [0, 0, 0, 0, 3, 0],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 0, 3, 0, 2],
      [0, 0, 0, 0, 0, 0]
    ];

    expect(dijkstra(graph, 0)).toEqual([0, 2, 4, 6, 4, 6]);
  });
});
