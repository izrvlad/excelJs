import './scss/index.scss'
import {Excel} from '@/Components/excel/Excel';
import {Header} from '@/Components/header/Header';
import {Toolbar} from '@/Components/toolbar/Toolbar';
import {Table} from '@/Components/table/Table';
import {Formula} from '@/Components/formula/Formula';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storageState} from "@core/utils";
import {initialState} from "@/redux/initialState";


const store = createStore(rootReducer, initialState)
const sub = debounce((state)=>{
  storageState('excel-storage',state)
},300)
store.subscribe(sub)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})
excel.render()
