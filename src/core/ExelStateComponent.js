import {ExelComponent} from '@core/ExelComponent';

export class ExelStateComponent extends ExelComponent {
  constructor($root,options) {
    super($root, {...options})
  }
  get template() {
    return JSON.stringify(this.state, null, 2)
  }
  initState(initialState = {}) {
    this.state = {...initialState}
  }
  setState(newState) {
    this.state = {...this.state, ...newState}
    this.$root.Html(this.template)
  }

}
