import { NgModule } from '@angular/core';
import {LogincheckComponent} from "./logincheck/logincheck.component";
import {InicioComponent} from "./inicio/inicio.component";
import {RouterModule, Routes} from "@angular/router";
import {TableComponent} from "./table/table.component";
import {TablaUsuarioLogComponent} from "./tabla-usuario-log/tabla-usuario-log.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", component: LogincheckComponent,pathMatch: 'full'},
  { path: "inicio", component: InicioComponent },
  { path: "table", component: TableComponent },
  { path: "tabla-usuario-log", component: TablaUsuarioLogComponent },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
