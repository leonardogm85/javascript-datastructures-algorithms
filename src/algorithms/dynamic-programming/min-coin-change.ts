function makeChange(coins: number[], amount: number, cache: number[][]): number[] {
  if (amount <= 0) {
    return [];
  }

  if (cache[amount]) {
    return cache[amount];
  }

  let min: number[] = [];

  let newMin: number[] = [];
  let newAmount: number = 0;

  for (let i: number = 0; i < coins.length; i++) {
    const coin: number = coins[i];

    newAmount = amount - coin;

    if (newAmount >= 0) {
      newMin = makeChange(coins, newAmount, cache);
    }

    if (
      newAmount >= 0
      &&
      (newMin.length < min.length - 1 || min.length === 0)
      &&
      (newMin.length > 0 || newAmount === 0)
    ) {
      min = [coin, ...newMin];
    }
  }

  return (cache[amount] = min);
};

export function minCoinChange(coins: number[], amount: number): number[] {
  return makeChange(coins, amount, []);
}
