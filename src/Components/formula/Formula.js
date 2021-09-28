import {ExelComponent} from '@core/ExelComponent';


export class Formula extends ExelComponent {
  constructor($root, options) {
    super($root, {
      listeners: ['input', 'keydown'],
      subscribers: ['currentText'],
      name: 'Formula',
      ...options
    });
  }
    static className = 'excel__formula';
    init() {
      this.$input = this.$root.find('[data-input="text"]')
      super.init();
      this.$on('table:changeCell', ($el) => this.$input.text($el.attr('data-value')))
    }
    storeChanged({currentText}) {
      this.$input.text(currentText)
    }

  onInput(event) {
      this.$emit('formulaChange', event.target.textContent)
    }
    onKeydown(event) {
      if (event.key !== 'Enter' && event.key !== 'Tab') return
      event.preventDefault()
      this.$emit('formula:Enter')
    }
    toHTML() {
      return `
             <div class="info">fx</div>
                <div class="input">
                    <div class="input__text" type="text" data-input="text" spellcheck="false" contenteditable></div>
                </div>
        `;
    }
}
