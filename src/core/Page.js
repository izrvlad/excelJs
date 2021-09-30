export class Page {
  constructor(params) {
    this.params = params
  }
  getRoot() {
    throw new Error('getRoot should be overiden')
  }
  afterRender() {
      
  }
  destroy() {
      
  }
}
