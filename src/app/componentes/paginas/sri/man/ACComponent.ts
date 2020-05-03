import { Message } from 'primeng/api';
import { SriService } from 'src/app/servicios/sri/sri.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';

export abstract class ACComponent {

    detalle: any[] = [];
    loading: boolean = true;
    errorGuardar: boolean = false;
    cols: any[];
    msgsIngresar: Message[] = [];
    msgsActualizar: Message[] = [];
    listaEliminar: any[] = [];

    constructor(protected sriService: SriService,
        protected sanitizer: DomSanitizer,
        protected titulo: String,
        protected url: String,
        protected conLicenciatario: boolean,
        protected subject ?: Subject<any>) {
        this.getDetalles();
    }

    abstract cargarColumnas();

    abstract agregar();

    abstract cargarCodigos(detallesNuevos: any[], datosGuardados: any[]);

    modificarDatos(){}

    getDetalles() {
        this.loading = true;
        this.cargarColumnas();
        if (this.conLicenciatario) {
            this.sriService
                .getDetalleLicenciatario(this.url)
                .then((res: any) => {
                    this.loading = false;
                    if (res.respuestaCodigo == 0) {
                        if (res.data) {
                            this.detalle = res.data;
                            this.modificarDatos();
                        }
                    } else {
                        this.msgsIngresar.push({ severity: 'error', summary: 'Error al consultar: ', detail: 'Intente nuevamente' });
                    }
                });
        } else {
            this.sriService
                .getDetalle(this.url)
                .then((res: any) => {
                    this.loading = false;
                    if (res.respuestaCodigo == 0) {
                        if (res.data) {
                            this.detalle = res.data;
                            this.modificarDatos();
                        }
                    } else {
                        this.msgsIngresar.push({ severity: 'error', summary: 'Error al consultar: ', detail: 'Intente nuevamente' });
                    }
                });
        }

    }

    modificarDatosGuardar(t){}

    guardar() {
        let detallesNuevos: any[] = [];
        let detallesModificar: any[] = [];
        this.detalle.map(t => {
            if (t.nuevo) {
                this.loading = true;
                this.modificarDatosGuardar(t);
                detallesNuevos.push(t);
            } else if (t.modificado) {
                this.loading = true;
                this.modificarDatosGuardar(t);
                detallesModificar.push(t);
            }
        });
        if (detallesNuevos.length > 0) {
            this.sriService.insertarDetalles(this.url, detallesNuevos).then((data: any) => {
                this.loading = false;
                if (data.respuestaCodigo === -1) {
                    this.msgsIngresar = [];
                    this.msgsIngresar.push({ severity: 'error', summary: 'Error al agregar: ', detail: JSON.stringify(data.error.message) });
                } else {
                    this.cargarCodigos(detallesNuevos, data.data);
                    this.msgsIngresar = [];
                    this.msgsIngresar.push({ severity: 'success', summary: 'Guardado con éxito ' });
                    if(this.subject){
                        this.subject.next();
                    }
                    setTimeout(() => {
                        this.msgsIngresar = [];
                    }, 5000);
                }
            });
        }
        if (detallesModificar.length > 0) {
            this.sriService.actualizarDetalles(this.url, detallesModificar).then((data: any) => {
                this.loading = false;
                if (data.respuestaCodigo === -1) {
                    this.msgsActualizar = [];
                    this.msgsActualizar.push({ severity: 'error', summary: 'Error al actualizar: ', detail: JSON.stringify(data.error.message) });
                } else {
                    detallesModificar.forEach(t => {
                        t.modificado = false;
                    });
                    if(this.subject){
                        this.subject.next();
                    }
                    this.msgsActualizar = [];
                    this.msgsActualizar.push({ severity: 'success', summary: 'Actualizado con éxito ' });
                    setTimeout(() => {
                        this.msgsActualizar = [];
                    }, 5000);
                }
            });
        }
    }

    eliminar(listaEliminar) {
        this.loading = true;
        let listaEliminarBase: any[] = [];
        listaEliminar.map(select => {
            if (!select.nuevo) {
                select.estado = "N";
                listaEliminarBase.push(select);
            }
        });
        this.sriService.actualizarDetalles(this.url, listaEliminarBase).then((data: any) => {
            this.loading = false;
            if (data.respuestaCodigo === -1) {
                this.msgsActualizar = [];
                this.msgsActualizar.push({ severity: 'error', summary: 'Error al eliminar: ', detail: JSON.stringify(data.error.message) });
            } else {
                listaEliminar.map(select => {
                    let i = this.detalle.indexOf(select);
                    this.detalle.splice(i, 1)
                });
                if(this.subject){
                    this.subject.next();
                }
                this.listaEliminar = [];
                this.msgsActualizar = [];
                this.msgsActualizar.push({ severity: 'success', summary: 'Eliminado con éxito ' });
                setTimeout(() => {
                    this.msgsActualizar = [];
                }, 5000);
            }
        });

    }
}
