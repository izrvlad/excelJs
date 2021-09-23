export class Emiter {
  constructor() {
    this.listeners = {}
  }
    
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false
    }
    this.listeners[eventName].forEach((fn)=>fn(...args))
    return true
  }
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
    return ()=>{
      this.listeners[eventName] =
          this.listeners[eventName]
              .filter((func)=>func !== fn)
    }
  }
}
