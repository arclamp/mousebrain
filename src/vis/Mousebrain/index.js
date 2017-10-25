import { select } from 'd3-selection';
import VisComponent from 'candela/VisComponent';
import BoxPlot from 'candela/plugins/vega/BoxPlot';
import LineChart from 'candela/plugins/vega/LineChart';

import template from './index.jade';

export class Mousebrain extends VisComponent {
  constructor (el, options) {
    super(el, options);

    const width = options.width || 960;
    const height = options.height || 540;

    select(this.el)
      .html(template());

    const dataDiv = select(this.el)
      .select('div.data')
      .node();

    console.log('width', width);
    console.log('height', height);

    this.dataVis = new LineChart(dataDiv, {
      data: options.data,
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
      .style('height', '30px')
      .style('background', 'darkslategray');
  }

  render () {
    this.dataVis.render();
  }
}
