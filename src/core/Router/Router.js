import {$} from '../Dom';
import {ActiveRoute} from "./ActiveRoute";

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('no selector in router')
    }
    this.$selector = $(selector)
    this.routes = routes
    this.hashChangeHandler = this.hashChangeHandler.bind(this)
    this.page = null
  }
  init() {
    window.addEventListener('hashchange', this.hashChangeHandler)
    this.hashChangeHandler()
  }

  hashChangeHandler() {
    if(this.page) {
      this.page.destroy()
    }
    console.log(ActiveRoute.hash)
    const Page = ActiveRoute.hash.includes('excel')
      ? this.routes.ExcelPage
      : this.routes.DashboardPage
    this.$selector.clear()
    this.page = new Page(ActiveRoute.param)
    const html = this.page.getRoot()
    this.page.afterRender()
    this.$selector.append(html)
  }

  destroy() {
    window.removeEventListener('hashchange', this.hashChangeHandler)
  }
}
