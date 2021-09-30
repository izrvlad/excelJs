import {ExelComponent} from '@core/ExelComponent';
import {$} from '@core/Dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@core/default';
import {ActiveRoute} from '@core/Router/ActiveRoute';

export class Header extends ExelComponent {
  constructor($root, options) {
    super($root, {
      listeners: ['input', 'click'],
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
                    <span class="material-icons" data-type="exit">exit_to_app</span>
                    <span class="material-icons" data-type="delete">delete</span>
                </div>
        `;
  }

  onInput(event) {
    const $el = $(event.target)
    this.$dispatch(changeTitle({title: $el.$el.value}))
  }
  onClick(event) {
    if (event.target.dataset.type === 'exit') {
      window.location.hash = ''
      return
    } else if(event.target.dataset.type === 'delete') {
      const confirm = window.confirm('Вы дейсвительно хотите удалить таблицу?')
      if (confirm) {
        const key = 'excel:' + ActiveRoute.param
        localStorage.removeItem(key)
        window.location.hash = ''
      }
    }
  }
}
