import {range} from "@core/utils";

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function changeCell(id,rowCount,collCount){
  const row = +id[0]+rowCount
  const cell = +id[1]+collCount
  return `${row}:${cell}`
}

export function getCells($root,$el,current) {
  const target = $el.id(true)
  const colls = range(+current[0], +target[0])
  const rows = range(+current[1], +target[1])
  const cells = colls.reduce((acc,col)=>{
    rows.forEach((row)=>acc.push(`${col}:${row}`))
    return acc
  },[])
  const $cells = cells.map(cell => $root.find(`[data-id="${cell}"]`))
  return $cells
}
