import {ExelComponent} from '@core/ExelComponent';

export class Toolbar extends ExelComponent {
  constructor($root,options) {
    super($root, {
      listeners: [],
      name: 'Toolbar',
      ...options
    });
  }

    static className = 'excel__toolbar';

    toHTML() {
      return `
             <span class="material-icons">format_align_left</span>
                <span class="material-icons">format_align_center</span>
                <span class="material-icons">format_align_right</span>
                <span class="material-icons">format_bold</span>
                <span class="material-icons">format_italic</span>
                <span class="material-icons">format_underlined</span>
        `;
    }
}
