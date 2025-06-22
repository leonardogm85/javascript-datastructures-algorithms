import { recursiveBinarySearch } from '../../../src/algorithms/search/recursive-binary-search';
import { CustomFunction } from '../../../src/util';
import { searchAlgorithmTests } from './search-algorithm-tests';

searchAlgorithmTests(recursiveBinarySearch, 'Algorithms - Search: Recursive Binary Search', { customFunction: CustomFunction.COMPARE });
