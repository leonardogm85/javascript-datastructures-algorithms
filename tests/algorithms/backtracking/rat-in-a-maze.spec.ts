import { ratInAMaze } from '../../../src/algorithms/backtracking/rat-in-a-maze';

describe('Algorithms - Backtracking: Rat In A Maze', () => {
  it('Rat In A Maze Solver', () => {
    const noPathFound: string = 'NO PATH FOUND';

    let maze: number[][] | undefined;
    let solution: number[][] | undefined;

    maze = [
      [1, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 1, 0],
      [0, 1, 1, 1]
    ];

    solution = [
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 1]
    ];

    expect(ratInAMaze(maze)).toEqual(solution);

    maze = [
      [1, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 1, 0, 0],
      [1, 1, 1, 1]
    ];

    solution = [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 1]
    ];

    expect(ratInAMaze(maze)).toEqual(solution);

    maze = [
      [1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1],
      [1, 0, 0, 1, 1],
      [1, 0, 0, 1, 0],
      [1, 0, 0, 1, 1]
    ];

    solution = [
      [1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 1]
    ];

    expect(ratInAMaze(maze)).toEqual(solution);

    maze = [
      [1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 1, 0],
      [1, 0, 0, 1, 1]
    ];

    expect(ratInAMaze(maze)).toEqual(noPathFound);
  });
});
