import {ExelComponent} from '@core/ExelComponent';


export class Formula extends ExelComponent {
  constructor($root, options) {
    super($root, {
      listeners: ['input', 'keydown'],
      name: 'Formula',
      ...options
    });
  }
    static className = 'excel__formula';
    init() {
      super.init();
      const $input = this.$root.find('[data-input="text"]')
      this.$on('table:change', (text)=>$input.text(text))
      this.$on('table:changeCell', ($el) => $input.text($el.text()))
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
