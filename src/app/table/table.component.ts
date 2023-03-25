import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';


//declare var $: any;
import * as $ from 'jquery';
import 'datatables.net';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  dataTable: any;

  constructor(private http:HttpClient) { }

  ngOnInit():void {
    this.dataTable = $('#tabla_saldos').DataTable({
      serverSide:true,
      processing:true,
      ajax:(dataTablesParameters: any, callback:any) =>{
        this.http.get('http://localhost:3000/saldos', dataTablesParameters)
          .subscribe((response: any) => {
            console.log("Data"+ response);
            callback({
              recordsTotal: response.recordsTotal,
              recordsFiltered: response.recordsFiltered,
              data: response
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
}
