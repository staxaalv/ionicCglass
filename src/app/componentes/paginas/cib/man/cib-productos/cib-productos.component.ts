import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/cib/man/ACComponent';
import { CibService } from 'src/app/servicios/cib/cib.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AgeService } from 'src/app/servicios/age/age.service';
import { SriService } from 'src/app/servicios/sri/sri.service';
@Component({
  selector: 'app-cib-productos',
  templateUrl: './cib-productos.component.html',
  styleUrls: ['./cib-productos.component.css']
})
export class CibProductosComponent extends ACComponent {

  opcionesUnidadMedida:any[]=[]
  opcionesMarca:any[]=[]
  opcionesSubLineas:any[]=[]
  opcionesRetencionFtePorcentaje:any[]=[]
  opcionesTipoBienServicio:any[]=[]

  constructor(protected ageService: AgeService,protected sriService: SriService,protected cibService: CibService, protected sanitizer: DomSanitizer) {
    super(cibService, sanitizer, "Lista Producto", cibService.PRODUCTO_URL, false, cibService.subjectOpcionesProducto);

    this.cibService.getUnidadMedidaSelect(this.opcionesUnidadMedida);
    this.cibService.getMarcaSelect(this.opcionesMarca);
    this.cibService.getSubLineasSelect(this.opcionesSubLineas);
    this.sriService.getRetencionFuentePorcentajeSelect(this.opcionesRetencionFtePorcentaje);
    this.sriService.getTipoBienServicioSelect(this.opcionesTipoBienServicio);

    this.cargarColumnas();

    this.cibService.subjectOpcionesUnidadesMedidas.subscribe(()=>{
      this.cibService.getUnidadMedidaSelect(this.opcionesUnidadMedida);
    });
    this.cibService.subjectOpcionesMarca.subscribe(()=>{
      this.cibService.getMarcaSelect(this.opcionesMarca);
    });
    this.cibService.subjectOpcionesSublinea.subscribe(()=>{
      this.cibService.getSubLineasSelect(this.opcionesSubLineas);
    });
    this.sriService.subjectOpcionesSriRetencionFuentePorcentaje.subscribe(()=>{
      this.sriService.getRetencionFuentePorcentajeSelect(this.opcionesRetencionFtePorcentaje);
    });
    this.sriService.subjectOpcionesSriTipoBienServicio.subscribe(()=>{
      this.sriService.getTipoBienServicioSelect(this.opcionesTipoBienServicio);
    });
  }

  modificarDatos() {
    this.detalle.forEach(t => {
      t.unidadMedidaId = {
        'codigo': t.cibUniMeCodigo,
        'ageLicencCodigo': t.cibUniMeAgeLicencCodigo
      }
      t.marcaId = {
        'codigo': t.cibMarcaCodigo,
        'ageLicencCodigo': t.cibMarcaAgeLicencCodigo
      }
      t.subLineaId={
        'codigo': t.cibSubLiCodigo,
        'cibLineaCodigo': t.cibSubLiCibLineaCodigo,
        'cibLineaAgeLicencCodigo': t.cibSubLiAgeLicencCodigo
      }
      t.retFtePorcentajeId={
        'codigo': t.sriRtfPoCodigo,
        'sriRetFuCodigo': t.sriRtfPoSr1RetFuCodigo
      }
    });
  }

  modificarDatosGuardar(t){
    t.cibUniMeCodigo=t.unidadMedidaId.codigo;
    t.cibUniMeAgeLicencCodigo=t.unidadMedidaId.ageLicencCodigo;

    t.cibMarcaCodigo = t.marcaId.codigo;
    t.cibMarcaAgeLicencCodigo = t.marcaId.ageLicencCodigo;

    t.cibSubLiCodigo=t.subLineaId.codigo;
    t.cibSubLiCibLineaCodigo=t.subLineaId.cibLineaCodigo;
    t.cibSubLiAgeLicencCodigo=t.subLineaId.cibLineaAgeLicencCodigo;

    t.sriRtfPoCodigo=t.retFtePorcentajeId.codigo;
    t.sriRtfPoSr1RetFuCodigo=t.retFtePorcentajeId.sriRetFuCodigo;
  }

   cargarColumnas() {
    this.cols = [
      {
        field: 'id',
        field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'unidadMedidaId',
        header: 'Unidad de Medida',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
        opciones: this.opcionesUnidadMedida,
        async: true,
        required: true
      },
      {
        field: 'marcaId',
        header: 'Marca',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
        opciones: this.opcionesMarca,
        async: true
      },
      {
        field: 'subLineaId',
        header: 'Sublinea',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
        opciones: this.opcionesSubLineas,
        async: true,
        required: true
      },
      {
        field: 'sriTipBsCodigo',
        header: 'Tipo Bien Servicio',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
        opciones: this.opcionesTipoBienServicio,
        async: true,
        required:true
      },
      {
        field: 'retFtePorcentajeId',
        header: 'Porcentaje Retención Fuente',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
        opciones: this.opcionesRetencionFtePorcentaje,
        async: true,
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:110px'),
        required: true
      },
      {
        field: 'afectaInventario',
        header: 'Afecta Inventario',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' },{ label: 'Nulo', value: null }]
      },
      {
        field: 'codigoExterno',
        header: 'Código Externo',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px')
      },
      {
        field: 'controlaExistencia',
        header: 'Controla Existencia',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }]
      },
      {
        field: 'disponibleVenta',
        header: 'Disponible Venta',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' },{ label: 'Nulo', value: null }]
      },
      {
        field: 'imagenProducto',
        header: 'Imagen',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'image'
      },
      {
        field: 'porcentajeDesperdicio',
        header: 'Porcentaje Desperdicio %',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number'
      },
      {
        field: 'porcentajeDesperdicioDeCada',
        header: 'De Cada (PD)',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number'
      },
      {
        field: 'porcentajeUtilidad',
        header: 'Porcentaje Utilidad %',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number'
      },
      {
        field: 'porcentajeUtilidadDeCada',
        header: 'De Cada (PU)',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number'
      },
      {
        field: 'precio',
        header: 'precio',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number'
      },
      {
        field: 'serie',
        header: 'Serie',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px')
      },
      {
        field: 'tieneAdicionales',
        header: 'Tiene Adicionales',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }]
      },
      {
        field: 'tieneReceta',
        header: 'Tiene Receta',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' },{ label: 'Nulo', value: null }]
      },
      {
        field: 'tipoProducto',
        header: 'Tipo Producto',
        width: this.sanitizer.bypassSecurityTrustStyle('width:110px'),
        opciones: [{ label: 'Insumo Simple', value: 'IS' },
        { label: 'Insumo Compuesto', value: 'IC' },
        { label: 'Producto Simple', value: 'PS' },
        { label: 'Producto Compuesto', value: 'PC' }]
      },

      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        opciones: [{ label: 'Activo', value: 'A' },
        { label: 'Inactivo', value: 'I' }],
        required:true
      },
      {
        field: 'observacionEstado',
        header: 'Observación Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:110px')
      }
    ];
  }

  agregar() {
    this.detalle.unshift({
      'id': {
        'codigo': 0,
        'ageLicencCodigo': this.ageService.authService.codigoLicenciatario
      },
      'descripcion': '',
      'controlaExistencia':'N',
      'tieneReceta': 'N',
      'tipoProducto':'IS',
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
