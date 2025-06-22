import { interpolationSearch } from '../../../src/algorithms/search/interpolation-search';
import { CustomFunction } from '../../../src/util';
import { searchAlgorithmTests } from './search-algorithm-tests';

searchAlgorithmTests(interpolationSearch, 'Algorithms - Search: Interpolation Search', { customFunction: CustomFunction.COMPARE });
