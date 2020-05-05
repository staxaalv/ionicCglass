import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AutenticacionService } from '../generales/autenticacion.service';
import { reject } from 'q';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SriService {
  API_URL = environment.apiUrlSri;
  CLASE_CONTRIBUYENTE_RTF_URL='/claseContribuyenteRtf';
  ERRORES_INSTITUCION_CONTR_URL='/errorInstControl';
  IMPUESTO_URL='/impuesto';
  IMPUESTO_TARIFA_URL='/impuestoTarifa';
  PTO_EMISION_TIPO_COMPROBANT_URL='/ptoEmisionTipoComprobante';
  RETENCION_FUENTE_URL='/retencionFuente';
  RETENCION_FUENTE_PORCENTAJE_URL='/retencionFuentePorcentaje';
  TIPO_BIEN_SERVICIO_URL='/tipoBienServicio';
  TIPO_COMPROBANTE_URL='/tipoComprobante';
  SECUENCIA_PRIMARIA_URL='/secuenciaPrimaria';

  //Select
  subjectOpcionesSriClaseContribuyenteRTF: Subject<any> = new Subject<any>();
  subjectOpcionesSriErroresInstitucionContr: Subject<any> = new Subject<any>();
  subjectOpcionesSriImpuesto: Subject<any> = new Subject<any>();
  subjectOpcionesSriImpuestoTarifa: Subject<any> = new Subject<any>();
  subjectOpcionesSriPtoEmisionTipoComprobante: Subject<any> = new Subject<any>();
  subjectOpcionesSriRetencionFuente: Subject<any> = new Subject<any>();
  subjectOpcionesSriRetencionFuentePorcentaje: Subject<any> = new Subject<any>();
  subjectOpcionesSriTipoBienServicio: Subject<any> = new Subject<any>();
  subjectOpcionesSriTipoComprobante: Subject<any> = new Subject<any>();
  subjectOpcionesSriSecuenciaPrimaria: Subject<any> = new Subject<any>();

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

  /*getAplicacionSelect(opciones: any[]) {
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
  }*/

  getClaseContribuyenteRtfSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.CLASE_CONTRIBUYENTE_RTF_URL)
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

  getErroresInstitucionContrSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.ERRORES_INSTITUCION_CONTR_URL)
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

  getImpuestoSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.IMPUESTO_URL)
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
  getImpuestoTarifaSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.IMPUESTO_TARIFA_URL)
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
  getPtoEmisionTipoComprobantSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.PTO_EMISION_TIPO_COMPROBANT_URL)
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
  getRetencionFuenteSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.RETENCION_FUENTE_URL)
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
  getRetencionFuentePorcentajeSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.RETENCION_FUENTE_PORCENTAJE_URL)
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
  getTipoBienServicioSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.TIPO_BIEN_SERVICIO_URL)
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

  getTipoComprobanteSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.TIPO_COMPROBANTE_URL)
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
  getSecuenciaPrimariaSelect(opciones: any[]) {
    opciones.splice(0, opciones.length);
    this.getDetalle(this.SECUENCIA_PRIMARIA_URL)
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

 }
