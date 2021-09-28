import {ExelComponent} from '@core/ExelComponent';
import {$} from "@core/Dom";
import {changeTitle} from "@/redux/actions";
import {defaultTitle} from "@core/default";

export class Header extends ExelComponent {
  constructor($root, options) {
    super($root, {
      listeners: ['input'],
      name: 'Header',
      ...options
    });
  }

  static className = 'excel__header';

  toHTML() {
    const title = this.store.getState().title || defaultTitle

    return `
             <input type="text" class="input" value="${title}"/>
                <div>
                    <span class="material-icons">exit_to_app</span>
                    <span class="material-icons">delete</span>
                </div>
        `;
  }

  onInput(event) {
    const $el = $(event.target)
    this.$dispatch(changeTitle({title: $el.$el.value}))

  }
}
