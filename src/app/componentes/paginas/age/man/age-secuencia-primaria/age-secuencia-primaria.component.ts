import { Component, OnInit } from '@angular/core';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ACComponent } from '../ACComponent';

@Component({
  selector: 'app-age-secuencia-primaria',
  templateUrl: './age-secuencia-primaria.component.html',
  styleUrls: ['./age-secuencia-primaria.component.css']
})
export class AgeSecuenciaPrimariaComponent extends ACComponent {
  
  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) {
    super(ageService, sanitizer, "Lista Secuencia Primaria", ageService.SECUENCIA_PRIMARIA_URL, false);
  }
  
  cargarColumnas() {
    this.cols = [
      {
        field: 'codigo',
        //field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        tipo: 'number',
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:40%'),
        required: true
      },
      {
        field: 'ciclica',
        header: 'Cíclica',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }],
        required: true
      },
      {
        field: 'incrementaEn',
        //field2: 'codigo',
        header: 'Incremento',
        width: this.sanitizer.bypassSecurityTrustStyle('width:13%'),
        tipo: 'number',
        required: true
      },
      {
        field: 'valorInicial',
        //field2: 'codigo',
        header: 'Valor Inicial',
        width: this.sanitizer.bypassSecurityTrustStyle('width:13%'),
        tipo: 'number',
        required: true
      },
      {
        field: 'valorActual',
        //field2: 'codigo',
        header: 'Valor Actual',
        width: this.sanitizer.bypassSecurityTrustStyle('width:13%'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        opciones: [{ label: 'Activo', value: 'A' },
        { label: 'Inactivo', value: 'I' }]
      },
      {
        field: 'observacionEstado',
        header: 'Observación Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:20%')
      }
    ];
  }

  async agregar() {
    this.detalle.unshift({
      'codigo': 0,
      'descripcion': '',
      'ciclica': 'N',
      'incrementaEn': 1,
      'valorInicial': 0,
      'valorActual': 0,
      'estado': 'A',
      'observacionEstado': '',
      'fechaIngreso': Date.now(),
      'nuevo': true
    });
  }

  cargarCodigos(detallesNuevos: any[], datosGuardados: any[]) {
  }
}
