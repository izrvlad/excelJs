import {ExelComponent} from '@core/ExelComponent';
import {createTable} from '@/Components/table/table.template';
import {resizeGandler} from '@/Components/table/table.resizer';
import {TableSelection} from '@/Components/table/Table.selection';
import {changeCell, getCells, isCell, shouldResize} from '@/Components/table/table.functions';
import {$} from '@core/Dom';

export class Table extends ExelComponent {
  constructor($root,options) {
    super($root, {
      listeners: ['mousedown', 'keydown','input'],
      name: 'Table',
      ...options
    });
    this.prepare()
  }
    static className = 'excel__table';
  
    prepare() {
      this.selection = new TableSelection();
    }

    toHTML() {
      return createTable()
    }
    init() {
      super.init();
      const $el = this.$root.find('[data-id="0:0"]')
      this.selection.select($el)
      this.$on('formulaChange',(text)=>this.selection.curent.text(text))
      this.$on('formula:Enter', ()=>this.selection.curent.focus())
    }
    onInput(event) {
      const text = this.selection.curent.text()
      this.$emit('table:change',text)
    }

    onMousedown(event) {
      if (shouldResize(event)) {
        resizeGandler(this.$root, event)
      } else if (isCell(event)) {
        const id = event.target.dataset.id
        const $el = this.$root.find(`[data-id="${id}"]`)
        if (event.shiftKey) {
          const current = this.selection.curent.id(true)
          const $cells = getCells(this.$root, $el, current)
          this.selection.selectGroup($cells)
        } else {
          this.selection.select($el)
        }
      }
    }
    onKeydown(event) {
      const keys = ['Enter','ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Tab']
      if (event.shiftKey || !keys.includes(event.key)) return;
      event.preventDefault()
      const type = event.key
      let id
      if (type==='Enter' || type === 'ArrowDown'){
        id = changeCell(this.selection.curent.id(true),1,0)
      }
      if (type === 'ArrowRight' || type === 'Tab'){
        id = changeCell(this.selection.curent.id(true),0,1)
      }
      if (type === 'ArrowLeft'){
        id = changeCell(this.selection.curent.id(true),0,-1)
      }
      if (type === 'ArrowUp'){
        id = changeCell(this.selection.curent.id(true),-1,0)
      }
      if(!id) return;
      const [row,coll] = id.split(':')
      if (+row < 0 || +coll < 0 ) return
      const $el = this.$root.find(`[data-id="${id}"]`)
      this.selection.select($el)
      this.$emit('table:changeCell',$el)


    }


}
