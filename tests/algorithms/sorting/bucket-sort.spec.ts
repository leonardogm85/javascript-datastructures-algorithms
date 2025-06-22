import { bucketSort } from '../../../src/algorithms/sorting/bucket-sort';
import { sortAlgorithmTests } from './sort-algorithm-tests';

sortAlgorithmTests(bucketSort, 'Algorithms - Sorting: Bucket Sort', { reverseCompare: false });
