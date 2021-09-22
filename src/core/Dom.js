class Dom {
  constructor(element) {
    this.$el = typeof element === 'string' ?
    document.querySelector(element) :
    element;
  }

  Html(html) {
    if (html) {
      this.$el.innerHTML = html;
      return this
    }
    return this.$el.outerHTML;
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    this.$el.append(node)
    return this
  }
  on(eventType, method) {
    this.$el.addEventListener(eventType, method);
  }
  remove(eventType, method) {
    this.$el.removeEventListener(eventType, method)
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  getCord() {
    return this.$el.getBoundingClientRect()
  }
  get data() {
    return this.$el.dataset.colid
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  css(styles={}) {
    Object.keys(styles).forEach((styleName)=>{
      this.$el.style[styleName] = styles[styleName]
    })
  }
}


export function $(element) {
  return new Dom(element);
}

$.create = (tagName, classes='')=>{
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el)
}