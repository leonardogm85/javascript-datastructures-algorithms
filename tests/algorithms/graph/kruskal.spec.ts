import { kruskal } from '../../../src/algorithms/graph/kruskal';

describe('Kruskal', () => {
  it('Minimum Spanning Tree', () => {
    const vertices: string[] = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    let graph: number[][] | undefined;
    let edges: number[][] | undefined;
    let count: number | undefined;

    let receivedTotal: number | undefined;
    let expectedTotal: number | undefined;

    // Edge
    // D-E=2 (x)
    // E-F=2 (x)
    // B-C=3 (x)
    // C-E=3 (x)
    // D-F=4
    // B-D=5
    // C-D=6
    // A-B=7 (x)
    // A-C=8

    // D-E(2) E-F(2) B-C(3) C-E(3) A-B(7) = 17

    // 0  1  2  3  4  5
    graph = [
      [0, 7, 8, 0, 0, 0],  // A: -1
      [7, 0, 3, 5, 0, 0],  // B:  0
      [8, 3, 0, 6, 3, 0],  // C:  1
      [0, 5, 6, 0, 2, 4],  // D:  4
      [0, 0, 3, 2, 0, 2],  // E:  2
      [0, 0, 0, 4, 2, 0]   // F:  4
    ];

    edges = kruskal(graph);

    expect(edges).toEqual([
      [3, 4, 2],
      [4, 5, 2],
      [1, 2, 3],
      [2, 4, 3],
      [0, 1, 7]
    ]);

    count = 0;
    expect(vertices[edges[count][0]]).toEqual('D');
    expect(vertices[edges[count][1]]).toEqual('E');
    expect(edges[count][2]).toEqual(2);

    count++;
    expect(vertices[edges[count][0]]).toEqual('E');
    expect(vertices[edges[count][1]]).toEqual('F');
    expect(edges[count][2]).toEqual(2);

    count++;
    expect(vertices[edges[count][0]]).toEqual('B');
    expect(vertices[edges[count][1]]).toEqual('C');
    expect(edges[count][2]).toEqual(3);

    count++;
    expect(vertices[edges[count][0]]).toEqual('C');
    expect(vertices[edges[count][1]]).toEqual('E');
    expect(edges[count][2]).toEqual(3);

    count++;
    expect(vertices[edges[count][0]]).toEqual('A');
    expect(vertices[edges[count][1]]).toEqual('B');
    expect(edges[count][2]).toEqual(7);

    receivedTotal = edges.reduce((total, edge) => total + edge[2], 0);

    expectedTotal = edges.reduce((total, edge) => total + graph![edge[0]][edge[1]], 0);

    expect(receivedTotal).toEqual(expectedTotal);

    // Edge
    // A-B=2 (x)
    // B-C=2 (x)
    // B-E=2 (x)
    // D-F=2 (x)
    // E-F=2 (x)
    // C-E=3
    // D-E=3
    // A-C=4
    // B-D=4

    // A-B(2) B-C(2) B-E(2) D-F(2) E-F(2) = 10

    // 0  1  2  3  4  5
    graph = [
      [0, 2, 4, 0, 0, 0],  // A: -1
      [2, 0, 2, 4, 2, 0],  // B:  0
      [4, 2, 0, 0, 3, 0],  // C:  1
      [0, 4, 0, 0, 3, 2],  // D:  4
      [0, 2, 3, 3, 0, 2],  // E:  2
      [0, 0, 0, 2, 2, 0]   // F:  4
    ];

    edges = kruskal(graph);

    expect(edges).toEqual([
      [0, 1, 2],
      [1, 2, 2],
      [1, 4, 2],
      [3, 5, 2],
      [4, 5, 2]
    ]);

    count = 0;
    expect(vertices[edges[count][0]]).toEqual('A');
    expect(vertices[edges[count][1]]).toEqual('B');
    expect(edges[count][2]).toEqual(2);

    count++;
    expect(vertices[edges[count][0]]).toEqual('B');
    expect(vertices[edges[count][1]]).toEqual('C');
    expect(edges[count][2]).toEqual(2);

    count++;
    expect(vertices[edges[count][0]]).toEqual('B');
    expect(vertices[edges[count][1]]).toEqual('E');
    expect(edges[count][2]).toEqual(2);

    count++;
    expect(vertices[edges[count][0]]).toEqual('D');
    expect(vertices[edges[count][1]]).toEqual('F');
    expect(edges[count][2]).toEqual(2);

    count++;
    expect(vertices[edges[count][0]]).toEqual('E');
    expect(vertices[edges[count][1]]).toEqual('F');
    expect(edges[count][2]).toEqual(2);

    receivedTotal = edges.reduce((total, edge) => total + edge[2], 0);

    expectedTotal = edges.reduce((total, edge) => total + graph![edge[0]][edge[1]], 0);

    expect(receivedTotal).toEqual(expectedTotal);

    // Edge
    // D-E=1 (x)
    // C-D=2 (x)
    // E-F=2 (x)
    // B-C=3 (x)
    // F-G=4 (x)
    // B-F=5
    // D-F=5
    // E-G=5
    // C-F=6
    // A-B=7 (x)
    // A-C=8

    // D-E(1) C-D(2) E-F(2) B-C(3) F-G(4) A-B(7) = 19

    // 0  1  2  3  4  5  6
    graph = [
      [0, 7, 8, 0, 0, 0, 0],  // A: -1
      [7, 0, 3, 0, 0, 5, 0],  // B:  0
      [8, 3, 0, 2, 0, 6, 0],  // C:  1
      [0, 0, 2, 0, 1, 5, 0],  // D:  2
      [0, 0, 0, 1, 0, 2, 5],  // E:  3
      [0, 5, 6, 5, 2, 0, 4],  // F:  3
      [0, 0, 0, 0, 5, 4, 0]   // G:  5
    ];

    edges = kruskal(graph);

    expect(edges).toEqual([
      [3, 4, 1],
      [2, 3, 2],
      [4, 5, 2],
      [1, 2, 3],
      [5, 6, 4],
      [0, 1, 7]
    ]);

    count = 0;
    expect(vertices[edges[count][0]]).toEqual('D');
    expect(vertices[edges[count][1]]).toEqual('E');
    expect(edges[count][2]).toEqual(1);

    count++;
    expect(vertices[edges[count][0]]).toEqual('C');
    expect(vertices[edges[count][1]]).toEqual('D');
    expect(edges[count][2]).toEqual(2);

    count++;
    expect(vertices[edges[count][0]]).toEqual('E');
    expect(vertices[edges[count][1]]).toEqual('F');
    expect(edges[count][2]).toEqual(2);

    count++;
    expect(vertices[edges[count][0]]).toEqual('B');
    expect(vertices[edges[count][1]]).toEqual('C');
    expect(edges[count][2]).toEqual(3);

    count++;
    expect(vertices[edges[count][0]]).toEqual('F');
    expect(vertices[edges[count][1]]).toEqual('G');
    expect(edges[count][2]).toEqual(4);

    count++;
    expect(vertices[edges[count][0]]).toEqual('A');
    expect(vertices[edges[count][1]]).toEqual('B');
    expect(edges[count][2]).toEqual(7);

    receivedTotal = edges.reduce((total, edge) => total + edge[2], 0);

    expectedTotal = edges.reduce((total, edge) => total + graph![edge[0]][edge[1]], 0);

    expect(receivedTotal).toEqual(expectedTotal);
  });
});
