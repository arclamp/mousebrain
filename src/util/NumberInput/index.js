import { select } from 'd3-selection';
import Events from 'candela/plugins/mixin/Events';
import VisComponent from 'candela/VisComponent';

import content from './index.jade';

export class NumberInput extends Events(VisComponent) {
  constructor (el, options) {
    super(el);

    select(this.el)
      .html(content({
        frames: options.frames
      }));

    this.input = select(this.el)
      .select('input');

    this.input.on('change', () => {
      this.emit('frame', window.parseInt(this.input.property('value')));
    });
  }

  render () {}

  setValue (v) {
    this.input.property('value', v);
  }
}
