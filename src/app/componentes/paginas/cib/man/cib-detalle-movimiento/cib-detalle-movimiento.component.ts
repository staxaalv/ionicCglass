import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/cib/man/ACComponent';
import { CibService } from 'src/app/servicios/cib/cib.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-cib-detalle-movimiento',
  templateUrl: './cib-detalle-movimiento.component.html',
  styleUrls: ['./cib-detalle-movimiento.component.css']
})
export class CibDetalleMovimientoComponent extends ACComponent {
  opcionesCabeceraMovimiento:any[]=[]
  opcionesUnidadMedida:any[]=[]
  opcionesProductos:any[]=[]

  constructor(protected cibService: CibService, protected sanitizer: DomSanitizer) {
    super(cibService, sanitizer, "Lista Detalle Movimiento", cibService.DETALLE_MOVIMIENTO_URL, false, cibService.subjectOpcionesDetalleMovimiento);

    this.cibService.getCabeceraMovimientoSelect(this.opcionesCabeceraMovimiento);
    this.cibService.getUnidadMedidaSelect(this.opcionesUnidadMedida);
    this.cibService.getProductoSelect(this.opcionesProductos);

    this.cargarColumnas();

    this.cibService.subjectOpcionesCabeceraMovimiento.subscribe(()=>{
      this.cibService.getCabeceraMovimientoSelect(this.opcionesCabeceraMovimiento);
    });
    this.cibService.subjectOpcionesUnidadesMedidas.subscribe(()=>{
      this.cibService.getUnidadMedidaSelect(this.opcionesUnidadMedida);
    });
    this.cibService.subjectOpcionesProducto.subscribe(()=>{
      this.cibService.getProductoSelect(this.opcionesProductos);
    });


  }

  modificarDatos() {
    this.detalle.forEach(t => {
      t.cabeceraId = {
        'codigo': t.id.cibCabMoCodigo,
        'ageLicencCodigo': t.id.cibCabMoAgeLicencCodigo
      };
      t.UnidadMedidaId = {
        'codigo': t.cibUniMeCodigo,
        'ageLicencCodigo': t.cibUniMeAgeLicencCodigo
      };
      t.productoId = {
        'codigo': t.cibProducCodigo,
        'ageLicencCodigo': t.cibProducAgeLicencCodigo
      };
    });
  }

  modificarDatosGuardar(t){
    t.id.cibCabMoCodigo=t.cabeceraId.codigo;
    t.id.cibCabMoAgeLicencCodigo = t.cabeceraId.ageLicencCodigo;
    t.cibUniMeCodigo=t.UnidadMedidaId.codigo;
    t.cibUniMeAgeLicencCodigo=t.UnidadMedidaId.ageLicencCodigo
    t.cibProducCodigo=t.productoId.codigo;
    t.cibProducAgeLicencCodigo=t.productoId.ageLicencCodigo;
  }

  cargarColumnas() {
    this.cols = [
      {
        field: 'id',
        field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:55px'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'cabeceraId',
        header: 'Cabecera Movimiento',
        width: this.sanitizer.bypassSecurityTrustStyle('width:95px'),
        opciones: this.opcionesCabeceraMovimiento,
        async: true,
        required: true
      },
      {
        field: 'UnidadMedidaId',
        header: 'Unidad Medida',
        width: this.sanitizer.bypassSecurityTrustStyle('width:95px'),
        opciones: this.opcionesUnidadMedida,
        async: true,
        required: true
      },
      {
        field: 'productoId',
        header: 'Producto',
        width: this.sanitizer.bypassSecurityTrustStyle('width:95px'),
        opciones: this.opcionesProductos,
        async: true,
        required: true
      },
      {
        field: 'cantidad',
        header: 'cantidad',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'costoUnitario',
        header: 'Costo Unitario',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        opciones: [{ label: 'Activo', value: 'A' },
        { label: 'Inactivo', value: 'I' }]
      },
      {
        field: 'observacionEstado',
        header: 'Observación Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:125px')
      }
    ];
  }

  agregar() {
    this.detalle.unshift({
      'id': {
        'codigo': 0,
        'cibCabMoCodigo':0,
        'cibCabMoAgeLicencCodigo':0
      },
      'cibUniMeCodigo':0,
      'cibUniMeAgeLicencCodigo':0,
      'cibProducCodigo':0,
      'cibProducAgeLicencCodigo':0,
      'estado': 'A',
      'cantidad':1,
      'costoUnitario':1,
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
