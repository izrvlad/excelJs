const CODES={
  A: 65,
  Z: 90
}
function toColumn(content) {
  return `
        <div class="column">${content}</div>    
    `
}
function createCell() {
    return `<div class="cell" contenteditable=""></div>`
}
function creteRow(content, index='') {
  return `
         <div class="row">
               <div class="row-info">${index}</div>
                    <div class="row-data">
                    ${content}
                    </div>
               </div>     
    `
}
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}


export function createTable(rowsCount=150) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = []
  const colls = new Array(colsCount)
      .fill(' ')
      .map(toChar)
      .map(toColumn)
      .join('')
  rows.push(creteRow(colls))
  for (let i = 0; i <rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill(' ')
        .map(createCell)
        .join('')
      console.log(cells)
      rows.push(creteRow(cells,i+1))
  }
  rows
  return rows.join('')
}
