import { Component, OnInit } from '@angular/core';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ACComponent } from '../ACComponent';

@Component({
  selector: 'app-age-tipos-identificaciones',
  templateUrl: './age-tipos-identificaciones.component.html',
  styleUrls: ['./age-tipos-identificaciones.component.css']
})
export class AgeTiposIdentificacionesComponent extends ACComponent  {

  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) {
    super(ageService, sanitizer, "Lista Tipos Identificaciones", ageService.TIPO_IDENTIFICACION_URL, false, ageService.subjectOpcionesTipoIdentificacion);
  }

  cargarColumnas() {
    this.cols = [
      {
        field: 'codigo',
        //field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:20%'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'codigoInstitucionControl',
        //field2: 'codigo',
        header: 'Código Institución Control',
        width: this.sanitizer.bypassSecurityTrustStyle('width:20%'),
        tipo: 'number',
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:60%'),
        required: true
      },
      {
        field: 'siglas',
        header: 'Siglas',
        width: this.sanitizer.bypassSecurityTrustStyle('width:20%'),
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
