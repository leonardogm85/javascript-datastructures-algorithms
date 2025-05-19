import { Stack } from '../data-structures/stack';
import { TowerOfHanoiModel, TowerOfHanoiPartial, TowerOfHanoiProperty } from '../models/tower-of-hanoi-model';

function towerOfHanoi(
  plates: number,
  source: Stack<number>,
  helper: Stack<number>,
  dest: Stack<number>,
  sourceName: TowerOfHanoiProperty,
  helperName: TowerOfHanoiProperty,
  destName: TowerOfHanoiProperty,
  moves: TowerOfHanoiModel[] = []
): TowerOfHanoiModel[] {
  if (plates <= 0) {
    return moves;
  }

  if (plates === 1) {
    dest.push(source.pop()!);
    const move: TowerOfHanoiPartial = {};
    move[sourceName] = source.toString();
    move[helperName] = helper.toString();
    move[destName] = dest.toString();
    moves.push(move as TowerOfHanoiModel);
  } else {
    towerOfHanoi(plates - 1, source, dest, helper, sourceName, destName, helperName, moves);
    dest.push(source.pop()!);
    const move: TowerOfHanoiPartial = {};
    move[sourceName] = source.toString();
    move[helperName] = helper.toString();
    move[destName] = dest.toString();
    moves.push(move as TowerOfHanoiModel);
    towerOfHanoi(plates - 1, helper, source, dest, helperName, sourceName, destName, moves);
  }

  return moves;
}

export function towerOfHanoiStack(plates: number): TowerOfHanoiModel[] {
  const source: Stack<number> = new Stack<number>();
  const dest: Stack<number> = new Stack<number>();
  const helper: Stack<number> = new Stack<number>();

  for (let i: number = plates; i > 0; i--) {
    source.push(i);
  }

  return towerOfHanoi(plates, source, helper, dest, 'source', 'helper', 'dest');
}

export function towerOfHanoiRecursive(plates: number, source: string, helper: string, dest: string, moves: string[][] = []): string[][] {
  if (plates <= 0) {
    return moves;
  }

  if (plates === 1) {
    moves.push([source, helper, dest]);
  } else {
    towerOfHanoiRecursive(plates - 1, source, dest, helper, moves);
    moves.push([source, helper, dest]);
    towerOfHanoiRecursive(plates - 1, helper, source, dest, moves);
  }

  return moves;
}
