import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/sri/man/ACComponent';
import { SriService } from 'src/app/servicios/sri/sri.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-sri-impuesto',
  templateUrl: './sri-impuesto.component.html',
  styleUrls: ['./sri-impuesto.component.css']
})
export class SriImpuestoComponent extends ACComponent {

  constructor(protected sriService: SriService, protected sanitizer: DomSanitizer) {
    super(sriService, sanitizer, "Lista Impuesto", sriService.IMPUESTO_URL, false, sriService.subjectOpcionesSriImpuesto);
  }

  cargarColumnas() {
    this.cols = [
      {
        field: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'codigoInstitucionControl',
        header: ' Código Inst. Contr.',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number',
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
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
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
      'descripcion': '',
      'estado': 'A',
      'observacionEstado': '',
      'fechaIngreso': Date.now(),
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
