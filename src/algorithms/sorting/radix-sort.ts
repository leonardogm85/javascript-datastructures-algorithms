function countingSortForRadix(array: number[], radixBase: number, significantDigit: number, minValue: number): number[] {
  let bucketsIndex: number = 0;
  const buckets: number[] = [];
  const aux: number[] = [];

  for (let i: number = 0; i < radixBase; i++) {
    buckets[i] = 0;
  }

  for (let i: number = 0; i < array.length; i++) {
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
    buckets[bucketsIndex]++;
  }

  for (let i: number = 1; i < radixBase; i++) {
    buckets[i] += buckets[i - 1];
  }

  for (let i: number = array.length - 1; i >= 0; i--) {
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
    aux[--buckets[bucketsIndex]] = array[i];
  }

  for (let i: number = 0; i < array.length; i++) {
    array[i] = aux[i];
  }

  return array;
};

export function radixSort(array: number[], radixBase: number = 10): number[] {
  if (array.length < 2) {
    return array;
  }

  let minValue: number = array[0];
  let maxValue: number = array[0];

  for (let i: number = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }

  let significantDigit: number = 1;

  while ((maxValue - minValue) / significantDigit >= 1) {
    array = countingSortForRadix(array, radixBase, significantDigit, minValue);
    significantDigit *= radixBase;
  }

  return array;
}
