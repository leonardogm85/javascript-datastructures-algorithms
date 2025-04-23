import { Stack } from '../data-structures/stack';

export function parenthesesChecker(symbols: string): boolean {
  const stack: Stack<string> = new Stack<string>();

  const opens: string = '([{';
  const closers: string = ')]}';

  let balanced: boolean = true;
  let index: number = 0;

  let symbol: string | undefined;

  while (index < symbols.length && balanced) {
    symbol = symbols[index];

    if (opens.indexOf(symbol) >= 0) {
      stack.push(symbol);
    } else if (stack.isEmpty() || opens.indexOf(stack.pop()!) !== closers.indexOf(symbol)) {
      balanced = false;
    }

    index++;
  }

  return balanced && stack.isEmpty();
}
