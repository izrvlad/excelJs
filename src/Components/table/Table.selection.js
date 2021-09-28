export class TableSelection {
  static className = 'selected'
  constructor() {
    this.selected = []
    this.curent = null
  }
  select($el) {
    this.clear()
    this.selected.push($el)
    this.curent = $el
    $el.focus().addClass(TableSelection.className)
  }
  clear() {
    this.selected.forEach(($el)=>$el.removeClass(TableSelection.className))
    this.selected = []
  }
  get selectedIds() {
    return this.selected.map($el=>$el.id())
  }
  selectGroup($group) {
    this.clear()
    this.selected = $group
    $group.forEach($el =>$el.addClass(TableSelection.className))

  }
  changeStyle(style){
    this.selected.forEach($el => $el.css(style))
  }
}
