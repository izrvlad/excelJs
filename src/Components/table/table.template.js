import {camelToDashCase, parse, toInlineStyles} from "@core/utils";

const CODES={
  A: 65,
  Z: 90
}
function toColumn({col,index,width}) {
  return `
        <div class="column" data-type="resize" data-colid=${index} style="width:${width}">
            ${col}
            <div class="resize-col" data-resize="col"></div>
        </div>    
    `
}
function createCell(store,row) {
  return function(_, index) {
    const width = getWidth(store.colState,index)
    const id = `${row}:${index}`
    const styles = toInlineStyles(store.applyStyles[id])
    return `
        <div 
        class="cell" 
        contenteditable="" 
        data-colid=${index} 
        data-type="cell"
        style="width:${width};${styles}"
        data-id="${id}"
        data-value="${store.cellsState[id] || ''}"
        >
        ${parse(store.cellsState[id]) || ''}
        </div>`
  }
}
function creteRow(content, index=null,rowState={}) {
  const resize = `<div class="resize-row" data-resize="row"></div>`
  const height = rowState[index] ? rowState[index] + 'px' : '25px'
  return `
         <div class="row" data-type="resize" data-rowid="${index}" style="height:${height}">
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
function getWidth(colState = {},index){
  return colState[index] ? colState[index]+'px' : 120 +'px'
}
function resizeColls(store){
  return function (col,index){
    return{
      col, index, width:getWidth(store.colState,index)
    }
  }
}


export function createTable(rowsCount=20,store) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = []
  const colls = new Array(colsCount)
      .fill(' ')
      .map(toChar)
      .map(resizeColls(store))
      .map(toColumn)
      .join('')
  rows.push(creteRow(colls))
  for (let i = 0; i <rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill(' ')
        .map(createCell(store,i))
        .join('')
    rows.push(creteRow(cells, i+1,store.rowState))
  }
  return rows.join('')
}
