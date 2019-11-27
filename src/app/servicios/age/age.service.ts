import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AutenticacionService } from '../generales/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AgeService {

  API_URL = environment.apiUrlAge;
  PAIS_URL = "/agePaises";
  SECUENCIA_PRIMARIA_URL = "/ageSecuenciasPrimarias";

  constructor(public http: HttpClient, public authService: AutenticacionService) { }

  getDetalle(URL) {
    return new Promise(resolve => {
      this.http.get(this.API_URL + URL,
        { headers: new HttpHeaders().set('Authorization', this.authService.token) })
        .subscribe(res => {
          //alert(data);
          var data = { respuestaCodigo: 0, data: res };
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

  getDetalleLicenciatario(URL) {
    return new Promise(resolve => {
      this.http.get(this.API_URL + URL + '/' + this.authService.codigoLicenciatario,
        { headers: new HttpHeaders().set('Authorization', this.authService.token) })
        .subscribe(res => {
          //alert(data);
          var data = { respuestaCodigo: 0, data: res };
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

  async insertarDetalle(URL, data) {
    data.usuarioIngreso = this.authService.codigoUsuario;
    return new Promise(resolve => {
      this.http.post(this.API_URL + URL,
        JSON.stringify(data),
        { headers: new HttpHeaders().set('Authorization', this.authService.token).set('Content-Type', 'application/json') })
        .subscribe(res => {
          //alert(data);
          var data = { respuestaCodigo: 0, codigo: res };
          resolve(data);
        }, err => {
          var data;
          //alert(JSON.stringify(err));
          if (err.error.message) {
            data = { respuestaCodigo: -1, error: err.error.message };
          } else {
            data = { respuestaCodigo: -1, error: "Servicio no disponible por el momento, inténtelo mas tarde" };
          }
          resolve(data);
        });
    });
  }

  async insertarDetalleLicenciatario(URL, data) {
    data.usuarioIngreso = this.authService.codigoUsuario;
    return new Promise(resolve => {
      this.http.post(this.API_URL + URL + '/' + this.authService.codigoLicenciatario,
        JSON.stringify(data),
        { headers: new HttpHeaders().set('Authorization', this.authService.token).set('Content-Type', 'application/json') })
        .subscribe(res => {
          //alert(data);
          var data = { respuestaCodigo: 0 , codigo : res};
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

  async insertarDetalles(URL, data: any[]) {

    data.forEach(t => {
      t.usuarioIngreso = this.authService.codigoUsuario;
    });
    return new Promise(resolve => {
      this.http.post(this.API_URL + URL + '/varios',
        JSON.stringify(data),
        { headers: new HttpHeaders().set('Authorization', this.authService.token).set('Content-Type', 'application/json') })
        .subscribe(res => {
          //alert(data);
          var data = { respuestaCodigo: 0, data: res };
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

  async insertarDetallesLicenciatario(URL, data: any[]) {
    data.forEach(t => {
      t.usuarioIngreso = this.authService.codigoUsuario;
    });
    return new Promise(resolve => {
      this.http.post(this.API_URL + URL + '/varios/' + this.authService.codigoLicenciatario,
        JSON.stringify(data),
        { headers: new HttpHeaders().set('Authorization', this.authService.token).set('Content-Type', 'application/json') })
        .subscribe(res => {
          //alert(data);
          var data = { respuestaCodigo: 0, data : res };
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

  async actualizarDetalle(URL, data) {
    data.usuarioModificacion = this.authService.codigoUsuario;
    return new Promise(resolve => {
      this.http.put(this.API_URL + URL,
        JSON.stringify(data),
        { headers: new HttpHeaders().set('Authorization', this.authService.token).set('Content-Type', 'application/json') })
        .subscribe(res => {
          //alert(data);
          var data = { respuestaCodigo: 0 };
          resolve(data);
        }, err => {
          var data;
          console.log(err);
          if (err.error) {
            data = { respuestaCodigo: -1, error: err.error };
          } else {
            data = { respuestaCodigo: -1, error: "Servicio no disponible por el momento, inténtelo mas tarde" };
          }
          resolve(data);
        });
    });
  }

  async actualizarDetalles(URL, data: any[]) {
    data.forEach(t => {
      t.usuarioModificacion = this.authService.codigoUsuario;
    });
    return new Promise(resolve => {
      this.http.put(this.API_URL + URL+ '/varios',
        JSON.stringify(data),
        { headers: new HttpHeaders().set('Authorization', this.authService.token).set('Content-Type', 'application/json') })
        .subscribe(res => {
          //alert(data);
          var data = { respuestaCodigo: 0 };
          resolve(data);
        }, err => {
          var data;
          console.log(err);
          if (err.error) {
            data = { respuestaCodigo: -1, error: err.error };
          } else {
            data = { respuestaCodigo: -1, error: "Servicio no disponible por el momento, inténtelo mas tarde" };
          }
          resolve(data);
        });
    });
  }

  async actualizarDetalleLicenciatario(URL, data) {
    data.usuarioModificacion = this.authService.codigoUsuario;
    return new Promise(resolve => {
      this.http.put(this.API_URL + URL + '/' + this.authService.codigoLicenciatario,
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

  async actualizarDetallesLicenciatario(URL, data: any[] ){
    data.forEach(t => {
      t.usuarioModificacion = this.authService.codigoUsuario;
    });
    return new Promise(resolve => {
      this.http.put(this.API_URL + URL + '/varios/' + this.authService.codigoLicenciatario,
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
