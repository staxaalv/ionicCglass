import { Component, OnInit } from '@angular/core';
import { ACComponent } from '../ACComponent';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-age-tipos-localidades',
  templateUrl: './age-tipos-localidades.component.html',
  styleUrls: ['./age-tipos-localidades.component.css']
})
export class AgeTiposLocalidadesComponent extends ACComponent {

  opcionesPais: any[] = [];
  
  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) {
    super(ageService, sanitizer, "Lista Tipos Localidades", ageService.TIPO_LOCALIDAD_URL, false, ageService.subjectOpcionesTipoLocalidad);
    this.ageService.getPaisSelect(this.opcionesPais);
    this.cargarColumnas();
    this.ageService.subjectOpcionesPais.subscribe(() => {
      this.ageService.getPaisSelect(this.opcionesPais);
    });
    
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
        field: 'id',
        field2: 'agePaisCodigo',
        header: 'País',
        width: this.sanitizer.bypassSecurityTrustStyle('width:120px'),
        opciones: this.opcionesPais,
        async: true,
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:45%'),
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
      detallesNuevos[index].id.codigo = datosGuardados[index].id.codigo;
      detallesNuevos[index].nuevo = false;
    }
  }  

}
