import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'primeng/api';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ACComponent } from '../ACComponent';

@Component({
  selector: 'app-age-licenciatario-aplica-secu',
  templateUrl: './age-licenciatario-aplica-secu.component.html',
  styleUrls: ['./age-licenciatario-aplica-secu.component.css']
})
export class AgeLicenciatarioAplicaSecuComponent extends ACComponent  implements OnDestroy{

  protected opcionesAplicacion: any[] = [];

  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) { 
    super(ageService, sanitizer, "Lista Secuencia Licenciatario", ageService.SECUENCIA_LICENCIATARIO_URL, true);
    this.ageService.getAplicacionSelect(this.opcionesAplicacion);
    this.cargarColumnas();
    this.ageService.subjectOpcionesAplicacion.subscribe(() => {
      this.ageService.getAplicacionSelect(this.opcionesAplicacion);
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.ageService.subjectOpcionesAplicacion.unsubscribe();
  }

  cargarColumnas() {
    this.cols = [
      {
        field: 'id',
        field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'id',
        field2: 'ageLicApAgeAplicaCodigo',
        header: 'Aplicación',
        width: this.sanitizer.bypassSecurityTrustStyle('width:180px'),
        opciones: this.opcionesAplicacion,
        async: true,
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:200px'),
        required: true
      },
      {
        field: 'ciclica',
        header: 'Cíclica',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }],
        required: true
      },
      {
        field: 'incrementaEn',
        //field2: 'codigo',
        header: 'Incremento',
        width: this.sanitizer.bypassSecurityTrustStyle('width:105px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'valorInicial',
        //field2: 'codigo',
        header: 'Valor Inicial',
        width: this.sanitizer.bypassSecurityTrustStyle('width:105px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'valorActual',
        //field2: 'codigo',
        header: 'Valor Actual',
        width: this.sanitizer.bypassSecurityTrustStyle('width:105px'),
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
      'id':{
        'ageLicApAgeLicencCodigo': this.ageService.authService.codigoLicenciatario
      },
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

  cargarCodigos(detallesNuevos: any [], datosGuardados: any[]) {
    for (let index = 0; index < datosGuardados.length; index++) {
      detallesNuevos[index].id.codigo = datosGuardados[index].id.codigo;
      detallesNuevos[index].nuevo = false;
    }
  }

}
