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

    const input = select(this.el)
      .select('input');

    input.on('change', () => {
      this.emit('frame', window.parseInt(input.property('value')));
    });
  }

  render () {}
}
