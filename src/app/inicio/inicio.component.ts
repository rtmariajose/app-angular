import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent{
  email_usuario = "";
  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit():void {
    this.email_usuario = this.route.snapshot.queryParams['email'];
    console.log("email"+JSON.stringify(this.route.snapshot.queryParams));
  }

  verRegistrosLogUsuario(){
    const email = this.email_usuario;
    this.router.navigateByUrl('/table-usuario-log?email='+email);
  }

  verRegistrosSaldos(){
    this.router.navigateByUrl('/table');
  }
}
