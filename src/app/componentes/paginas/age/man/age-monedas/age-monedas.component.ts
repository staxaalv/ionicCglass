import { Component, OnInit } from '@angular/core';
import { ACComponent } from '../ACComponent';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-age-monedas',
  templateUrl: './age-monedas.component.html',
  styleUrls: ['./age-monedas.component.css']
})
export class AgeMonedasComponent extends ACComponent {

  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) {
    super(ageService, sanitizer, "Lista Monedas", ageService.MONEDAS_URL, false, ageService.subjectOpcionesMoneda);
  }


  cargarColumnas() {
    this.cols = [
      {
        field: 'codigo',
        //field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'codigoExterno',
        header: 'Siglas',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:45%'),
        required: true
      },
      {
        field: 'monedaSeparadorDecimal',
        header: 'Separador Decimal',
        width: this.sanitizer.bypassSecurityTrustStyle('width:23%'),
        required: true
      },
      {
        field: 'monedaSimbolo',
        header: 'Símbolo',
        width: this.sanitizer.bypassSecurityTrustStyle('width:18%'),
        required: true
      },
      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:20%'),
        opciones: [{ label: 'Activo', value: 'A' },
        { label: 'Inactivo', value: 'I' }]
      },
      {
        field: 'observacionEstado',
        header: 'Observación Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:25%')
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
