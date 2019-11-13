import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { GeneralService } from '../generales/general.service';
import { AutenticacionService } from '../generales/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AceService {

  API_URL = environment.apiUrl + '/sasf-comprobante';

  constructor(public http: HttpClient, public authService: AutenticacionService) { }

  getParametrosGenerales() {
    //this.token = sessionStorage.getItem("token");
    return new Promise(resolve => {
      this.http.get(this.API_URL + '/ace/licenciatarios/parametros/all/' + this.authService.codigoLicenciatario,
        { headers: new HttpHeaders().set('Authorization', this.authService.token) })
        .subscribe(res => {
          //alert(data);
          var data = { respuestaCodigo: 0, data: res};
          resolve(data);
        }, err => {
          var data;
          if (err.error) {
            data = { respuestaCodigo: -1, error: err.error };
          } else {
            data = { respuestaCodigo: -1, error: "Servicio no disponible por el momento, inténtelo mas tarde" };
          }
          console.log(data);
        });
    });
  }

  async updateParametroGeneral(data) {
    return new Promise(resolve => {
      this.http.put(this.API_URL + '/ace/licenciatarios/parametros/update/' + this.authService.codigoLicenciatario,
        JSON.stringify(data),
        { headers: new HttpHeaders().set('Authorization', this.authService.token).set('Content-Type', 'application/json') })
        .subscribe(res => {
          //alert(data);
          var data = { respuestaCodigo: 0 };
          resolve(data);
        }, err => {
          var data;
          //alert(JSON.stringify(err));
          if (err.error) {
            data = { respuestaCodigo: -1, error: err.error };
          } else {
            data = { respuestaCodigo: -1, error: "Servicio no disponible por el momento, inténtelo mas tarde" };
          }
          resolve(data);
        });
    });
  }

  async insertParametroGeneral(data) {
    return new Promise(resolve => {
      this.http.post(this.API_URL + '/ace/licenciatarios/parametros/insert/' + this.authService.codigoLicenciatario,
        JSON.stringify(data),
        { headers: new HttpHeaders().set('Authorization', this.authService.token).set('Content-Type', 'application/json') })
        .subscribe(res => {
          //alert(data);
          var data = { respuestaCodigo: 0 };
          resolve(data);
        }, err => {
          var data;
          //alert(JSON.stringify(err));
          if (err.error) {
            data = { respuestaCodigo: -1, error: err.error };
          } else {
            data = { respuestaCodigo: -1, error: "Servicio no disponible por el momento, inténtelo mas tarde" };
          }
          resolve(data);
        });
    });
  }


}
