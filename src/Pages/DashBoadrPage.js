import {Page} from '@core/Page';
import {$} from "@core/Dom";
import {crateRecordsTable} from "@/Pages/dashBoard.functions";


export class DashBoadrPage extends Page {
  getRoot() {
    const param = Date.now().toString()
    return $.create('div','db').Html(`
                <div class="db__header">
            <h1>Excel. Панель управления</h1>
        </div>

        <div class="db__new">
            <div class="db__view">
                <a href="#excel/${param}" class="db__create">
                    Новая <br /> Таблица
                </a>
            </div>
        </div>

        <div class="db__table db__view">

            ${crateRecordsTable()}

        

        </div>
    `)
  }
}
