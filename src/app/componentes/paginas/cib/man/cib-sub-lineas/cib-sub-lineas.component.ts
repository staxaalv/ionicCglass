import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/cib/man/ACComponent';
import { CibService } from 'src/app/servicios/cib/cib.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cib-sub-lineas',
  templateUrl: './cib-sub-lineas.component.html',
  styleUrls: ['./cib-sub-lineas.component.css']
})
export class CibSubLineasComponent extends ACComponent {
  opcionesLineas:any[]=[]
  opcionesSubLineas:any[]=[]
  constructor(protected cibService: CibService, protected sanitizer: DomSanitizer) {
    super(cibService, sanitizer, "Lista Sub-Línea", cibService.SUBLINEA_URL, false, cibService.subjectOpcionesSublinea);
    this.cibService.getLineasSelect(this.opcionesLineas);
    this.cibService.getSubLineasSelect(this.opcionesSubLineas);

    this.cargarColumnas();

    this.cibService.subjectOpcionesLinea.subscribe(()=>{
      this.cibService.getLineasSelect(this.opcionesLineas);
    });

    this.cibService.subjectOpcionesSublinea.subscribe(()=>{
      this.cibService.getSubLineasSelect(this.opcionesSubLineas);
    });

  }


   modificarDatos() {
    this.detalle.forEach(t => {
      t.lineaField = {
        'codigo': t.id.cibLineaCodigo,
        'ageLicencCodigo': t.id.cibLineaAgeLicencCodigo
      };
      t.subLineaPadreField={
        'codigo': t.cibSubLiCodigo,
        'cibLineaCodigo': t.cibSubLiCibLineaCodigo,
        'cibLineaAgeLicencCodigo': t.cibSubLiAgeLicencCodigo
      }
    });
  }

  modificarDatosGuardar(t){
    t.id.cibLineaCodigo=t.lineaField.codigo;
    t.id.cibLineaAgeLicencCodigo=t.lineaField.ageLicencCodigo;

    t.cibSubLiCodigo=t.subLineaPadreField.codigo;
    t.cibSubLiCibLineaCodigo=t.subLineaPadreField.cibLineaCodigo;
    t.cibSubLiAgeLicencCodigo=t.subLineaPadreField.cibLineaAgeLicencCodigo;
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
        field: 'lineaField',
        header: 'Línea',
        width: this.sanitizer.bypassSecurityTrustStyle('width:95px'),
        opciones: this.opcionesLineas,
        async: true,
        required: true
      },
      {
        field: 'subLineaPadreField',
        header: 'Sub-Línea Padre',
        width: this.sanitizer.bypassSecurityTrustStyle('width:95px'),
        opciones: this.opcionesSubLineas,
        async: true,
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px'),
        required: true
      },
      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:95px'),
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
        'codigo': 0
      },
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
