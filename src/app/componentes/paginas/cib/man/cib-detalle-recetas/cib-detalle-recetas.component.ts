import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/cib/man/ACComponent';
import { CibService } from 'src/app/servicios/cib/cib.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-cib-detalle-recetas',
  templateUrl: './cib-detalle-recetas.component.html',
  styleUrls: ['./cib-detalle-recetas.component.css']
})
export class CibDetalleRecetasComponent extends ACComponent {
  opcionesCabeceraReceta:any[]=[]
  opcionesUnidadMedida:any[]=[]
  opcionesProductos:any[]=[]

  constructor(protected cibService: CibService, protected sanitizer: DomSanitizer) {
    super(cibService, sanitizer, "Lista Detalle Receta", cibService.DETALLE_RECETA_URL, false, cibService.subjectOpcionesDetalleReceta);


    this.cibService.getCabeceraRecetaSelect(this.opcionesCabeceraReceta);
    this.cibService.getUnidadMedidaSelect(this.opcionesUnidadMedida);
    this.cibService.getProductoSelect(this.opcionesProductos);

    this.cargarColumnas();

    this.cibService.subjectOpcionesDetalleReceta.subscribe(()=>{
      this.cibService.getCabeceraRecetaSelect(this.opcionesCabeceraReceta);
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
        'codigo': t.id.cibCabReCodigo,
        'ageLicencCodigo': t.id.cibCabReAgeLicencCodigo
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
    t.id.cibCabReCodigo=t.cabeceraId.codigo;
    t.id.cibCabReAgeLicencCodigo = t.cabeceraId.ageLicencCodigo;
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
        header: 'Cabecera Receta',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
        opciones: this.opcionesCabeceraReceta,
        async: true,
        required: true
      },
      {
        field: 'UnidadMedidaId',
        header: 'Unidad Medida',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
        opciones: this.opcionesUnidadMedida,
        async: true,
        required: true
      },
      {
        field: 'productoId',
        header: 'Producto',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
        opciones: this.opcionesProductos,
        async: true,
        required: true
      },
      {
        field: 'cantidad',
        header: 'Cantidad',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'descripcionPrepracion',
        header: 'Descripción Preparación',
        width: this.sanitizer.bypassSecurityTrustStyle('width:125px'),
        required:true
      },
      {
        field: 'ordenDePreparacion',
        header: 'Orden Preparación',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
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
        'cibCabReCodigo':0,
        'cibCabReAgeLicencCodigo':0
      },
      'cibUniMeCodigo':0,
      'cibUniMeAgeLicencCodigo':0,
      'cibProducCodigo':0,
      'cibProducAgeLicencCodigo':0,
      'cantidad':1,
      'descripcionPrepracion':'',
      'ordenDePreparacion':1,
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
