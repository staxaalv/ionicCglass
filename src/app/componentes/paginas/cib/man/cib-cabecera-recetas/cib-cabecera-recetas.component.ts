import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/cib/man/ACComponent';
import { CibService } from 'src/app/servicios/cib/cib.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AgeService } from 'src/app/servicios/age/age.service';

@Component({
  selector: 'app-cib-cabecera-recetas',
  templateUrl: './cib-cabecera-recetas.component.html',
  styleUrls: ['./cib-cabecera-recetas.component.css']
})
export class CibCabeceraRecetasComponent extends ACComponent {

  opcionesProductos:any[]=[]

  constructor(protected ageService: AgeService,protected cibService: CibService, protected sanitizer: DomSanitizer) {
    super(cibService, sanitizer, "Lista Cabecera Receta", cibService.CABECERA_RECETA_URL, false, cibService.subjectOpcionesCabeceraReceta);

    this.cibService.getProductoSelect(this.opcionesProductos);

    this.cargarColumnas();

    this.cibService.subjectOpcionesProducto.subscribe(()=>{
      this.cibService.getProductoSelect(this.opcionesProductos);
    });

  }

  modificarDatos() {
    this.detalle.forEach(t => {
      t.productoId = {
        'codigo': t.cibProducCodigo,
        'ageLicencCodigo': t.cibProducAgeLicencCodigo
      };
    });
  }

  modificarDatosGuardar(t){
    t.cibProducCodigo=t.productoId.codigo;
    t.cibProducAgeLicencCodigo=t.productoId.ageLicencCodigo;
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
        field: 'productoId',
        header: 'Producto',
        width: this.sanitizer.bypassSecurityTrustStyle('width:15%'),
        opciones: this.opcionesProductos,
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
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        opciones: [{ label: 'Activo', value: 'A' },
        { label: 'Inactivo', value: 'I' }]
      },
      {
        field: 'observacionEstado',
        header: 'Observación Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px')
      }
    ];
  }

  agregar() {
    this.detalle.unshift({
      'id': {
        'codigo': 0,
        'ageLicencCodigo': this.ageService.authService.codigoLicenciatario
      },
      'cibProducAgeLicencCodigo':0,
      'cibProducCodigo':0,
      'descripcion': '',
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
