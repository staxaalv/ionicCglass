import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AutenticacionService } from '../generales/autenticacion.service';
import { reject } from 'q';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgeService {

  API_URL = environment.apiUrlAge;
  PAIS_URL = "/agePaises";
  PERFIL_URL = "/agePerfiles";
  USUARIO_URL = "/ageUsuarios";
  TIPO_IDENTIFICACION_URL = "/ageTiposIdentificaciones";
  SECUENCIA_PRIMARIA_URL = "/ageSecuenciasPrimarias";
  SUCURSAL_URL = "/ageSucursales";
  SECUENCIA_LICENCIATARIO_URL = "/ageLicenciatariosAplicaSecu";
  APLICACION_URL = "/ageAplicaciones";
  TIPO_SUCURSAL_URL = "/ageTiposSucursales";
  TIPO_LOCALIDAD_URL = "/ageTiposLocalidades";
  LOCALIDAD_URL = "/ageLocalidades";
  IDIOMAS_URL = "/ageIdiomas";
  MONEDAS_URL = "/ageMonedas";
  TRANSACCION_URL = "/ageTransacciones";
  PERFIL_TRANSACCION_URL = "/agePerfilesTransacciones";
  USUARIO_PERFIL_URL = "/ageUsuariosPerfiles";
  PARAMETRO_GENERAL_URL = "/ageParametrosGenerales";
  PUNTO_EMISION_URL = "/agePuntosEmisiones";
  USUARIO_PUNTO_EMISION_URL = "/ageUsuariosPuntoEmision";
  USUARIO_PARAMETRO_VIGENCIA_URL = "/ageUsuariosParamVigencias";
  FRANQUICIAS_URL = "/ageFranquicias";
  FORMAS_PAGOS_URL = "/ageFormasPagos";
  INSTITUCIONES_FINANCIERAS_URL = "/ageInstitucionesFinancieras";


  //Select
  subjectOpcionesTransaccion: Subject<any> = new Subject<any>();
  subjectOpcionesAplicacion: Subject<any> = new Subject<any>();
  subjectOpcionesTipoIdentificacion: Subject<any> = new Subject<any>();
  subjectOpcionesSucursal: Subject<any> = new Subject<any>();
  subjectOpcionesTipoSucursal: Subject<any> = new Subject<any>();
  subjectOpcionesTipoLocalidad: Subject<any> = new Subject<any>();
  subjectOpcionesLocalidad: Subject<any> = new Subject<any>();
  subjectOpcionesIdioma: Subject<any> = new Subject<any>();
  subjectOpcionesFranquicia: Subject<any> = new Subject<any>();
  subjectOpcionesFormasPago: Subject<any> = new Subject<any>();
  subjectOpcionesMoneda: Subject<any> = new Subject<any>();
  subjectOpcionesPais: Subject<any> = new Subject<any>();
  subjectOpcionesPerfil: Subject<any> = new Subject<any>();
  subjectOpcionesUsuario: Subject<any> = new Subject<any>();
  subjectOpcionesParametroGeneral: Subject<any> = new Subject<any>();
  subjectOpcionesPuntoEmision: Subject<any> = new Subject<any>();
  subjectOpcionesInstitucionFinanciera: Subject<any> = new Subject<any>();
  //** */
  subjectOpcionesUsuariosPuntoEmision: Subject<any> = new Subject<any>();

  constructor(public http: HttpClient, public authService: AutenticacionService) { }

  getDetalle(URL) {
    return new Promise<any>(resolve => {
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
      console.log(this.API_URL + URL + '/' + this.authService.codigoLicenciatario);
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
          console.log(err);
          resolve(data);
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
          var data = { respuestaCodigo: 0, codigo: res };
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
      this.http.put(this.API_URL + URL + '/varios',
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

  async actualizarDetallesLicenciatario(URL, data: any[]) {
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

  getAplicacionSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.APLICACION_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {

            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.codigoExterno.toUpperCase() + ' - ' + data.descripcion.toUpperCase(), value: data.codigo }
              );
            });
            return opciones;
          }
        }
      });
  }

  getTipoIdentificacionSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.TIPO_IDENTIFICACION_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.descripcion.toUpperCase(), value: data.codigo }
              );
            });
          }
        }
      });
  }

  getSucursalSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalleLicenciatario(this.SUCURSAL_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.descripcion.toUpperCase(), value: data.id.codigo }
              );
            });
          }
        }
      });
  }
  getSucursalIdSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalleLicenciatario(this.SUCURSAL_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            console.log("*******");
            console.log(res.data);
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.descripcion.toUpperCase(), value: data.id }
              );
            });
          }
        }
      });
  }

  getTipoSucursalSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalleLicenciatario(this.TIPO_SUCURSAL_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.descripcion.toUpperCase(), value: data.id.codigo }
              );
            });
          }
        }
      });
  }

  getLocalidadSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.LOCALIDAD_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.descripcion.toUpperCase(), value: data.id }
              );
            });
          }
        }
      });
  }

  getIdiomaSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.IDIOMAS_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.descripcion.toUpperCase(), value: data.codigo }
              );
            });
          }
        }
      });
  }

  getMonedaSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.MONEDAS_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.descripcion.toUpperCase(), value: data.codigo }
              );
            });
          }
        }
      });
  }

  getPaisSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.PAIS_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.descripcion.toUpperCase(), value: data.codigo }
              );
            });
          }
        }
      });
  }

  getTipoLocalidadSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.TIPO_LOCALIDAD_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.descripcion.toUpperCase(), value: data.id }
              );
            });
          }
        }
      });
  }

  getTransaccionSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.TRANSACCION_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {

            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.codigoExterno + ' - ' + data.descripcion.toUpperCase(), value: data.id.codigo, aplicacion: data.id.ageAplicaCodigo }
              );
            });
            return opciones;
          }
        }
      });
  }

  getPerfilSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalleLicenciatario(this.PERFIL_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.descripcion.toUpperCase(), value: data.id.codigo }
              );
            });
          }
        }
      });
  }

  getUsuarioSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalleLicenciatario(this.USUARIO_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.codigoExterno.toUpperCase(), value: data.id.codigo }
              );
            });
          }
        }
      });
  }

  getPuntoEmisionSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalleLicenciatario(this.PUNTO_EMISION_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.descripcion.toUpperCase(), value: data.id.codigo }
              );
            });
          }
        }
      });
  }

  getParametroGeneralSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.PARAMETRO_GENERAL_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.descripcion.toUpperCase(), value: data.codigo }
              );
            });
          }
        }
      });
  }
  /** */
  getUsuariosPuntoEmisionSelect(opciones: any[]) {
    this.getDetalle(this.USUARIO_PUNTO_EMISION_URL)
      .then((res: any) => {
        console.log(res);
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.id.agePunEmCodigo, value: data.id }
              );
              console.log(opciones);
            });

          }
        }
      });
  }

}
