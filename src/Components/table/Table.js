import {ExelComponent} from '@core/ExelComponent';
import {createTable} from "@/Components/table/table.template";

export class Table extends ExelComponent {
  constructor($root) {
    super($root, {
      listeners: ['click'],
      name: 'Table'
    });
  }
    static className = 'excel__table';
    toHTML() {
      return createTable()
    }
}
