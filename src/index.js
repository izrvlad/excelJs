import './scss/index.scss'
import {Excel} from '@/Components/excel/Excel';
import {Header} from '@/Components/header/Header';
import {Toolbar} from '@/Components/toolbar/Toolbar';
import {Table} from '@/Components/table/Table';
import {Formula} from '@/Components/formula/Formula';


const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table]
})
excel.render()
