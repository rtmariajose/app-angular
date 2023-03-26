import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


//declare var $: any;
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{
  dataTable: any;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private http:HttpClient) { }

  ngOnInit():void {
    this.obtenerSaldos();
  }

  obtenerSaldos(){
    this.dataTable = $('#tabla_saldos').DataTable({
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
          .set('order[0][dir]', dataTablesParameters.order[0].dir);

        this.http.get('http://localhost:3000/saldos', { params })
          .subscribe((response: any) => {

            callback({
              recordsTotal: response.recordsTotal,
              recordsFiltered: response.recordsTotal,
              data: response.data
            });
          });
      },
      columns: [
        { data: 'id' },
        { data: 'usuario_login_id' },
        { data: 'saldo' },
        { data: 'fecha_registro' }
      ]
    });
  }

  recargarTabla(): void {
   // this.dataTable.ajax.reload();
  }

  pageChanged(event: any): void {
    //this.currentPage = event.page;
    //this.obtenerSaldos();
  }
}
