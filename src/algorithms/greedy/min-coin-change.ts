export function minCoinChange(coins: number[], amount: number): number[] {
  const change: number[] = [];

  let total: number = 0;

  for (let i: number = coins.length; i >= 0; i--) {
    const coin: number = coins[i];

    while (total + coin <= amount) {
      change.push(coin);
      total += coin;
    }
  }

  return change;
}
