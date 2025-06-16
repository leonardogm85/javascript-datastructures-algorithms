import { recursiveBinarySearch } from '../../../src/algorithms/search/recursive-binary-search';
import { CustomFunction } from '../../../src/util';
import { searchAlgorithmTests } from './search-algorithm-tests';

searchAlgorithmTests(recursiveBinarySearch, 'Recursive Binary Search', { customFunction: CustomFunction.COMPARE });
