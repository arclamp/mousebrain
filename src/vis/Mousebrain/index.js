import { select } from 'd3-selection';
import { scaleOrdinal } from 'd3-scale';
import { schemeDark2 } from 'd3-scale-chromatic';
import VisComponent from 'candela/VisComponent';
import LineChart from 'candela/plugins/vega/LineChart';

import template from './index.jade';

class EpochChart extends VisComponent {
  constructor (el, options) {
    super(el);

    // Capture a sorted version of the epoch data.
    this.epochs = [...options.data].sort((a, b) => a.Epoch - b.Epoch);

    // Establish a colormap object.
    this.cmap = scaleOrdinal(schemeDark2);

    // Make the top-level div a flex box.
    select(this.el)
      .style('display', 'flex');
  }

  render () {
    const width = select(this.el)
      .node()
      .getBoundingClientRect()
      .width;

    const frames = this.epochs[this.epochs.length - 1].End;

    let sel = select(this.el)
      .selectAll('div.frac')
      .data(this.epochs);

    sel.enter()
      .append('div')
      .classed('frac', true)
      .merge(sel)
      .style('width', d => `${(d.End - d.Start) * width / frames}px`)
      .style('background', d => this.cmap(d.Epoch));
  }
}

export class Mousebrain extends VisComponent {
  constructor (el, options) {
    super(el);

    const width = options.width || 960;
    const height = options.height || 540;

    select(this.el)
      .html(template());

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

    this.epochDiv = select(this.el)
      .select('div.epoch')
      .node();

    select(this.epochDiv)
      .style('width', `${width}px`)
      .style('height', '30px');

    this.epochVis = new EpochChart(this.epochDiv, {
      data: options.epochData
    });
  }

  render () {
    this.dataVis.render();
    this.epochVis.render();
  }
}
