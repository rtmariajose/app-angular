import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent{

  constructor(private router: Router) { }

  ngOnInit():void {

    console.log("LLegue al inicio");
  }

  verRegistrosLogUsuario(){
    this.router.navigateByUrl('/table-usuario-log');
  }

  verRegistrosSaldos(){
    this.router.navigateByUrl('/table');
  }
}
