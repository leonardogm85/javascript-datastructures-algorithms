export type IEqualsFunction<T> = (a: T, b: T) => boolean;

export type ICompareFunction<T> = (a: T, b: T) => number;

export type IToStringFunction<T> = (o: T) => string;

export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0
}

export function defaultEquals<T>(a: T, b: T): boolean {
  return a === b;
}

export function defaultCompare<T>(a: T, b: T): number {
  if (a === b) {
    return Compare.EQUALS;
  }

  if (a < b) {
    return Compare.LESS_THAN;
  }

  return Compare.BIGGER_THAN;
}

export function defaultToString<T>(o: T): string {
  if (o === null) {
    return 'NULL';
  }

  if (o === undefined) {
    return 'UNDEFINED';
  }

  return o.toString();
}

export function reverseCompare<T>(compareFn: ICompareFunction<T>): ICompareFunction<T> {
  return (a: T, b: T) => compareFn(b, a);
}

export function swap<T>(array: T[], a: number, b: number) {
  [array[a], array[b]] = [array[b], array[a]];
}

export function isNullOrUndefined<T>(o: T) {
  return o === undefined || o === null;
}

export function isNullOrUndefinedOrWhiteSpace(o: string) {
  return o === undefined || o === null || o === '';
}
