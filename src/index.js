import Papa from 'papaparse';

import { MouseBrain } from './vis/mousebrain';

import testDataRaw from '../data/test.csv';

const testData = Papa.parse(testDataRaw, {
  dynamicTyping: true
});
console.log('testData', testData);

const vis = new MouseBrain(document.body, {
  data: testData
});
vis.render();
