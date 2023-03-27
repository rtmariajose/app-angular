import { NgModule } from '@angular/core';
import {LogincheckComponent} from "./logincheck/logincheck.component";
import {InicioComponent} from "./inicio/inicio.component";
import {ExtraOptions, RouterModule, Routes} from "@angular/router";
import {TableComponent} from "./table/table.component";
import {TablaUsuarioLogComponent} from "./tabla-usuario-log/tabla-usuario-log.component";

const routes: Routes = [
  { path: "", component: LogincheckComponent},
  { path: "inicio", component: InicioComponent },
  { path: "table", component: TableComponent },
  { path: "tabla-usuario-log", component: TablaUsuarioLogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
