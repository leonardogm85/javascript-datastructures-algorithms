import { countingSort } from '../../../src/algorithms/sorting/counting-sort';
import { sortAlgorithmTests } from './sort-algorithm-tests';

sortAlgorithmTests(countingSort, 'Counting Sort', { reverseCompare: false });
