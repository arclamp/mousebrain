import Papa from 'papaparse';
import { select } from 'd3-selection';

import { Mousebrain } from './vis/Mousebrain';
import { NumberInput } from './util/NumberInput';

import dataRaw from '../data/small-data.csv';
import epochRaw from '../data/small-epoch.csv';
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

function parse (raw) {
  const rows = Papa.parse(raw, {
    dynamicTyping: true,
    skipEmptyLines: true
  });

  return fuse(rows.data);
}

const data = parse(dataRaw);
const epoch = parse(epochRaw);

const mbDiv = select('div.mousebrain').node();
const vis = new Mousebrain(mbDiv, {
  channelData: data,
  epochData: epoch,
  width: 960,
  height: 540
});
vis.render();

const frameDiv = select('div.frame').node();
const frameInput = new NumberInput(frameDiv, {
  frames: data.length
});

frameInput.on('frame', f => {
  vis.setDrilldown(f);
  vis.render();
});

window.drill = (x) => {
  vis.setDrilldown(x);
  vis.render();
};
