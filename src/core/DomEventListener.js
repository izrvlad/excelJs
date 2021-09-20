import {capitalize} from "@core/utils";

export class DomEventListener {
  constructor($root, listeners,name) {
    if (!$root) {
      throw new Error('$root element is not declared')
    }
    this.$root = $root;
    this.listeners = listeners;
    this.name = name;
  }

  initEventListeners() {
    this.listeners.forEach(listener=> {
      const method = getMethod(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not defined in ${name}`)
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method].bind(this))
    })
  }
  removeEventListeners() {
    this.listeners.forEach(listener=> {
      const method = getMethod(listener);
      if (!this[method]) {
        return
      }
      this.$root.remove(listener, this[method])
    })
  }
}
function getMethod(type) {
  return 'on' + capitalize(type)
}