import { prim } from '../../../src/algorithms/graph/prim';

describe('Algorithm of Prim', () => {
  it('Minimum Spanning Tree', () => {
    const vertices: string[] = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    let graph: number[][] | undefined;
    let parent: number[] | undefined;
    let count: number | undefined;

    // Vertex  Edge
    //
    // A       A-B=7 (x)
    // A       A-C=8
    //
    // B       B-C=3 (x)
    // B       B-D=5
    //
    // C       C-D=6
    // C       C-E=3 (x)
    //
    // E       E-D=2 (x)
    // E       E-F=2 (x)
    //
    // D       D-F=4

    // A-B(7) B-C(3) C-E(3) E-D(2) E-F(2) = 17

    // 0  1  2  3  4  5
    graph = [
      [0, 7, 8, 0, 0, 0],  // A: -1
      [7, 0, 3, 5, 0, 0],  // B:  0
      [8, 3, 0, 6, 3, 0],  // C:  1
      [0, 5, 6, 0, 2, 4],  // D:  4
      [0, 0, 3, 2, 0, 2],  // E:  2
      [0, 0, 0, 4, 2, 0]   // F:  4
    ];

    parent = prim(graph);

    expect(parent).toEqual([-1, 0, 1, 4, 2, 4]);

    count = 1;
    expect(vertices[parent[count]]).toEqual('A'); // Vertex Parent
    expect(vertices[count]).toEqual('B'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(7); // Edge Weight

    count++;
    expect(vertices[parent[count]]).toEqual('B'); // Vertex Parent
    expect(vertices[count]).toEqual('C'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(3); // Edge Weight

    count++;
    expect(vertices[parent[count]]).toEqual('E'); // Vertex Parent
    expect(vertices[count]).toEqual('D'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(2); // Edge Weight

    count++;
    expect(vertices[parent[count]]).toEqual('C'); // Vertex Parent
    expect(vertices[count]).toEqual('E'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(3); // Edge Weight

    count++;
    expect(vertices[parent[count]]).toEqual('E'); // Vertex Parent
    expect(vertices[count]).toEqual('F'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(2); // Edge Weight

    // Vertex  Edge
    //
    // A       A-B=2 (x)
    // A       A-C=4
    //
    // B       B-C=2 (x)
    // B       B-D=4
    // B       B-E=2 (x)
    //
    // C       C-E=3
    //
    // E       E-D=3
    // E       E-F=2 (x)
    //
    // F       F-D=2 (x)

    // A-B(2) B-C(2) B-E(2) E-F(2) F-D(2) = 10

    // 0  1  2  3  4  5
    graph = [
      [0, 2, 4, 0, 0, 0],  // A: -1
      [2, 0, 2, 4, 2, 0],  // B:  0
      [4, 2, 0, 0, 3, 0],  // C:  1
      [0, 4, 0, 0, 3, 2],  // D:  5
      [0, 2, 3, 3, 0, 2],  // E:  1
      [0, 0, 0, 2, 2, 0]   // F:  4
    ];

    parent = prim(graph);

    expect(parent).toEqual([-1, 0, 1, 5, 1, 4]);

    count = 1;
    expect(vertices[parent[count]]).toEqual('A'); // Vertex Parent
    expect(vertices[count]).toEqual('B'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(2); // Edge Weight

    count++;
    expect(vertices[parent[count]]).toEqual('B'); // Vertex Parent
    expect(vertices[count]).toEqual('C'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(2); // Edge Weight

    count++;
    expect(vertices[parent[count]]).toEqual('F'); // Vertex Parent
    expect(vertices[count]).toEqual('D'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(2); // Edge Weight

    count++;
    expect(vertices[parent[count]]).toEqual('B'); // Vertex Parent
    expect(vertices[count]).toEqual('E'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(2); // Edge Weight

    count++;
    expect(vertices[parent[count]]).toEqual('E'); // Vertex Parent
    expect(vertices[count]).toEqual('F'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(2); // Edge Weight

    // Vertex  Edge
    //
    // A       A-B=7 (x)
    // A       A-C=8
    //
    // B       B-C=3 (x)
    // B       B-F=5
    //
    // C       C-D=2 (x)
    // C       C-F=6
    //
    // D       D-E=1 (x)
    // D       D-F=5
    //
    // E       E-F=2 (x)
    // E       E-G=5
    //
    // F       F-G=4 (x)

    // A-B(7) B-C(3) C-D(2) D-E(1) E-F(2) F-G(4) = 19

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

    parent = prim(graph);

    expect(parent).toEqual([-1, 0, 1, 2, 3, 4, 5]);

    count = 1;
    expect(vertices[parent[count]]).toEqual('A'); // Vertex Parent
    expect(vertices[count]).toEqual('B'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(7); // Edge Weight

    count++;
    expect(vertices[parent[count]]).toEqual('B'); // Vertex Parent
    expect(vertices[count]).toEqual('C'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(3); // Edge Weight

    count++;
    expect(vertices[parent[count]]).toEqual('C'); // Vertex Parent
    expect(vertices[count]).toEqual('D'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(2); // Edge Weight

    count++;
    expect(vertices[parent[count]]).toEqual('D'); // Vertex Parent
    expect(vertices[count]).toEqual('E'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(1); // Edge Weight

    count++;
    expect(vertices[parent[count]]).toEqual('E'); // Vertex Parent
    expect(vertices[count]).toEqual('F'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(2); // Edge Weight

    count++;
    expect(vertices[parent[count]]).toEqual('F'); // Vertex Parent
    expect(vertices[count]).toEqual('G'); // Current Vertex
    expect(graph[parent[count]][count]).toEqual(4); // Edge Weight
  });
});
