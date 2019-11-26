import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/generales/autenticacion.service';
import { GeneralService } from 'src/app/servicios/generales/general.service';
import { Router } from "@angular/router";
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {

  loading = false;
  usuario: string;
  clave: string;
  respuesta: any;
  today: number = Date.now();
  msgs: Message[] = [];

  constructor(private autenticacion: AutenticacionService,
    private general: GeneralService,
    private router: Router,
    private messageService: MessageService) {

  }

  obtenerDatosUsuario() {

    this.loading = true;
    this.autenticacion.obtenerDatosUsuario(this.usuario)
      .then((data: any) => {
        this.loading = false;
        if (data.respuestaCodigo == 0) {
          //this.router.navigate(['/home']);
          this.obtenerTransacciones();
        } else {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error al obtener datos: ', detail: data.error });
          this.router.navigate(['/login']);
        }

      }).catch(err => {
        this.loading = false;
        alert("Error no controlado");
        console.log(err);

      });
  }

  obtenerTransacciones() {
    this.loading = true;
    this.autenticacion.obtenerTransacciones()
      .then((data: any) => {
        this.loading = false;
        if (data.respuestaCodigo == 0) {
          //this.router.navigate(['/home']);
          //this.autenticacion.codigoUsuario = data.datos.id.codigo;
          //this.autenticacion.codigoLicenciatario = data.datos.id.ageLicencCodigo;
          this.router.navigate(['/home']);
        } else {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error: ', detail: data.error });
          this.router.navigate(['/login']);
        }
      }).catch(err => {
        this.loading = false;
        alert("Error no controlado");
        console.log(err);
      });
  }

  limpiarMensaje() {
    this.msgs = [];
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
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'Error autenticación: ', detail: data.error });
          this.router.navigate(['/login']);
        }

      }).catch(err => {
        this.loading = false;
        alert("Error no controlado");
        console.log(err);

      });
  }

}
