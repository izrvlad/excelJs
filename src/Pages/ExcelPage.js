import {Page} from '@core/Page';
import {Excel} from '@/Components/excel/Excel';
import {Header} from '@/Components/header/Header';
import {Toolbar} from '@/Components/toolbar/Toolbar';
import {Table} from '@/Components/table/Table';
import {Formula} from '@/Components/formula/Formula';
import {createStore} from '@core/store/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storageState} from "@core/utils";
import {initialState} from "@/redux/initialState";

export class ExcelPage extends Page {
  getRoot() {
    const param = this.params ? this.params : Date.now().toString()
    const state = storageState('excel:'+ param)
    const store = createStore(rootReducer, initialState(state))
    const sub = debounce((state)=>{
      storageState('excel:'+param, state)
    }, 300)
    store.subscribe(sub)

    const excel = new Excel( {
      components: [Header, Toolbar, Formula, Table],
      store
    })
    this.excel = excel
    return this.excel.getRoot()
  }
  afterRender() {
    this.excel.init()
  }
  destroy() {
    this.excel.destroy()
  }
}
