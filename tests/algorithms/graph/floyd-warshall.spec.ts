import { floydWarshall } from '../../../src/algorithms/graph/floyd-warshall';

describe('Algorithm of Floyd-Warshall', () => {
  it('All-Pairs Shortest Path', () => {
    const i: number = Infinity;

    let graph: number[][] | undefined;

    // Path  Distance
    //
    // A-A   0 (A)
    // A-B   2 (A, B)
    // A-C   4 (A, C) OU (A, B, C)
    // A-D   6 (A, B, D)
    // A-E   4 (A, B, E)
    // A-F   6 (A, B, E, F)
    //
    // B-A   I
    // B-B   0 (B)
    // B-C   2 (B, C)
    // B-D   4 (B, D)
    // B-E   2 (B, E)
    // B-F   4 (B, E, F)
    //
    // C-A   I
    // C-B   I
    // C-C   0 (C)
    // C-D   6 (C, E, D)
    // C-E   3 (C, E)
    // C-F   5 (C, E, F)
    //
    // D-A   I
    // D-B   I
    // D-C   I
    // D-D   0 (D)
    // D-E   I
    // D-F   2 (D, F)
    //
    // E-A   I
    // E-B   I
    // E-C   I
    // E-D   3 (E, D)
    // E-E   0 (E)
    // E-F   2 (E, F)
    //
    // F-A   I
    // F-B   I
    // F-C   I
    // F-D   I
    // F-E   I
    // F-F   0 (F)

    //                       *                   *                   *                   *                   *                   *
    //     A B C D E F       A B C D E F       A B C D E F       A B C D E F       A B C D E F       A B C D E F       A B C D E F
    //  A  0 2 4 i i i    A  0 2 4 i i i    A  0 2 4 6 4 i    A  0 2 4 6 4 i    A  0 2 4 6 4 8    A  0 2 4 6 4 6    A  0 2 4 6 4 6
    //  B  i 0 2 4 2 i    B  i 0 2 4 2 i    B  i 0 2 4 2 i    B  i 0 2 4 2 i    B  i 0 2 4 2 6    B  i 0 2 4 2 4    B  i 0 2 4 2 4
    //  C  i i 0 i 3 i    C  i i 0 i 3 i    C  i i 0 i 3 i    C  i i 0 i 3 i    C  i i 0 i 3 i    C  i i 0 6 3 5    C  i i 0 6 3 5
    //  D  i i i 0 i 2    D  i i i 0 i 2    D  i i i 0 i 2    D  i i i 0 i 2    D  i i i 0 i 2    D  i i i 0 i 2    D  i i i 0 i 2
    //  E  i i i 3 0 2    E  i i i 3 0 2    E  i i i 3 0 2    E  i i i 3 0 2    E  i i i 3 0 2    E  i i i 3 0 2    E  i i i 3 0 2
    //  F  i i i i i 0    F  i i i i i 0    F  i i i i i 0    F  i i i i i 0    F  i i i i i 0    F  i i i i i 0    F  i i i i i 0

    graph = [
      [i, 2, 4, i, i, i],
      [i, i, 2, 4, 2, i],
      [i, i, i, i, 3, i],
      [i, i, i, i, i, 2],
      [i, i, i, 3, i, 2],
      [i, i, i, i, i, i]
    ];

    expect(floydWarshall(graph)).toEqual([
      [0, 2, 4, 6, 4, 6],
      [i, 0, 2, 4, 2, 4],
      [i, i, 0, 6, 3, 5],
      [i, i, i, 0, i, 2],
      [i, i, i, 3, 0, 2],
      [i, i, i, i, i, 0]
    ]);

    //        A
    //    1↙    ↘8
    //  D  4↑  2→  B
    //    9↘    ↙1
    //        C

    // Path  Distance
    //
    // A-A   0 (A)
    // A-B   3 (A, D, B)
    // A-C   4 (A, D, B, C)
    // A-D   1 (A, D)
    //
    // B-A   5 (B, C, A)
    // B-B   0 (B)
    // B-C   1 (B, C)
    // B-D   6 (B, C, A, D)
    //
    // C-A   4 (C, A)
    // C-B   7 (C, A, D, B)
    // C-C   0 (C)
    // C-D   5 (C, A, D)
    //
    // D-A   7 (D, B, C, A)
    // D-B   2 (D, B)
    // D-C   0 (D, B, C)
    // D-D   0 (D)

    //                   *                 *                *               *
    //     A B C D       A  B C D       A  B C D       A  B C D       A B C D
    //  A  0 8 i 1    A  0  8 i 1    A  0  8 9 1    A  0  8 9 1    A  0 3 4 1
    //  B  i 0 1 i    B  i  0 1 i    B  i  0 1 i    B  5  0 1 6    B  5 0 1 6
    //  C  4 i 0 i    C  4 12 0 5    C  4 12 0 5    C  4 12 0 5    C  4 7 0 5
    //  D  i 2 9 0    D  i  2 9 0    D  i  2 3 0    D  7  2 3 0    D  7 2 3 0

    graph = [
      [i, 8, i, 1],
      [i, i, 1, i],
      [4, i, i, i],
      [i, 2, 9, i]
    ];

    expect(floydWarshall(graph)).toEqual([
      [0, 3, 4, 1],
      [5, 0, 1, 6],
      [4, 7, 0, 5],
      [7, 2, 3, 0]
    ]);

    //       B
    //    3↗  ↘5
    //  A   8←   D
    //    4↘  ↗3
    //       C

    // Path  Distance
    //
    // A-A    0 (A)
    // A-B    3 (A, B)
    // A-C    4 (A, C)
    // A-D    7 (A, C, D)
    //
    // B-A   13 (B, D, A)
    // B-B    0 (B)
    // B-C   17 (B, D, A, C)
    // B-D    5 (B, D)
    //
    // C-A   11 (C, D, A)
    // C-B   14 (C, D, A, B)
    // C-C    0 (C)
    // C-D    3 (C, D)
    //
    // D-A    8 (D, A)
    // D-B   11 (D, A, B)
    // D-C   12 (D, A, C)
    // D-D    0 (D)

    //                   *                  *                  *                  *
    //     A B C D       A  B  C D       A  B  C D       A  B  C D        A  B  C D
    //  A  0 3 4 i    A  0  3  4 i    A  0  3  4 8    A  0  3  4 7    A   0  3  4 7
    //  B  i 0 i 5    B  i  0  i 5    B  i  0  i 5    B  i  0  i 5    B  13  0 17 5
    //  C  i i 0 3    C  i  i  0 3    C  i  i  0 3    C  i  i  0 3    C  11 14  0 3
    //  D  8 i i 0    D  8 11 12 0    D  8 11 12 0    D  8 11 12 0    D   8 11 12 0

    graph = [
      [i, 3, 4, i],
      [i, i, i, 5],
      [i, i, i, 3],
      [8, i, i, i]
    ];

    expect(floydWarshall(graph)).toEqual([
      [0, 3, 4, 7],
      [13, 0, 17, 5],
      [11, 14, 0, 3],
      [8, 11, 12, 0]
    ]);
  });
});
