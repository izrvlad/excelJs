import {ExelComponent} from '@core/ExelComponent';
import {createTable} from '@/Components/table/table.template';
import {resizeGandler} from "@/Components/table/table.resizer";

export class Table extends ExelComponent {
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
      name: 'Table'
    });
  }
    static className = 'excel__table';
    toHTML() {
      return createTable()
    }

    onMousedown(event) {
      if (!event.target.dataset.resize) return
      resizeGandler(this.$root, event)
    }
}
