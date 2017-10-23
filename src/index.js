import Papa from 'papaparse';

import testDataRaw from '../data/test.csv';

const testData = Papa.parse(testDataRaw, {
  dynamicTyping: true
});
console.log('testData', testData);
