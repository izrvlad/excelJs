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
  clear() {
    this.Html(' ')
    return this
  }
  getCord() {
    return this.$el.getBoundingClientRect()
  }
  get data() {
    return this.$el.dataset.colid
  }
  get RowId() {
    return this.$el.dataset.rowid
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  css(styles={}) {
    Object.keys(styles).forEach((styleName)=>{
      this.$el.style[styleName] = styles[styleName]
    })
  }
  addClass(className) {
    this.$el.classList.add(className)
  }
  removeClass(className) {
    this.$el.classList.remove(className)
  }
  id(param) {
    if (param) {
      return this.id().split(':')
    }
    return this.$el.dataset.id
  }
  focus() {
    this.$el.focus()
    return this
  }
  text(text) {
    if (text) {
      this.$el.textContent = text
      return this
    }
    return this.$el.textContent
  }
  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }
  getStyles(styles) {
    return styles.reduce((res,style)=>{
      res[style] = this.$el.style[style]
      return res
    },{})
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
