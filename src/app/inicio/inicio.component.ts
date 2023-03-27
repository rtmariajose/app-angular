import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  email_usuario = "";
  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit():void {
    this.email_usuario = this.route.snapshot.queryParams['email'];
  }

  verRegistrosLogUsuario(){
    const email = this.email_usuario;
    if(email != "" && email != null && email !=undefined) {
      this.router.navigateByUrl('/tabla-usuario-log?email=' + email).then(() => {
        console.log('Navegación completada');
        // Agregar aquí cualquier otra acción que necesites realizar después de la navegación.
      })
        .catch(error => {
          console.error('Error al navegar', error);
        });
    }
  }

  verRegistrosSaldos(){
    this.router.navigate(['/table']).then(() => {
      console.log('Navegación completada');
      // Agregar aquí cualquier otra acción que necesites realizar después de la navegación.
    })
      .catch(error => {
        console.error('Error al navegar', error);
      });
  }
}
