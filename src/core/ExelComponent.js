import {DomEventListener} from '@core/DomEventListener';

export class ExelComponent extends DomEventListener {
  constructor($root, options={}) {
    super($root, options.listeners, options.name);
    this.emitter = options.emitter
    this.unsubs = []
  }
  toHTML() {
    return ''
  }
  prepare() {

  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubs.push(unsub)
  }
  init() {
    this.initEventListeners()
  }
  destroy() {
    this.removeEventListeners();
    this.unsubs.forEach(unsub=>unsub());
  }
}
