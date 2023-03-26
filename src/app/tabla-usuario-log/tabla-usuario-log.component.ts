import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
@Component({
  selector: 'app-tabla-usuario-log',
  templateUrl: './tabla-usuario-log.component.html',
  styleUrls: ['./tabla-usuario-log.component.css']
})
export class TablaUsuarioLogComponent {
  dataTable: any;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  email:any;
  constructor(private http:HttpClient) { }

  ngOnInit():void {
    this.obtenerLogUsuario();
  }

  obtenerLogUsuario(){
    this.email = 'rt.mariajose@gmail.com';
    this.dataTable = $('#tabla_log_usuarios').DataTable({
      pageLength: 10,
      serverSide: true,
      processing: true,
      order: [[ 1, 'desc' ]],
      ajax:(dataTablesParameters: any, callback:any) =>{
        const params = new HttpParams()
          .set('start', dataTablesParameters.start)
          .set('length', dataTablesParameters.length)
          .set('search[value]', dataTablesParameters.search.value)
          .set('order[0][column]', dataTablesParameters.order[0].column)
          .set('order[0][dir]', dataTablesParameters.order[0].dir)
          .set('usuario',this.email);

        this.http.get('http://localhost:3000/log_usuario', { params })
          .subscribe((response: any) => {

            callback({
              recordsTotal: response.recordsTotal,
              recordsFiltered: response.recordsTotal,
              data: response.data
            });
          });
      },
      columns: [
        { data: 'email' },
        { data: 'fecha' },
      ]
    });
  }

  recargarTabla(): void {
    this.dataTable.ajax.reload();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.obtenerLogUsuario();
  }

}
