import Papa from 'papaparse';
import { select } from 'd3-selection';

import { Mousebrain } from './vis/Mousebrain';

import testDataRaw from '../data/test.csv';
import content from './index.jade';

select(document.body)
  .html(content());

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

const mbDiv = select('div.mousebrain').node();

const vis = new Mousebrain(mbDiv, {
  data: fusedTestData,
  width: 960,
  height: 540
});
vis.render();
