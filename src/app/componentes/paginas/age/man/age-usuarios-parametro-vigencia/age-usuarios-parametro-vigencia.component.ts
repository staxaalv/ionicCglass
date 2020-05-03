import { Component, OnInit } from '@angular/core';
import { ACComponent } from '../ACComponent';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-age-usuarios-parametro-vigencia',
  templateUrl: './age-usuarios-parametro-vigencia.component.html',
  styleUrls: ['./age-usuarios-parametro-vigencia.component.css']
})
export class AgeUsuariosParametroVigenciaComponent extends ACComponent {

  opcionesUsuario: any[] = [];
  opcionesParametroGeneral: any[] = [];

  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) {
    super(ageService, sanitizer, "Lista Usuarios Parametros", ageService.USUARIO_PARAMETRO_VIGENCIA_URL, true);
    this.ageService.getUsuarioSelect(this.opcionesUsuario);
    this.ageService.getParametroGeneralSelect(this.opcionesParametroGeneral);
    this.cargarColumnas();
    this.ageService.subjectOpcionesParametroGeneral.subscribe(() => {
      this.ageService.getParametroGeneralSelect(this.opcionesParametroGeneral);
    });
    this.ageService.subjectOpcionesUsuario.subscribe(() => {
      this.ageService.getUsuarioSelect(this.opcionesUsuario);
    });
  }

  modificarDatos() {
    this.detalle.forEach(t => {
      t.fechaDesde = new Date(t.fechaDesde);
      if (t.fechaHasta)
        t.fechaHasta = new Date(t.fechaHasta);
    });
  }

  cargarColumnas() {
    this.cols = [
      {
        field: 'id',
        field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'id',
        field2: 'ageUsuariCodigo',
        header: 'Usuario',
        width: this.sanitizer.bypassSecurityTrustStyle('width:180px'),
        opciones: this.opcionesUsuario,
        async: true,
        required: true
      },
      {
        field: 'id',
        field2: 'ageParGeCodigo',
        header: 'Parámetro General',
        width: this.sanitizer.bypassSecurityTrustStyle('width:180px'),
        opciones: this.opcionesParametroGeneral,
        async: true,
        required: true
      },
      {
        field: 'valorParametro',
        header: 'Valor Parámetro',
        width: this.sanitizer.bypassSecurityTrustStyle('width:130px'),
        required: true
      },
      {
        field: 'fechaDesde',
        header: 'Fecha Desde',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px'),
        tipo: 'date',
        required: true
      },
      {
        field: 'fechaHasta',
        header: 'Fecha Hasta',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px'),
        tipo: 'date'
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
    //this.parametrosGenerales.map(t => console.log(JSON.stringify(t)));
    this.detalle.unshift({
      //'id': 0,
      'id': {
        'ageUsuariCodigo': 0,
        'ageUsuariAgeLicencCodigo': this.ageService.authService.codigoLicenciatario,
        'ageParGeCodigo': 0
      },
      'fechaDesde': new Date(),
      'estado': 'A',
      'observacionEstado': '',
      'fechaIngreso': Date.now(),
      'nuevo': true
    });
  }

  cargarCodigos(detallesNuevos: any[], datosGuardados: any[]) {
    for (let index = 0; index < datosGuardados.length; index++) {
      detallesNuevos[index].id.codigo = datosGuardados[index].id.codigo;
      detallesNuevos[index].nuevo = false;
    }
  }
}
