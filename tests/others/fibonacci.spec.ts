import { fibonacci, fibonacciMemoization, fibonacciIterative, fibonacciIterativeMemoization } from "../../src/others/fibonacci";

describe('Fibonacci', () => {
  it('Fibonacci Iterative', () => {
    expect(fibonacciIterative(-1)).toEqual(0);
    expect(fibonacciIterative(0)).toEqual(0);
    expect(fibonacciIterative(1)).toEqual(1);
    expect(fibonacciIterative(2)).toEqual(1);
    expect(fibonacciIterative(3)).toEqual(2);
    expect(fibonacciIterative(4)).toEqual(3);
  });

  it('Fibonacci Iterative with Memoization', () => {
    expect(fibonacciIterativeMemoization(-1)).toEqual(0);
    expect(fibonacciIterativeMemoization(0)).toEqual(0);
    expect(fibonacciIterativeMemoization(1)).toEqual(1);
    expect(fibonacciIterativeMemoization(2)).toEqual(1);
    expect(fibonacciIterativeMemoization(3)).toEqual(2);
    expect(fibonacciIterativeMemoization(4)).toEqual(3);
  });

  it('Fibonacci Recursive', () => {
    expect(fibonacci(-1)).toEqual(0);
    expect(fibonacci(0)).toEqual(0);
    expect(fibonacci(1)).toEqual(1);
    expect(fibonacci(2)).toEqual(1);
    expect(fibonacci(3)).toEqual(2);
    expect(fibonacci(4)).toEqual(3);
  });

  it('Fibonacci Recursive with Memoization', () => {
    expect(fibonacciMemoization(-1)).toEqual(0);
    expect(fibonacciMemoization(0)).toEqual(0);
    expect(fibonacciMemoization(1)).toEqual(1);
    expect(fibonacciMemoization(2)).toEqual(1);
    expect(fibonacciMemoization(3)).toEqual(2);
    expect(fibonacciMemoization(4)).toEqual(3);
  });
});
