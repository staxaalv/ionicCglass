import { Component, OnInit } from '@angular/core';
import { AgeService } from 'src/app/servicios/age/age.service';
import { ACComponent } from '../ACComponent';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-age-usuarios-punto-emision',
  templateUrl: './age-usuarios-punto-emision.component.html',
  styleUrls: ['./age-usuarios-punto-emision.component.css']
})
export class AgeUsuariosPuntoEmisionComponent extends ACComponent {

  opcionesUsuario: any[] = [];
  opcionesPuntoEmision: any[] = [];

  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) {
    super(ageService, sanitizer, "Lista Usuarios Punto Emisión", ageService.USUARIO_PUNTO_EMISION_URL, true);
    this.ageService.getUsuarioSelect(this.opcionesUsuario);
    this.ageService.getPuntoEmisionSelect(this.opcionesPuntoEmision);
    this.cargarColumnas();
    this.ageService.subjectOpcionesPuntoEmision.subscribe(() => {
      this.ageService.getPuntoEmisionSelect(this.opcionesPuntoEmision);
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
      /*{
        field: 'id',
        field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number',
        noinsertable: true
      },*/
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
        field2: 'agePunEmCodigo',
        header: 'Punto Emisión',
        width: this.sanitizer.bypassSecurityTrustStyle('width:180px'),
        opciones: this.opcionesPuntoEmision,
        async: true,
        required: true
      },
      {
        field: 'fechaDesde',
        header: 'Fecha Desde',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px'),
        tipo: 'date-time',
        required: true
      },
      {
        field: 'fechaHasta',
        header: 'Fecha Hasta',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px'),
        tipo: 'date-time'
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
        'agePunEmCodigo': 0,
        'agePunEmAgeSucursCodigo': this.ageService.authService.codigoSucursal,
        'agageSucursAgeLicencCodigo': this.ageService.authService.codigoLicenciatario
      },

      'fechaDesde': new Date(),
      'estado': 'A',
      'observacionEstado': '',
      'fechaIngreso': Date.now(),
      'nuevo': true
    });
  }

  cargarCodigos(detallesNuevos: any[], datosGuardados: any[]) {
    /*for (let index = 0; index < datosGuardados.length; index++) {
      detallesNuevos[index].id.codigo = datosGuardados[index].id.codigo;
      detallesNuevos[index].nuevo = false;
    }*/
  }
}
