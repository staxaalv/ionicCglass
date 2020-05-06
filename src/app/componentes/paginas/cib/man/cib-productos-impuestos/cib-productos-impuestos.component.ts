import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/cib/man/ACComponent';
import { CibService } from 'src/app/servicios/cib/cib.service';
import { SriService } from 'src/app/servicios/sri/sri.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-cib-productos-impuestos',
  templateUrl: './cib-productos-impuestos.component.html',
  styleUrls: ['./cib-productos-impuestos.component.css']
})
export class CibProductosImpuestosComponent extends ACComponent {

  opcionesProductos:any[]=[]
  opcionesImpuestoTarifa:any[]=[]

  constructor(protected sriService: SriService,protected cibService: CibService, protected sanitizer: DomSanitizer) {
    super(cibService, sanitizer, "Lista Producto Impuesto", cibService.PRODUCTO_IMPUESTO_URL, false, cibService.subjectOpcionesProductoImpuesto);

    this.cibService.getProductoSelect(this.opcionesProductos);
    this.sriService.getImpuestoTarifaSelect(this.opcionesImpuestoTarifa);

    this.cargarColumnas();

    this.cibService.subjectOpcionesUnidadesMedidas.subscribe(()=>{
      this.cibService.getProductoSelect(this.opcionesProductos);
    });
    this.sriService.subjectOpcionesSriImpuestoTarifa.subscribe(()=>{
      this.sriService.getImpuestoTarifaSelect(this.opcionesImpuestoTarifa);
    });

  }
  modificarDatos() {
    this.detalle.forEach(t => {
      t.productoId = {
        'codigo': t.id.cibProducCodigo,
        'ageLicencCodigo': t.id.cibProducAgeLicencCodigo
      }
      t.impuestoTarifaId={
        'codigo': t.id.sriTarImCodigo,
        'sriImpuesCodigo': t.id.sriTarImSriImpuesCodigo
      }
    });
  }

  modificarDatosGuardar(t){
    t.id.cibProducCodigo=t.productoId.codigo;
    t.id.cibProducAgeLicencCodigo=t.productoId.ageLicencCodigo;

    t.id.sriTarImCodigo=t.impuestoTarifaId.codigo;
    t.id.sriTarImSriImpuesCodigo=t.impuestoTarifaId.sriImpuesCodigo;
  }

  cargarColumnas() {
    this.cols = [
      {
        field: 'productoId',
        header: 'Producto',
        width: this.sanitizer.bypassSecurityTrustStyle('width:15%'),
        opciones: this.opcionesProductos,
        async: true,
        required: true
      },
      {
        field: 'impuestoTarifaId',
        header: 'Tarifa Impuesto',
        width: this.sanitizer.bypassSecurityTrustStyle('width:15%'),
        opciones: this.opcionesImpuestoTarifa,
        async: true,
        required: true
      },
      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:30%'),
        opciones: [{ label: 'Activo', value: 'A' },
        { label: 'Inactivo', value: 'I' }]
      },
      {
        field: 'observacionEstado',
        header: 'Observación Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:45%')
      }
    ];
  }

  agregar() {
    this.detalle.unshift({
      'id':{
        'cibProducCodigo':0,
        'cibProducAgeLicencCodigo':0,
        'sriTarImCodigo':0,
        'sriTarImSriImpuesCodigo':0
      },
      'estado': 'A',
      'observacionEstado': '',
      'fechaIngreso': Date.now(),
      'fechaEstado': Date.now(),
      'nuevo': true
    });
  }

  cargarCodigos(detallesNuevos: any [], datosGuardados: any[]) {
    for (let index = 0; index < datosGuardados.length; index++) {
      detallesNuevos[index].codigo = datosGuardados[index].codigo;
      detallesNuevos[index].nuevo = false;
    }
  }


}
