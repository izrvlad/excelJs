import './scss/index.scss'
import {Router} from "@core/Router/Router";
import {DashBoadrPage} from "@/Pages/DashBoadrPage";
import {ExcelPage} from "@/Pages/ExcelPage";



const route = new Router('#app',{DashboardPage: DashBoadrPage,ExcelPage: ExcelPage})
route.init()
