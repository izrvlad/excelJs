import {ExelComponent} from '@core/ExelComponent';


export class Formula extends ExelComponent {
  constructor($root) {
    super($root, {
      listeners: [],
      name: 'Formula',
    });
  }
    static className = 'excel__formula';
    toHTML() {
      return `
             <div class="info">fx</div>
                <div class="input">
                    <input type="text" spellcheck="false" contenteditable>
                </div>
        `;
    }
}
