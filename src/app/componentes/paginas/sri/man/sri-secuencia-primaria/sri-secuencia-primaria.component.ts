import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/sri/man/ACComponent';
import { SriService } from 'src/app/servicios/sri/sri.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-sri-secuencia-primaria',
  templateUrl: './sri-secuencia-primaria.component.html',
  styleUrls: ['./sri-secuencia-primaria.component.css']
})
export class SriSecuenciaPrimariaComponent  extends ACComponent {

  constructor(protected sriService: SriService, protected sanitizer: DomSanitizer) {
    super(sriService, sanitizer, "Lista Secuencia Primaria", sriService.SECUENCIA_PRIMARIA_URL, false, sriService.subjectOpcionesSriSecuenciaPrimaria);
   }

   cargarColumnas() {
    this.cols = [
      {
        field: 'id',
        field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        tipo: 'number',
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:45%'),
        required: true
      },
      {
        field: 'ciclica',
        header: 'Cíclica',
        width: this.sanitizer.bypassSecurityTrustStyle('width:20%'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }]
      },
      {
        field: 'incrementaEn',
        header: 'Incremento en',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        tipo: 'number',
        required: true
      },
      {
        field: 'valorActual',
        header: 'Valor actual',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        tipo: 'number',
        required: true
      },
      {
        field: 'valorInicial',
        header: 'Valor inicial',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        tipo: 'number',
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
      'codigo': 0,
      'descripcion': '',
      'ciclica': 'S',
      'incrementaEn': 1,
      'valorActual': 0,
      'valorInicial': 0,
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
