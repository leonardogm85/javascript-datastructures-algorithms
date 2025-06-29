import { minCoinChange } from '../../../src/algorithms/dynamic-programming/min-coin-change';

describe('Algorithms - Dynamic Programming: Min Coin Change', () => {
  it('works with PD approach: 15', () => {
    expect(minCoinChange([1, 5, 10], 15)).toEqual([5, 10]);
  });

  it('works with PD approach: 6', () => {
    expect(minCoinChange([1, 3, 4], 6)).toEqual([3, 3]);
  });

  it('works with amount 0', () => {
    expect(minCoinChange([1, 2, 3], 0)).toEqual([]);
  });

  it('works with amount 1', () => {
    expect(minCoinChange([1, 2, 3], 1)).toEqual([1]);
  });

  it('works with amount 2', () => {
    expect(minCoinChange([1, 2, 3], 2)).toEqual([2]);
  });

  it('works with amount 3', () => {
    expect(minCoinChange([1, 2, 3], 3)).toEqual([3]);
  });

  it('works with amount 4', () => {
    expect(minCoinChange([1, 2, 3], 4)).toEqual([1, 3]);
  });

  it('works with amount 5', () => {
    expect(minCoinChange([1, 2, 3], 5)).toEqual([2, 3]);
  });

  it('works with amount 6', () => {
    expect(minCoinChange([1, 2, 3], 6)).toEqual([3, 3]);
  });

  it('works with amount 7', () => {
    expect(minCoinChange([1, 2, 3], 7)).toEqual([1, 3, 3]);
  });

  it('works with amount 8', () => {
    expect(minCoinChange([1, 2, 3], 8)).toEqual([2, 3, 3]);
  });

  it('works with amount 8', () => {
    expect(minCoinChange([1, 2, 3], 9)).toEqual([3, 3, 3]);
  });
});
