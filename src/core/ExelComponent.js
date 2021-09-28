import {DomEventListener} from '@core/DomEventListener';

export class ExelComponent extends DomEventListener {
  constructor($root, options={}) {
    super($root, options.listeners, options.name);
    this.emitter = options.emitter
    this.subscribers = options.subscribers || []
    this.store = options.store
    this.unsubs = []
    this.prepare()
  }
  toHTML() {
    return ''
  }
  prepare() {

  }
  storeChanged(changes) {

  }
  isWatching(key) {
    return this.subscribers.includes(key)
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubs.push(unsub)
  }
  $dispatch(action) {
    this.store.dispatch(action)
  }
  $subscribe(fn) {
    this.sub = this.store.subscribe(fn)
  }
  init() {
    this.initEventListeners()

  }
  destroy() {
    this.removeEventListeners();
    this.unsubs.forEach(unsub=>unsub());
    this.sub.unsubscribe()
  }
}
