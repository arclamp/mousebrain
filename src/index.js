import Papa from 'papaparse';
import candela from 'candela';
import 'candela/plugins/vega/load';

import { MouseBrain } from './vis/mousebrain';

import testDataRaw from '../data/test.csv';

function zip (x, y) {
  if (x.length !== y.length) {
    console.log('x', x);
    console.log('y', y);

    throw new Error('arguments to zip() must have matching lengths');
  }

  let o = {};
  for (let i = 0; i < x.length; i++) {
    o[x[i]] = y[i];
  }

  return o;
}

function fuse (table) {
  const headers = table[0];
  return table.slice(1).map(row => zip(headers, row));
}

const testData = Papa.parse(testDataRaw, {
  dynamicTyping: true,
  skipEmptyLines: true
});
console.log('testData', testData);

const fusedTestData = fuse(testData.data);
console.log('fused testData', fusedTestData);

const vis = new candela.components.LineChart(document.body, {
  data: fusedTestData.slice(100),
  x: 'Frame',
  y: 'Cell 0',
  width: 960,
  height: 540
});
vis.render();
