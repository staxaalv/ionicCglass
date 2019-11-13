import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/generales/autenticacion.service';
import { GeneralService } from 'src/app/servicios/generales/general.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loading = false;
  usuario: string;
  clave: string;
  respuesta: any;
  today: number = Date.now();

  constructor(private autenticacion: AutenticacionService,
    private general: GeneralService,
    private router: Router) {

  }

  obtenerDatosUsuario() {

    this.loading = true;
    this.autenticacion.obtenerDatosUsuario(this.usuario)
      .then((data: any) => {
        this.loading = false;
        if (data.respuestaCodigo == 0) {
          //this.router.navigate(['/home']);
          this.autenticacion.codigoUsuario = data.datos.ageUsuariosPK.codigo;
          this.autenticacion.codigoLicenciatario = data.datos.ageUsuariosPK.ageLicencCodigo;
          this.router.navigate(['/home']);
        } else {
          alert(data.error);
          this.router.navigate(['/login']);
        }
        
      }).catch(err => {
        this.loading = false;
        alert("Error no controlado");
        console.log(err);

      });
  }

  loginButton() {

    this.loading = true;
    this.autenticacion.autenticacion(this.usuario, this.clave)
      .then((data: any) => {
        this.loading = false;
        if (data.respuestaCodigo == 0) {
          //this.router.navigate(['/home']);
          this.obtenerDatosUsuario();
        } else {
          alert(data.error);
          this.router.navigate(['/login']);
        }
        
      }).catch(err => {
        this.loading = false;
        alert("Error no controlado");
        console.log(err);

      });
  }

}
