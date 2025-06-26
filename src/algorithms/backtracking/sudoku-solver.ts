const BOX_SIZE: number = 3;

const UNASSIGNED: number = 0;

function usedInRow(grid: number[][], row: number, num: number): boolean {
  for (let col: number = 0; col < grid.length; col++) {
    if (grid[row][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInCol(grid: number[][], col: number, num: number): boolean {
  for (let row: number = 0; row < grid.length; row++) {
    if (grid[row][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInBox(grid: number[][], boxStartRow: number, boxStartCol: number, num: number): boolean {
  for (let row: number = 0; row < BOX_SIZE; row++) {
    for (let col: number = 0; col < BOX_SIZE; col++) {
      if (grid[row + boxStartRow][col + boxStartCol] === num) {
        return true;
      }
    }
  }
  return false;
}

function isSafe(grid: number[][], row: number, col: number, num: number): boolean {
  return (
    !usedInRow(grid, row, num)
    &&
    !usedInCol(grid, col, num)
    &&
    !usedInBox(grid, row - row % BOX_SIZE, col - col % BOX_SIZE, num)
  );
}

function solveSudoku(grid: number[][]): boolean {
  let row: number = 0;
  let col: number = 0;

  let checkBlankSpaces: boolean = false;

  for (row = 0; row < grid.length; row++) {
    for (col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === UNASSIGNED) {
        checkBlankSpaces = true;
        break;
      }
    }

    if (checkBlankSpaces) {
      break;
    }
  }

  if (!checkBlankSpaces) {
    return true;
  }

  for (let num: number = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;

      if (solveSudoku(grid)) {
        return true;
      }

      grid[row][col] = UNASSIGNED;
    }
  }

  return false;
}

export function sudokuSolver(grid: number[][]): number[][] | string {
  if (solveSudoku(grid)) {
    return grid;
  }

  return 'NO SOLUTION EXISTS';
}
