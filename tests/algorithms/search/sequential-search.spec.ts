import { sequentialSearch } from '../../../src/algorithms/search/sequential-search';
import { CustomFunction } from '../../../src/util';
import { searchAlgorithmTests } from './search-algorithm-tests';

searchAlgorithmTests(sequentialSearch, 'Algorithms - Search: Sequential Search', { customFunction: CustomFunction.EQUALS });
