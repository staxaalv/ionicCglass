import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/cib/man/ACComponent';
import { CibService } from 'src/app/servicios/cib/cib.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AgeService } from 'src/app/servicios/age/age.service';
@Component({
  selector: 'app-cib-marcas',
  templateUrl: './cib-marcas.component.html',
  styleUrls: ['./cib-marcas.component.css']
})
export class CibMarcasComponent extends ACComponent {

  constructor(protected ageService: AgeService,protected cibService: CibService, protected sanitizer: DomSanitizer) {
    super(cibService, sanitizer, "Lista Marca", cibService.MARCA_URL, false, cibService.subjectOpcionesMarca);
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
        //field: 'descripcion',
        field: 'decripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:45%'),
        required: true
      },
      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:30%'),
        opciones: [{ label: 'Activo', value: 'A' },
        { label: 'Inactivo', value: 'I' }]
      },
      {
        field: 'observacionEstado',
        header: 'Observación Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:45%')
      }
    ];
  }

  agregar() {
    this.detalle.unshift({
      'id': {
        'codigo': 0,
        'ageLicencCodigo': this.ageService.authService.codigoLicenciatario
      },
      'estado': 'A',
      'observacionEstado': '',
      'fechaIngreso': Date.now(),
      'fechaEstado': Date.now(),
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
