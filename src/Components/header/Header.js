import {ExelComponent} from '@core/ExelComponent';

export class Header extends ExelComponent {
  constructor($root,options) {
    super($root, {
      listeners: [],
      name: 'Header',
      ...options
    });
  }
    static className = 'excel__header';
    toHTML() {
      return `
             <input type="text" class="input" value="Новая таблица"/>
                <div>
                    <span class="material-icons">exit_to_app</span>
                    <span class="material-icons">delete</span>
                </div>
        `;
    }
    onClick(event) {
      console.log('header', event)
    }
}
