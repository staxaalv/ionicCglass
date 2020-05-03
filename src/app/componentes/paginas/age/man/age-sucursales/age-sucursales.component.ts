import { Component, OnInit } from '@angular/core';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ACComponent } from '../ACComponent';

@Component({
  selector: 'app-age-sucursales',
  templateUrl: './age-sucursales.component.html',
  styleUrls: ['./age-sucursales.component.css']
})
export class AgeSucursalesComponent extends ACComponent {

  opcionesTipoSucursal: any[] = [];
  opcionesLocalidad: any[] = [];

  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) {
    super(ageService, sanitizer, "Lista Sucursales", ageService.SUCURSAL_URL, true, ageService.subjectOpcionesSucursal);
    this.ageService.getTipoSucursalSelect(this.opcionesTipoSucursal);
    this.ageService.getLocalidadSelect(this.opcionesLocalidad);
    this.cargarColumnas();
    this.ageService.subjectOpcionesTipoSucursal.subscribe(() => {
      this.ageService.getTipoSucursalSelect(this.opcionesTipoSucursal);
    });
    this.ageService.subjectOpcionesLocalidad.subscribe(() => {
      this.ageService.getLocalidadSelect(this.opcionesLocalidad);
    });
  }

  modificarDatos() {
    this.detalle.forEach(t => {
      t.localidadId = {
        'codigo': t.ageLocaliCodigo,
        'ageTipLoCodigo': t.ageLocaliAgeTipLoCodigo,
        'ageTipLoAgePaisCodigo': t.ageAgeTipLoAgePaisCodigo
      }
      console.log(t);
    });
    console.log(this.opcionesLocalidad);
  }

  modificarDatosGuardar(t){
    t.ageLocaliCodigo = t.localidadId.codigo;
    t.ageLocaliAgeTipLoCodigo = t.localidadId.ageTipLoCodigo;
    t.ageAgeTipLoAgePaisCodigo = t.localidadId.ageTipLoAgePaisCodigo;
  }

  cargarColumnas() {
    this.cols = [
      {
        field: 'id',
        field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:73px'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'ageTipSuCodigo',
        header: 'Tipo Sucursal',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px'),
        opciones: this.opcionesTipoSucursal,
        async: true,
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:220px'),
        required: true
      }
      , {
        field: 'localidadId',
        header: 'Localidad',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px'),
        opciones: this.opcionesLocalidad,
        async: true,
        required: true
      },
      {
        field: 'direccion',
        header: 'Dirección',
        width: this.sanitizer.bypassSecurityTrustStyle('width:220px'),
        required: true
      },
      {
        field: 'codigoEstablecimiento',
        header: 'Código Establecimiento',
        width: this.sanitizer.bypassSecurityTrustStyle('width:130px'),
        tipo: 'number'
      },
      {
        field: 'telefono1',
        header: 'Teléfono',
        width: this.sanitizer.bypassSecurityTrustStyle('width:90px'),
        required: true
      },
      {
        field: 'eMail1',
        header: 'Mail',
        width: this.sanitizer.bypassSecurityTrustStyle('width:170px')
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
      'id': {
        'ageLicencCodigo': this.ageService.authService.codigoLicenciatario
      },
      'descripcion': '',
      'ageTipSuAgeLicencCodigo': this.ageService.authService.codigoLicenciatario,
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
