import { Component, OnInit } from '@angular/core';
import { ACComponent } from '../ACComponent';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-age-localidades',
  templateUrl: './age-localidades.component.html',
  styleUrls: ['./age-localidades.component.css']
})
export class AgeLocalidadesComponent extends ACComponent {

  opcionesTipoLocalidad: any[] = [];
  opcionesIdioma: any[] = [];
  opcionesMoneda: any[] = [];
  
  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) {
    super(ageService, sanitizer, "Lista Localidades", ageService.LOCALIDAD_URL, false, ageService.subjectOpcionesLocalidad);
    this.ageService.getTipoLocalidadSelect(this.opcionesTipoLocalidad);
    this.ageService.getIdiomaSelect(this.opcionesIdioma);
    this.ageService.getMonedaSelect(this.opcionesMoneda);
    this.cargarColumnas();
    this.ageService.subjectOpcionesTipoLocalidad.subscribe(() => {
      this.ageService.getTipoLocalidadSelect(this.opcionesTipoLocalidad);
    });
    this.ageService.subjectOpcionesIdioma.subscribe(() => {
      this.ageService.getIdiomaSelect(this.opcionesIdioma);
    });
    this.ageService.subjectOpcionesMoneda.subscribe(() => {
      this.ageService.getMonedaSelect(this.opcionesMoneda);
    });
    
  }

  modificarDatos() {
    this.detalle.forEach(t => {
      t.tipoLocalidadId = {
        'codigo': t.id.ageTipLoCodigo,
        'agePaisCodigo': t.id.ageTipLoAgePaisCodigo
      }
    });
  }

  modificarDatosGuardar(t){
    t.id.ageTipLoCodigo = t.tipoLocalidadId.codigo;
    t.id.ageTipLoAgePaisCodigo = t.tipoLocalidadId.agePaisCodigo;
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
        field: 'tipoLocalidadId',
        header: 'Tipo Localidad',
        width: this.sanitizer.bypassSecurityTrustStyle('width:130px'),
        opciones: this.opcionesTipoLocalidad,
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
        field: 'ageIdiomaCodigo',
        header: 'Idioma',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px'),
        opciones: this.opcionesIdioma,
        async: true
      },
      {
        field: 'ageMonedaCodigo',
        header: 'Moneda',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px'),
        opciones: this.opcionesMoneda,
        async: true
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
      'id':{
        'codigo':''
      },
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
