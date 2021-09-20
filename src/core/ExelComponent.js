import {DomEventListener} from '@core/DomEventListener';

export class ExelComponent extends DomEventListener {
  constructor($root, options={}) {
    super($root, options.listeners, options.name);
  }
  toHTML() {
    return ''
  }
  init() {
    this.initEventListeners()
  }
  destroy() {
    this.removeEventListeners()
  }
}
