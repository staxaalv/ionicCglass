import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  API_URL = environment.apiUrl;

  autenticado: boolean = false;
  codigoLicenciatario: Number;
  codigoUsuario: Number;
  token = "";

  constructor(public http: HttpClient) { }

  autenticacion(usuario, clave) {
    var data = {
      "username": usuario,
      "password": clave,
    };

    return new Promise((resolve) => {
      this.http.post(this.API_URL + '/api/signin',
        JSON.stringify(data),
        { headers: new HttpHeaders().set('Content-Type', 'application/json') })
        .subscribe((res: any) => {
          //console.log(res.headers.get('X-Token'));

          sessionStorage.setItem('token', res.accessToken);
          //this.autenticado = true;
          var data = { respuestaCodigo: 0 };
          resolve(data);
        }, (err) => {
          var e;
          this.autenticado = false;
          if (err.status == 401 || err.status == 403) {
            e = "Usuario o clave incorrecta, vuelva a intentarlo"
          } else {
            e = "Servicio no disponible por el momento, inténtelo mas tarde";
          }
          var data = { respuestaCodigo: -1, error: e };
          resolve(data);

        });
    });
  }

  obtenerDatosUsuario(usuario) {
    var data = {
      "username": usuario
    };
    this.token = sessionStorage.getItem('token');
    //headers: new HttpHeaders().set('Authorization', this.token)
    /*return new Promise((resolve) => {
      this.http.get(this.API_URL + '/api/valid/token')
        .subscribe((res: any) => {
          //this.general.codigoUsuario = res.ageUsuariosPK.codigo;
          //this.general.codigoLicenciatario = res.ageUsuariosPK.ageLicencCodigo;
          this.autenticado = true;
          var data = { respuestaCodigo: 0, datos: res };
          resolve(data);
        }, (err) => {
          var e;
          this.autenticado = false;
          alert(JSON.stringify(err));
          if (err.status == 401) {
            e = "Usuario o clave incorrecta, vuelva a intentarlo"
          } else {
            e = "Servicio no disponible por el momento, inténtelo mas tarde";
          }
          var data = { respuestaCodigo: -1, error: e };
          resolve(data);

        });

    });*/
    return new Promise((resolve) => {
      this.http.post(this.API_URL + '/sasf-auditoria/user',
        JSON.stringify(data),
        { headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', this.token) })
        .subscribe((res: any) => {
          //this.general.codigoUsuario = res.ageUsuariosPK.codigo;
          //this.general.codigoLicenciatario = res.ageUsuariosPK.ageLicencCodigo;
          this.autenticado = true;
          var data = { respuestaCodigo: 0 , datos: res};
          resolve(data);
        }, (err) => {
          var e;
          this.autenticado = false;
          alert(JSON.stringify(err));
          if (err.status == 401) {
            e = "Usuario o clave incorrecta, vuelva a intentarlo"
          } else {
            e = "Servicio no disponible por el momento, inténtelo mas tarde";
          }
          var data = { respuestaCodigo: -1, error: e };
          resolve(data);

        });
    });
  }

}
