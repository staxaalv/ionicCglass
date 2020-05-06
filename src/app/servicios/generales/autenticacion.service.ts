import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  API_URL = environment.apiUrl;
  API_URL_AGE = environment.apiUrlAge;

  autenticado: boolean = false;
  codigoLicenciatario: Number;
  codigoUsuario: Number;
  codigoSucursal: Number;
  token = "";

  transacciones: any;

  constructor(public http: HttpClient) { }

  autenticacion(usuario) {

    //let formData: FormData = new FormData();
    let formData = new URLSearchParams();
    //formData.append("username", usuario);
    //formData.append("password", clave);
    //formData.append("grant_type", "password");
    formData.append("grant_type", "client_credentials");

    /*var data = {
      "username": usuario,
      "password": clave,
      "grant_type": "password"
    };*/

    const body = new HttpParams()
    .set('grant_type', 'client_credentials');

    return new Promise((resolve) => {
      //this.http.post(this.API_URL + '/api/signin',
      this.http.post(this.API_URL + '/token',//&grant_type=password&username=' + usuario +'&password=' + clave,
        //formData,
        body.toString(),
        {
          headers: new HttpHeaders()//.set('Content-Type', 'multipart/form-data')
            .set('Authorization', 'Basic ' + btoa('aYKMUGVUpyym89NLfDBABBZPx3Ya' + ':' + 'v5Xs3mmZTd4t8neAXLMGp6hquh0a'))
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Access-Control-Allow-Origin', '*')
        })
        .subscribe((res: any) => {
          sessionStorage.setItem('token', res.token_type + ' ' + res.access_token);
          this.token = res.token_type + ' ' + res.access_token;
          var data = { respuestaCodigo: 0 };
          resolve(data);
        }, (err) => {
          var e;
          this.autenticado = false;
          if (err.status == 400) {
            e = err.error.error_description;
          } else {
            e = "Servicio no disponible por el momento, inténtelo mas tarde";
          }
          var data = { respuestaCodigo: -1, error: e };
          resolve(data);

        });
    });
  }

  obtenerDatosUsuario(usuario, clave) {
    var data = {
      "codigoExterno": usuario,
      "clave": clave
    };

    return new Promise((resolve) => {
      this.http.post(this.API_URL_AGE + '/ageUsuarios/user',
        JSON.stringify(data),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this.token)
        })
        .subscribe((res: any) => {
          this.autenticado = true;
          this.codigoUsuario = res.id.codigo;
          this.codigoLicenciatario = res.id.ageLicencCodigo;
          this.codigoSucursal = res.ageSucursCodigo;
          let data = { respuestaCodigo: 0, datos: res };
          resolve(data);
        }, (err) => {
          let e;
          this.autenticado = false;
          console.log(err);
          if (err.status == 401 || err.status == 404) {
            e = "Problemas en la autenticación, " + err.error;
          } else {
            e = "Servicio no disponible por el momento, inténtelo mas tarde";
          }
          let data = { respuestaCodigo: -1, error: e };
          resolve(data);
        });

    });
  }

  obtenerTransacciones() {
    //this.token = sessionStorage.getItem("token");
    return new Promise(resolve => {
      this.http.get(this.API_URL_AGE + '/ageTransacciones/transacciones/' + this.codigoUsuario + '/' + this.codigoLicenciatario,
        { headers: new HttpHeaders().set('Authorization', this.token) })
        .subscribe((data: any) => {
          //alert(data);
          this.transacciones = data;
          let dataL = { respuestaCodigo: 0 };
          resolve(dataL);
        }, err => {
          let e;
          this.autenticado = false;
          console.log(err);
          if (err.status == 404) {
            e = "Usuario no tiene transacciones habilitadas. Llamar a Sistemas"
          } else {
            e = "Servicio no disponible por el momento, inténtelo mas tarde";
          }
          let data = { respuestaCodigo: -1, error: e };
          resolve(data);
        });
    });
  }

}
