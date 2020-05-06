import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/sri/man/ACComponent';
import { SriService } from 'src/app/servicios/sri/sri.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sri-errores-institucion-control',
  templateUrl: './sri-errores-institucion-control.component.html',
  styleUrls: ['./sri-errores-institucion-control.component.css']
})
export class SriErroresInstitucionControlComponent extends ACComponent {

  constructor(protected sriService: SriService, protected sanitizer: DomSanitizer) {
    super(sriService, sanitizer, "Lista de Errores de Institucion de Control", sriService.ERRORES_INSTITUCION_CONTR_URL, false, sriService.subjectOpcionesSriErroresInstitucionContr);
  }

  cargarColumnas() {
    this.cols = [
      {
        field: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:155px'),
        required: true
      },
      {
        field: 'posibleSolucion',
        header: 'Posible solución',
        width: this.sanitizer.bypassSecurityTrustStyle('width:155px'),
        required: true
      },
      {
        field: 'tiempoReenvio',
        header: 'Tiempo reenvío',
        width: this.sanitizer.bypassSecurityTrustStyle('width:100px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'tieneReenvio',
        header: 'Tiene reenvío',
        width: this.sanitizer.bypassSecurityTrustStyle('width:100px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }]
      },
      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:155px'),
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
      'descripcion': '',
      'posibleSolucion': '',
      'tiempoReenvio': 1,
      'tieneReenvio': 'N',
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
