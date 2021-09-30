import {DomEventListener} from '@core/DomEventListener';
import {lastSeen} from "@/redux/actions";

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

  init() {
    this.initEventListeners()

  }
  destroy() {
    const date = Date.now()
    this.$dispatch(lastSeen(date))
    this.removeEventListeners();
    this.unsubs.forEach(unsub=>unsub());
  }
}
