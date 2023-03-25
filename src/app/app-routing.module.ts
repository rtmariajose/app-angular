import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogincheckComponent} from "./logincheck/logincheck.component";
import {TableComponent} from "./table/table.component";

const routes: Routes = [
  { path: "login", component: LogincheckComponent, pathMatch: "full" },
  { path: "table", component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
