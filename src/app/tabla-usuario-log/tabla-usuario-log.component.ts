import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private http: HttpClient, private route: ActivatedRoute) {

  }

  ngOnInit():void {
    this.email = this.route.snapshot.queryParams['email'];
    this.obtenerLogUsuario();
  }

  obtenerLogUsuario(){
    //this.email = 'rt.mariajose@gmail.com';
    this.dataTable = $('#tabla_log_usuarios').DataTable({
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      },
      pageLength: 10,
      searching: false,
      lengthChange:false,
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
        { data: 'fecha_registro' },
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
