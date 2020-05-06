import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/cib/man/ACComponent';
import { CibService } from 'src/app/servicios/cib/cib.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AgeService } from 'src/app/servicios/age/age.service';

@Component({
  selector: 'app-cib-sucursales-inventario',
  templateUrl: './cib-sucursales-inventario.component.html',
  styleUrls: ['./cib-sucursales-inventario.component.css']
})
export class CibSucursalesInventarioComponent extends ACComponent {

  opcionesProductos:any[]=[];
  opcionesSucursal: any[] = [];

  constructor(protected ageService: AgeService,protected cibService: CibService, protected sanitizer: DomSanitizer) {
    super(cibService, sanitizer, "Lista Inventario Sucursal", cibService.INVENTARIO_SUCURSALES_URL, false, cibService.subjectOpcionesInventarioSucursales);

    this.cibService.getProductoSelect(this.opcionesProductos);
    this.ageService.getSucursalIdSelect(this.opcionesSucursal);
    this.cargarColumnas();

    this.cibService.subjectOpcionesUnidadesMedidas.subscribe(()=>{
      this.cibService.getProductoSelect(this.opcionesProductos);
    });
    this.ageService.subjectOpcionesSucursal.subscribe(() => {
      this.ageService.getSucursalIdSelect(this.opcionesSucursal);
    });

  }
  modificarDatos() {
    this.detalle.forEach(t => {
      t.productoId = {
        'codigo': t.id.cibProducCodigo,
        'ageLicencCodigo': t.id.cibProducAgeLicencCodigo
      };
      t.sucursalesId={
        'codigo': t.id.ageSucursCodigo,
        'ageLicencCodigo': t.id.ageSucursAgeLicencCodigo
      };
    });
  }

  modificarDatosGuardar(t){
    t.id.cibProducCodigo=t.productoId.codigo;
    t.id.cibProducAgeLicencCodigo=t.productoId.ageLicencCodigo;

    t.id.ageSucursCodigo=t.sucursalesId.codigo;
    t.id.ageSucursAgeLicencCodigo=t.sucursalesId.ageLicencCodigo;
  }
   cargarColumnas() {
    this.cols = [
      {
        field: 'productoId',
        header: 'Producto',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        opciones: this.opcionesProductos,
        async: true,
        required: true
      },
      {
        field: 'sucursalesId',
        header: 'Sucursal',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        opciones: this.opcionesSucursal,
        async: true,
        required: true
      },
      {
        field: 'existencia',
        header: 'Existencia',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number'
      },
      {
        field: 'existenciaMaxima',
        header: 'Existencia Máxima',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number'
      },
      {
        field: 'existenciaMinima',
        header: 'Existencia Mínima',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number'
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
        width: this.sanitizer.bypassSecurityTrustStyle('width:135px')
      }
    ];
  }

  agregar() {
    this.detalle.unshift({
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
