import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/cib/man/ACComponent';
import { CibService } from 'src/app/servicios/cib/cib.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AgeService } from 'src/app/servicios/age/age.service';

@Component({
  selector: 'app-cib-secuencias-licenciatarios',
  templateUrl: './cib-secuencias-licenciatarios.component.html',
  styleUrls: ['./cib-secuencias-licenciatarios.component.css']
})
export class CibSecuenciasLicenciatariosComponent extends ACComponent {

  protected opcionesAplicacion: any[] = [];

  constructor(protected ageService: AgeService,protected cibService: CibService, protected sanitizer: DomSanitizer) {
    super(cibService, sanitizer, "Lista Secuencia Licenciatario", cibService.SECUENCIAS_LICENCIATARIOS, false, cibService.subjectOpcionesSecuenciasLicenciatarios);
    this.ageService.getAplicacionSelect(this.opcionesAplicacion);
    this.cargarColumnas();
    this.ageService.subjectOpcionesAplicacion.subscribe(() => {
      this.ageService.getAplicacionSelect(this.opcionesAplicacion);
    });
   }

   cargarColumnas() {
    this.cols = [
      {
        field: 'id',
        field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'id',
        field2: 'cibLicApAgeAplicaCodigo',
        header: 'Código Aplicación',
        width: this.sanitizer.bypassSecurityTrustStyle('width:95px'),
        opciones: this.opcionesAplicacion,
        async: true,
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px'),
        required: true
      },
      {
        field: 'ciclica',
        header: 'Cíclica',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }]
      },
      {
        field: 'incrementaEn',
        header: 'Incremento en',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'valorActual',
        header: 'Valor actual',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'valorInicial',
        header: 'Valor inicial',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
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
      'id':{
        'codigo': 0,
        'cibLicApCibLicencCodigo': this.ageService.authService.codigoLicenciatario
      },
      'descripcion': '',
      'ciclica': 'N',
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
