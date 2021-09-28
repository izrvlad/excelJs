import {ExelComponent} from '@core/ExelComponent';
import {createTable} from '@/Components/table/table.template';
import {resizeGandler} from '@/Components/table/table.resizer';
import {TableSelection} from '@/Components/table/Table.selection';
import {changeCell, getCells, isCell, shouldResize} from '@/Components/table/table.functions';
import {$} from '@core/Dom';
import {applyStyles, changeCurrentStyles, tableChange, tableResize} from "@/redux/actions";
import {defaultStyles} from "@core/default";
import {parse} from "@core/utils";

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
    changeCell($el) {
      this.selection.select($el)
      const newStyles = this.selection.curent.getStyles(Object.keys(defaultStyles))
      this.$emit('table:changeCell',$el)
      this.$dispatch(changeCurrentStyles(newStyles))
    }

    toHTML() {
      return createTable(20,this.store.getState())
    }
    init() {
      super.init();
      const $el = this.$root.find('[data-id="0:0"]')
      $el.focus()
      changeCell($el)
      this.$on('formulaChange', (text)=>{
        this.selection.curent
            .attr('data-value',text)
            .text(parse(text))
        this.changeInputCell(text)
      })
      this.$on('toolbar:changeStyle', (style)=>{
        this.selection.changeStyle(style)
        this.$dispatch(applyStyles({
          ids: this.selection.selectedIds,
          value: style
        }))
      })
      this.$on('formula:Enter', ()=>this.selection.curent.focus())
    }
    changeInputCell(text) {
      this.$dispatch(tableChange({
        id: this.selection.curent.id(),
        text
      }))
    }
    onInput(event) {
      const text = $(event.target).text()
      this.changeInputCell(text)
    }
    async resizeColl(event) {
      const data = await resizeGandler(this.$root, event)
      this.$dispatch(tableResize(data))
    }

    onMousedown(event) {
      if (shouldResize(event)) {
        this.resizeColl(event)
      } else if (isCell(event)) {
        const id = event.target.dataset.id
        const $el = this.$root.find(`[data-id="${id}"]`)
        if (event.shiftKey) {
          const current = this.selection.curent.id(true)
          const $cells = getCells(this.$root, $el, current)
          this.selection.selectGroup($cells)
        } else {
          this.changeCell($el)
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
      this.changeCell($el)

    }


}
