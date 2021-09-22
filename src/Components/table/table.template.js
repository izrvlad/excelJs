const CODES={
  A: 65,
  Z: 90
}
function toColumn(content, index) {
  return `
        <div class="column" data-type="resize" data-colid=${index}>
            ${content}
            <div class="resize-col" data-resize="col"></div>
        </div>    
    `
}
function createCell(_, index) {
  return `<div class="cell" contenteditable="" data-colid=${index}></div>`
}
function creteRow(content, index=null) {
  const resize = `<div class="resize-row" data-resize="row"></div>`
  return `
         <div class="row" data-type="resize">
               <div class="row-info">
                    ${index ? index: ''}
                     ${index ? resize: ''}                    
               </div>
                    <div class="row-data" data-rowid="${index}">
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
      rows.push(creteRow(cells,i+1))
  }
  rows
  return rows.join('')
}
