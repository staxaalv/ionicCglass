import { Component, OnInit } from '@angular/core';
import { ACComponent } from '../ACComponent';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-age-formas-pago',
  templateUrl: './age-formas-pago.component.html',
  styleUrls: ['./age-formas-pago.component.css']
})
export class AgeFormasPagoComponent extends ACComponent {

  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) { 
    super(ageService, sanitizer, "Lista Formas Pagos", ageService.FORMAS_PAGOS_URL, true, ageService.subjectOpcionesFormasPago);
  }

  
  cargarColumnas() {
    this.cols = [
      {
        field: 'id',
        field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:45%'),
        required: true
      },
      {
        field: 'codigoInstitucionControl',
        //field2: 'codigo',
        header: 'Código Institución Control',
        width: this.sanitizer.bypassSecurityTrustStyle('width:25%'),
        tipo: 'number',
        required: true
      },
      {
        field: 'presentaCajaBancos',
        header: 'Presenta Caja Bancos',
        width: this.sanitizer.bypassSecurityTrustStyle('width:20%'),
        required: true,
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }]
      },
      {
        field: 'retiene',
        header: 'Retiene',
        width: this.sanitizer.bypassSecurityTrustStyle('width:20%'),
        required: true,
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }]
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
      'id': {
        'ageLicencCodigo': this.ageService.authService.codigoLicenciatario
      },
      'retiene': 'N',
      'presentaCajaBancos': 'N',
      'descripcion': '',
      'estado': 'A',
      'observacionEstado': '',
      'fechaIngreso': Date.now(),
      'nuevo': true
    });
  }

  cargarCodigos(detallesNuevos: any [], datosGuardados: any[]) {
    for (let index = 0; index < datosGuardados.length; index++) {
      detallesNuevos[index].id.codigo = datosGuardados[index].id.codigo;
      detallesNuevos[index].nuevo = false;
    }
  }  
}
