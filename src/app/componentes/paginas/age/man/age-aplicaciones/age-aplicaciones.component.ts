import { Component, OnInit } from '@angular/core';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ACComponent } from '../ACComponent';

@Component({
  selector: 'app-age-aplicaciones',
  templateUrl: './age-aplicaciones.component.html',
  styleUrls: ['./age-aplicaciones.component.css']
})
export class AgeAplicacionesComponent extends ACComponent {

  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) { 
    super(ageService, sanitizer, "Lista Aplicaciones", ageService.APLICACION_URL, false, ageService.subjectOpcionesAplicacion);
  }

  cargarColumnas() {
    this.cols = [
      {
        field: 'codigo',
        //field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'codigoExterno',
        header: 'Siglas',
        width: this.sanitizer.bypassSecurityTrustStyle('width:70px'),
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:180px'),
        required: true
      },
      {
        field: 'ordenInstalacion',
        //field2: 'codigo',
        header: 'Orden Instalación',
        width: this.sanitizer.bypassSecurityTrustStyle('width:90px'),
        tipo: 'number'
      },
      {
        field: 'ciclicaSecuTrxCe',
        header: 'Cíclica Secuencia Externa',
        width: this.sanitizer.bypassSecurityTrustStyle('width:80px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }],
        required: true
      },
      {
        field: 'incrementoSecuTrxCe',
        //field2: 'codigo',
        header: 'Incremento Secuencia Externa',
        width: this.sanitizer.bypassSecurityTrustStyle('width:80px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'inicioSecuTrxCe',
        //field2: 'codigo',
        header: 'Valor Inicial Secuencia Externa',
        width: this.sanitizer.bypassSecurityTrustStyle('width:100px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'valorActualSecuTrxCe',
        //field2: 'codigo',
        header: 'Valor Actual Secuencia Externa',
        width: this.sanitizer.bypassSecurityTrustStyle('width:100px'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'ciclicaSecuTrxCi',
        header: 'Cíclica Secuencia Interna',
        width: this.sanitizer.bypassSecurityTrustStyle('width:80px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }],
        required: true
      },
      {
        field: 'incrementoSecuTrxCi',
        //field2: 'codigo',
        header: 'Incremento Secuencia Interna',
        width: this.sanitizer.bypassSecurityTrustStyle('width:80px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'inicioSecuTrxCi',
        //field2: 'codigo',
        header: 'Valor Inicial Secuencia Interna',
        width: this.sanitizer.bypassSecurityTrustStyle('width:100px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'valorActualSecuTrxCi',
        //field2: 'codigo',
        header: 'Valor Actual Secuencia Interna',
        width: this.sanitizer.bypassSecurityTrustStyle('width:100px'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:80px'),
        opciones: [{ label: 'Activo', value: 'A' },
        { label: 'Inactivo', value: 'I' }]
      },
      {
        field: 'observacionEstado',
        header: 'Observación Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:150px')
      }
    ];
  }

  agregar() {
    this.detalle.unshift({
      'descripcion': '',
      'ciclicaSecuTrxCe': 'N',
      'ciclicaSecuTrxCi': 'N',
      'incrementoSecuTrxCe': 1,
      'incrementoSecuTrxCi': 1,
      'inicioSecuTrxCe': 0,
      'inicioSecuTrxCi': 0,
      'valorActualSecuTrxCe': 0,
      'valorActualSecuTrxCi': 0,
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
