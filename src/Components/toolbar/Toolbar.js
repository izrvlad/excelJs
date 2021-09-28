import {createToolbar} from '@/Components/toolbar/toolbar.template';
import {$} from '@core/Dom';
import {ExelStateComponent} from '@core/ExelStateComponent';
import {defaultStyles} from "@core/default";

export class Toolbar extends ExelStateComponent {
  constructor($root, options) {
    super($root, {
      listeners: ['click'],
      name: 'Toolbar',
      subscribers: ['currentStyles'],
      ...options
    });
  }
  prepare() {
    this.initState(defaultStyles)

  }
  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  static className = 'excel__toolbar';
  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }
  onClick(event) {
    const button = event.target.dataset
    if (button.type === 'button') {
      const style = JSON.parse(button.style)
      this.setState(style)
      this.$emit('toolbar:changeStyle',style)
    }
  }
}
