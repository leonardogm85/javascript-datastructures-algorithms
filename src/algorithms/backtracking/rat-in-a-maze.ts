function isSafe(maze: number[][], x: number, y: number, visited: boolean[][]): boolean {
  const n: number = maze.length;

  if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] === 1 && !visited[x][y]) {
    return true;
  }

  return false;
}

function findPath(maze: number[][], x: number, y: number, solution: number[][], visited: boolean[][]): boolean {
  const n: number = maze.length;

  if (x === n - 1 && y === n - 1) {
    solution[x][y] = 1;
    return true;
  }

  if (isSafe(maze, x, y, visited) === true) {
    visited[x][y] = true;
    solution[x][y] = 1;

    if (findPath(maze, x + 1, y, solution, visited)) {
      return true;
    }

    if (findPath(maze, x, y + 1, solution, visited)) {
      return true;
    }

    if (findPath(maze, x - 1, y, solution, visited)) {
      return true;
    }

    if (findPath(maze, x, y - 1, solution, visited)) {
      return true;
    }

    visited[x][y] = false;
    solution[x][y] = 0;
  }

  return false;
}

export function ratInAMaze(maze: number[][]): number[][] | string {
  const solution: number[][] = [];
  const visited: boolean[][] = [];

  for (let i: number = 0; i < maze.length; i++) {
    solution[i] = [];
    visited[i] = [];

    for (let j: number = 0; j < maze[i].length; j++) {
      solution[i][j] = 0;
      visited[i][j] = false;
    }
  }

  if (findPath(maze, 0, 0, solution, visited) === true) {
    return solution;
  } else {
    return 'NO PATH FOUND';
  }
}
