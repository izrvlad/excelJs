import {storageState} from "@core/utils";

export function crateRecordsTable() {

  return createRecords()
}


function createRecords() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    if (!localStorage.key(i).includes('excel')) {
      continue
    }
    keys.push(localStorage.key(i))
  }
  if (!keys.length) return `<p>Вы пока не создали ни одной таблицы</p>`

  return `
        <div class="db__list-header">
                <span>Название</span>
                <span>Дата открытия</span>
            </div>
      <ul class="db__list">
            ${keys.map(toRecord).join('')}
            </ul>
  `
}
function toRecord(key, index) {
  const store = storageState(key)
  return `
        <li class="db__record">
           <a href="#excel/${key.split(':')[1]}">${store.title}</a>
                    <strong>${normaliseDate(store.lastSeen)}</strong>
                </li>         
    `
}

function normaliseDate(time) {
  const date = new Date(+time)
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const month = date.getMonth() < 10 ? '0' + date.getMonth(): date.getMonth()
  return `${day}.${month}.${date.getFullYear()}`
}