import { select } from 'd3-selection';
import { scaleOrdinal } from 'd3-scale';
import { schemeDark2 } from 'd3-scale-chromatic';
import VisComponent from 'candela/VisComponent';
import LineChart from 'candela/plugins/vega/LineChart';

import template from './index.jade';

function clamp(val, low, high) {
  return val < low ? low : (val > high ? high : val);
}

class EpochChart extends VisComponent {
  constructor (el, options) {
    super(el);

    // Capture a sorted version of the epoch data.
    this.epochs = [...options.data].sort((a, b) => a.Epoch - b.Epoch);
    this.frames = this.epochs[this.epochs.length - 1].End;

    // Establish a colormap object.
    this.cmap = scaleOrdinal(schemeDark2);

    // Make the top-level div a flex box.
    select(this.el)
      .style('display', 'flex');

    // Initialize drilldown marker.
    this.drilldown = 0;
  }

  render () {
    const width = select(this.el)
      .node()
      .getBoundingClientRect()
      .width;


    let sel = select(this.el)
      .selectAll('div.frac')
      .data(this.epochs);

    sel.enter()
      .append('div')
      .classed('frac', true)
      .merge(sel)
      .style('width', d => `${(d.End - d.Start) * width / this.frames}px`)
      .style('background', d => this.cmap(d.Epoch));

    sel = select(this.el)
      .selectAll('div.marker')
      .data([this.drilldown]);

    sel.enter()
      .append('div')
      .classed('marker', true)
      .style('position', 'relative')
      .style('height', '30px')
      .style('width', '2px')
      .style('background', 'black')
      .merge(sel)
      .style('left', d => `${(d - this.frames) * width / this.frames}px`);
  }

  setDrilldown (frame) {
    this.drilldown = clamp(frame, 0, this.frames);
  }
}

export class Mousebrain extends VisComponent {
  constructor (el, options) {
    super(el);

    const width = options.width || 960;
    const height = options.height || 540;

    select(this.el)
      .html(template());

    // Initialize the data display.
    const dataDiv = select(this.el)
      .select('div.data')
      .node();

    this.dataVis = new LineChart(dataDiv, {
      data: options.channelData,
      x: 'Frame',
      y: 'Cell 0',
      width,
      height: height - 30
    });

    // Initialize the epoch display.
    this.epochDiv = select(this.el)
      .select('div.epoch')
      .node();

    select(this.epochDiv)
      .style('width', `${width}px`)
      .style('height', '30px');

    this.epochVis = new EpochChart(this.epochDiv, {
      data: options.epochData
    });

    // Initialize the drilldown marker.
    this.drilldown = 0;
  }

  render () {
    this.dataVis.render();
    this.epochVis.render();
  }

  setDrilldown (frame) {
    this.drilldown = frame;

    this.epochVis.setDrilldown(frame);
  }
}
