import { Component, OnInit } from '@angular/core';
import { ACComponent } from '../ACComponent';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-age-perfiles-transacciones',
  templateUrl: './age-perfiles-transacciones.component.html',
  styleUrls: ['./age-perfiles-transacciones.component.css']
})
export class AgePerfilesTransaccionesComponent extends ACComponent {

  opcionesPerfil: any[] = [];
  opcionesTransaccion: any[] = [];
  opcionesAplicacion: any[] = [];

  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) {
    super(ageService, sanitizer, "Lista Transacciones Perfil", ageService.PERFIL_TRANSACCION_URL, true);

    this.ageService.getTransaccionSelect(this.opcionesTransaccion);
    this.ageService.getPerfilSelect(this.opcionesPerfil);
    this.ageService.getAplicacionSelect(this.opcionesAplicacion);

    this.cargarColumnas();
    this.ageService.subjectOpcionesTransaccion.subscribe(() => {
      this.ageService.getTransaccionSelect(this.opcionesTransaccion);
    });
    this.ageService.subjectOpcionesPerfil.subscribe(() => {
      this.ageService.getPerfilSelect(this.opcionesPerfil);
    });
    this.ageService.subjectOpcionesAplicacion.subscribe(() => {
      this.ageService.getAplicacionSelect(this.opcionesAplicacion);
    });
  }

  modificarDatos() {
    this.detalle.forEach(t => {
      t.opcionesTrx = this.opcionesPorAplicacion(t.ageTransaAgeAplicaCodigo);
    });
  }

  actualizarDatos(event) {
    console.log(event);
    if (event.field == 'ageTransaAgeAplicaCodigo') {
      event.data.opcionesTrx = this.opcionesPorAplicacion(event.data.ageTransaAgeAplicaCodigo);
    }
  }

  opcionesPorAplicacion(aplicacion): any[] {
    let opciones = [];
    
    setTimeout(() => {
      opciones.push({
        label: 'SELECCIONAR',
        value: 0
      });
      this.opcionesTransaccion.forEach(t => {
        //console.log(t);
        //console.log('t.ageTransaAgeAplicaCodigo ' + t.ageTransaAgeAplicaCodigo);
        //console.log('aplicacion ' + aplicacion);
        if (t.aplicacion == aplicacion) {
          opciones.push({
            label: t.label,
            value: t.value
          });
        }
      });
    }, 1000);
    
    return opciones;
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
        field2: 'agePerfilCodigo',
        header: 'Perfil',
        width: this.sanitizer.bypassSecurityTrustStyle('width:200px'),
        opciones: this.opcionesPerfil,
        async: true,
        required: true
      },
      {
        field: 'ageTransaAgeAplicaCodigo',
        header: 'Aplicación',
        width: this.sanitizer.bypassSecurityTrustStyle('width:240px'),
        opciones: this.opcionesAplicacion,
        async: true,
        required: true,
        actualizaCampo: true
      },
      {
        field: 'ageTransaCodigo',
        header: 'Transacción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:240px'),
        //opciones: this.opcionesTransaccion,
        async: true,
        required: true,
        dynamic: true,
        opcionDinamica: 'opcionesTrx'
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
        'agePerfilCodigo': 0,
        'agePerfilAgeLicencCodigo': this.ageService.authService.codigoLicenciatario
      },
      'ageTransaAgeAplicaCodigo': 0,
      'ageTransaCodigo': 0,
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
