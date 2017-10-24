import { select } from 'd3-selection';
import VisComponent from 'candela/VisComponent';

export class MouseBrain extends VisComponent {
  constructor (el, options) {
    super(el, options);

    this.data = options.data;
  }

  render () {
    const text = JSON.stringify(this.data, null, 2);

    select(this.el)
      .html(`<pre>${text}</pre>`);
  }
}
