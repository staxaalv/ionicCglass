import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/cib/man/ACComponent';
import { CibService } from 'src/app/servicios/cib/cib.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cib-productos-adicionales',
  templateUrl: './cib-productos-adicionales.component.html',
  styleUrls: ['./cib-productos-adicionales.component.css']
})
export class CibProductosAdicionalesComponent extends ACComponent {

  opcionesProductos:any[]=[]

  constructor(protected cibService: CibService, protected sanitizer: DomSanitizer) {
    super(cibService, sanitizer, "Lista Producto Adicional", cibService.PRODUCTO_ADICIONAL_URL, false, cibService.subjectOpcionesProductoAdicional);

    this.cibService.getProductoSelect(this.opcionesProductos);

    this.cargarColumnas();

    this.cibService.subjectOpcionesUnidadesMedidas.subscribe(()=>{
      this.cibService.getProductoSelect(this.opcionesProductos);
    });
  }

  modificarDatos() {
    this.detalle.forEach(t => {
      t.productoId1 = {
        'codigo': t.id.cibProducCodigo,
        'ageLicencCodigo': t.id.cibProducAgeLicencCodigo
      }
      t.productoId2 = {
        'codigo': t.id.cibProducCodigoEstar,
        'ageLicencCodigo': t.id.cibProducAAgeLicencCodigo
      }
    });
  }

  modificarDatosGuardar(t){
    t.id.cibProducCodigo=t.productoId1.codigo;
    t.id.cibProducAgeLicencCodigo=t.productoId1.ageLicencCodigo;
    t.id.cibProducCodigoEstar=t.productoId2.codigo;
    t.id.cibProducAAgeLicencCodigo=t.productoId2.ageLicencCodigo;

  }

   cargarColumnas() {
    this.cols = [
      {
        field: 'productoId1',
        header: 'Producto',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        opciones: this.opcionesProductos,
        async: true,
        required: true
      },
      {
        field: 'productoId2',
        header: 'Producto Estar',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        opciones: this.opcionesProductos,
        async: true,
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
        width: this.sanitizer.bypassSecurityTrustStyle('width:145px')
      }
    ];
  }

  agregar() {
    this.detalle.unshift({
      'id':{
        'cibProducCodigo':0,
        'cibProducAgeLicencCodigo':0,
        'cibProducCodigoEstar':0,
        'cibProducAAgeLicencCodigo':0
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
