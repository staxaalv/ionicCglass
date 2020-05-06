import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AutenticacionService } from '../generales/autenticacion.service';
import { reject } from 'q';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CibService {

  API_URL = environment.apiUrlCib;
  UNIDADES_MEDIDAS_URL = "/unidadesMedidas";
  EQUIVALENCIA_UNIDADES_MEDIDAS_URL = "/equivalenciaUnidadesMedida";
  MARCA_URL = "/marca";
  LINEA_URL = "/linea";
  SUBLINEA_URL = "/sublinea";
  PRODUCTO_URL = "/producto";
  PRODUCTO_IMPUESTO_URL = "/productoImpuesto";
  PRODUCTO_ADICIONAL_URL = "/productoAdicional";
  INVENTARIO_SUCURSALES_URL = "/invetarioSucursales";
  CABECERA_MOVIMIENTO_URL = "/cabeceraMovimiento";
  DETALLE_MOVIMIENTO_URL = "/detalleMovimiento";
  CABECERA_RECETA_URL = "/cabeceraReceta";
  DETALLE_RECETA_URL = "/detalleReceta";
  SECUENCIAS_PRIMARIAS_URL="/secuenciaPrimaria";
  SECUENCIAS_LICENCIATARIOS="/cibLicenciatariosAplicaSecu";

  //Selects
  subjectOpcionesUnidadesMedidas: Subject<any> = new Subject<any>();
  subjectOpcionesEquivalenciaUnidadesMedidas: Subject<any> = new Subject<any>();
  subjectOpcionesMarca: Subject<any> = new Subject<any>();
  subjectOpcionesLinea: Subject<any> = new Subject<any>();
  subjectOpcionesSublinea: Subject<any> = new Subject<any>();
  subjectOpcionesProducto: Subject<any> = new Subject<any>();
  subjectOpcionesProductoImpuesto: Subject<any> = new Subject<any>();
  subjectOpcionesProductoAdicional: Subject<any> = new Subject<any>();
  subjectOpcionesInventarioSucursales: Subject<any> = new Subject<any>();
  subjectOpcionesCabeceraMovimiento: Subject<any> = new Subject<any>();
  subjectOpcionesDetalleMovimiento: Subject<any> = new Subject<any>();
  subjectOpcionesCabeceraReceta: Subject<any> = new Subject<any>();
  subjectOpcionesDetalleReceta: Subject<any> = new Subject<any>();
  subjectOpcionesSecuenciasPrimarias: Subject<any> = new Subject<any>();
  subjectOpcionesSecuenciasLicenciatarios: Subject<any> = new Subject<any>();



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

  getSecuenciaPrimariaSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.SECUENCIAS_PRIMARIAS_URL)
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

  getUnidadMedidaSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.UNIDADES_MEDIDAS_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                //{ label: data.descripcion.toUpperCase(), value: data.id.codigo }
                { label: data.descripcion.toUpperCase(), value: data.id }
              );
            });
          }
        }
      });
  }

  getLineasSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.LINEA_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                //{ label: data.descripcion.toUpperCase(), value: data.id.codigo }
                { label: data.descripcion.toUpperCase(), value: data.id }
              );
            });
          }
        }
      });
  }

  getSubLineasSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.SUBLINEA_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                //{ label: data.descripcion.toUpperCase(), value: data.id.codigo }
                { label: data.descripcion.toUpperCase(), value: data.id}
              );
            });
          }
        }
      });
  }

  getMarcaSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.MARCA_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            opciones.push({ label: "Nulo", value: {'codigo':null,'ageLicencCodigo':null} });
            res.data.forEach(data => {
              opciones.push(
                //{ label: data.descripcion.toUpperCase(), value: data.id.codigo }
                { label: data.descripcion.toUpperCase(), value: data.id }
              );
            });
          }
        }
      });
  }
  getProductoSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.PRODUCTO_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            //opciones.push({ label: "Nulo", value: {'codigo':null,'ageLicencCodigo':null} });
            res.data.forEach(data => {
              opciones.push(
                //{ label: data.descripcion.toUpperCase(), value: data.id.codigo }
                { label: data.descripcion.toUpperCase(), value: data.id }
              );
            });
          }
        }
      });
  }

  getCabeceraMovimientoSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.CABECERA_MOVIMIENTO_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                { label: data.descripcion.toUpperCase(), value: data.id}
              );
            });
          }
        }
      });
  }
  getCabeceraRecetaSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.CABECERA_RECETA_URL)
      .then((res: any) => {
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            opciones.push({ label: "SELECCIONAR", value: 0 });
            res.data.forEach(data => {
              opciones.push(
                //{ label: data.descripcion.toUpperCase(), value: data.id}
                { label: data.descripcion.toUpperCase(), value: data.id}
              );
            });
          }
        }
      });
  }


}
