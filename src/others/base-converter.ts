import { Stack } from '../data-structures/stack';

export function decimalToBinary(decimal: number): string {
  const stack: Stack<number> = new Stack<number>();

  let binaryNumber: number = 0;
  let binaryString: string = '';

  let nextNumber: number = decimal;

  while (nextNumber > 0) {
    binaryNumber = Math.floor(nextNumber % 2);
    nextNumber = Math.floor(nextNumber / 2);
    stack.push(binaryNumber);
  }

  while (!stack.isEmpty()) {
    binaryString += stack.pop();
  }

  return binaryString;
}

export function baseConverter(decimal: number, base: number): string {
  const stack: Stack<number> = new Stack<number>();

  const digits: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let baseNumber: number = 0;
  let baseString: string = '';

  let nextNumber: number = decimal;

  if (base < 2 || base > 36) {
    return '';
  }

  while (nextNumber > 0) {
    baseNumber = Math.floor(nextNumber % base);
    nextNumber = Math.floor(nextNumber / base);
    stack.push(baseNumber);
  }

  while (!stack.isEmpty()) {
    baseString += digits.at(stack.pop()!)!;
  }

  return baseString;
}
