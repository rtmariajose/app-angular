import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogincheckComponent } from './logincheck/logincheck.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

declare var $: any;
import 'jquery';
import 'datatables.net';
import 'datatables.net-dt';


import { InicioComponent } from './inicio/inicio.component';
import { TableComponent } from './table/table.component';
import { TablaUsuarioLogComponent } from './tabla-usuario-log/tabla-usuario-log.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LogincheckComponent,
    TableComponent,
    TablaUsuarioLogComponent,
    InicioComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
