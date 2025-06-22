import { countingSort } from '../../../src/algorithms/sorting/counting-sort';
import { sortAlgorithmTests } from './sort-algorithm-tests';

sortAlgorithmTests(countingSort, 'Algorithms - Sorting: Counting Sort', { reverseCompare: false });
