import { Component, OnInit } from '@angular/core';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ACComponent } from '../ACComponent';

@Component({
  selector: 'app-age-usuarios-perfiles',
  templateUrl: './age-usuarios-perfiles.component.html',
  styleUrls: ['./age-usuarios-perfiles.component.css']
})
export class AgeUsuariosPerfilesComponent extends ACComponent {

  opcionesUsuario: any[] = [];
  opcionesPerfil: any[] = [];

  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) { 
    super(ageService, sanitizer, "Lista Usuarios Perfil", ageService.USUARIO_PERFIL_URL, true);
    this.ageService.getUsuarioSelect(this.opcionesUsuario);
    this.ageService.getPerfilSelect(this.opcionesPerfil);
    this.cargarColumnas();
    this.ageService.subjectOpcionesPerfil.subscribe(() => {
      this.ageService.getPerfilSelect(this.opcionesPerfil);
    });
    this.ageService.subjectOpcionesUsuario.subscribe(() => {
      this.ageService.getUsuarioSelect(this.opcionesUsuario);
    });
  }

  modificarDatos(){
    this.detalle.forEach(t => {
      t.fechaDesde = new Date(t.fechaDesde);
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
        field: 'agePerfilCodigo',
        header: 'Perfil',
        width: this.sanitizer.bypassSecurityTrustStyle('width:180px'),
        opciones: this.opcionesPerfil,
        async: true,
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
        'ageUsuariAgeLicencCodigo': this.ageService.authService.codigoLicenciatario
      },
      'agePerfilCodigo': 0,
      'agePerfilAgeLicencCodigo': this.ageService.authService.codigoLicenciatario,
      'fechaDesde': new Date(),
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
