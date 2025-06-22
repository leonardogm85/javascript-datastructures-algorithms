import { dijkstra } from '../../../src/algorithms/graph/dijkstra';

describe('Algorithms - Graph: Dijkstra', () => {
  it('Shortest Path', () => {
    let graph: number[][] | undefined;

    //  Vertex  Distance
    //  A       0 (A)
    //  B       2 (A, B)
    //  C       4 (A, C)
    //  D       6 (A, B, D)
    //  E       4 (A, B, E)
    //  F       6 (A, B, E, F)

    // A  B  C  D  E  F
    graph = [
      [0, 2, 4, 0, 0, 0], //  A
      [0, 0, 2, 4, 2, 0], //  B
      [0, 0, 0, 0, 3, 0], //  C
      [0, 0, 0, 0, 0, 2], //  D
      [0, 0, 0, 3, 0, 2], //  E
      [0, 0, 0, 0, 0, 0]  //  F
    ];

    expect(dijkstra(graph, 0)).toEqual([0, 2, 4, 6, 4, 6]);

    //        A
    //    1↙    ↘8
    //  D  4↑  2→  B
    //    9↘    ↙1
    //        C

    //  Vertex  Distance
    //  A       0 (A)
    //  B       3 (A, D, B)
    //  C       4 (A, D, B, C)
    //  D       1 (A, D)

    // A  B  C  D
    graph = [
      [0, 8, 0, 1], //  A
      [0, 0, 1, 0], //  B
      [4, 0, 0, 0], //  C
      [0, 2, 9, 0]  //  D
    ];

    expect(dijkstra(graph, 0)).toEqual([0, 3, 4, 1]);

    //       B
    //    3↗  ↘5
    //  A   8←   D
    //    4↘  ↗3
    //       C

    //  Vertex  Distance
    //  A       0 (A)
    //  B       3 (A, B)
    //  C       4 (A, C)
    //  D       7 (A, C, D)

    // A  B  C  D
    graph = [
      [0, 3, 4, 0], //  A
      [0, 0, 0, 5], //  B
      [0, 0, 0, 3], //  C
      [8, 0, 0, 0]  //  D
    ];

    expect(dijkstra(graph, 0)).toEqual([0, 3, 4, 7]);
  });
});
