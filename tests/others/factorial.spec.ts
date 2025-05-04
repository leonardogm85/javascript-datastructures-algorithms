import { factorial, factorialIterative } from "../../src/others/factorial";

describe('Factorial', () => {
  it('Iterative Factorial', () => {
    expect(factorialIterative(-1)).toBeUndefined();
    expect(factorialIterative(0)).toEqual(1);
    expect(factorialIterative(1)).toEqual(1);
    expect(factorialIterative(2)).toEqual(2);
    expect(factorialIterative(3)).toEqual(6);
    expect(factorialIterative(4)).toEqual(24);
    expect(factorialIterative(5)).toEqual(120);
  });

  it('Recursive Factorial', () => {
    expect(factorial(-1)).toBeUndefined();
    expect(factorial(0)).toEqual(1);
    expect(factorial(1)).toEqual(1);
    expect(factorial(2)).toEqual(2);
    expect(factorial(3)).toEqual(6);
    expect(factorial(4)).toEqual(24);
    expect(factorial(5)).toEqual(120);
  });
});
