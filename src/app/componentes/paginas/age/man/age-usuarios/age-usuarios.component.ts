import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ACComponent } from '../ACComponent';

@Component({
  selector: 'app-age-usuarios',
  templateUrl: './age-usuarios.component.html',
  styleUrls: ['./age-usuarios.component.css']
})
export class AgeUsuariosComponent extends ACComponent {

  opcionesSucursal: any[] = [];
  opcionesTipoIdentificacion: any[] = [];

  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) {
    super(ageService, sanitizer, "Lista Usuarios", ageService.USUARIO_URL, true, ageService.subjectOpcionesUsuario);
    this.ageService.getTipoIdentificacionSelect(this.opcionesTipoIdentificacion);
    this.ageService.getSucursalSelect(this.opcionesSucursal);
    this.cargarColumnas();
    this.ageService.subjectOpcionesTipoIdentificacion.subscribe(() => {
      this.ageService.getTipoIdentificacionSelect(this.opcionesTipoIdentificacion);
    });
    this.ageService.subjectOpcionesSucursal.subscribe(() => {
      this.ageService.getSucursalSelect(this.opcionesSucursal);
    });
  }

  modificarDatosGuardar(t) {
    t.codigoExterno = t.codigoExterno.toUppercase();
    t.nombres = t.nombres.toUppercase();
    t.apellidos = t.apellidos.toUppercase();
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
        field: 'ageSucursCodigo',
        header: 'Sucursal',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px'),
        opciones: this.opcionesSucursal,
        async: true,
        required: true
      },
      {
        field: 'codigoExterno',
        header: 'Usuario',
        width: this.sanitizer.bypassSecurityTrustStyle('width:100px'),
        required: true
      },
      {
        field: 'clave',
        header: 'Clave',
        tipo: 'password',
        width: this.sanitizer.bypassSecurityTrustStyle('width:100px'),
        //noinsertable: true,
        required: true
      },
      {
        field: 'ageTipIdCodigo',
        header: 'Tipo Identificación',
        width: this.sanitizer.bypassSecurityTrustStyle('width:120px'),
        opciones: this.opcionesTipoIdentificacion,
        async: true,
        required: true
      },
      {
        field: 'numeroIdentificacion',
        header: 'Número Identificación',
        width: this.sanitizer.bypassSecurityTrustStyle('width:120px'),
        required: true
      },
      {
        field: 'nombres',
        header: 'Nombres',
        width: this.sanitizer.bypassSecurityTrustStyle('width:120px'),
        required: true
      },
      {
        field: 'apellidos',
        header: 'Apellidos',
        width: this.sanitizer.bypassSecurityTrustStyle('width:120px'),
        required: true
      },
      {
        field: 'direccion',
        header: 'Dirección',
        width: this.sanitizer.bypassSecurityTrustStyle('width:200px'),
        required: true
      },
      {
        field: 'mailPrincipal',
        header: 'Mail',
        tipo: 'email',
        width: this.sanitizer.bypassSecurityTrustStyle('width:180px'),
        required: true
      },
      {
        field: 'telefonoCelular',
        header: 'Celular',
        width: this.sanitizer.bypassSecurityTrustStyle('width:90px'),
        required: true
      },
      {
        field: 'tipoUsuario',
        header: 'Tipo Usuario',
        width: this.sanitizer.bypassSecurityTrustStyle('width:110px'),
        opciones: [{ label: 'Interno', value: 'I' },
        { label: 'Externo', value: 'E' }]
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
        'ageLicencCodigo': this.ageService.authService.codigoLicenciatario
      },
      'codigoExterno': '',
      'clave': '',
      'numeroIdentificacion': '',
      'nombres': '',
      'apellidos': '',
      'mail': '',
      'telefonoCelular': '',
      'tipoUsuario': 'I',
      'ageSucursAgeLicencCodigo': this.ageService.authService.codigoLicenciatario,
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
