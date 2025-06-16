import { binarySearch } from '../../../src/algorithms/search/binary-search';
import { CustomFunction } from '../../../src/util';
import { searchAlgorithmTests } from './search-algorithm-tests';

searchAlgorithmTests(binarySearch, 'Binary Search', { customFunction: CustomFunction.COMPARE });
