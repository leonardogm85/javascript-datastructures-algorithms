import { radixSort } from '../../../src/algorithms/sorting/radix-sort';
import { sortAlgorithmTests } from './sort-algorithm-tests';

sortAlgorithmTests(radixSort, 'Algorithms - Sorting: Radix Sort', { reverseCompare: false });
