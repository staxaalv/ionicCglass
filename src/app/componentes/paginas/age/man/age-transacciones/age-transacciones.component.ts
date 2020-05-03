import { Component, OnInit } from '@angular/core';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ACComponent } from '../ACComponent';

@Component({
  selector: 'app-age-transacciones',
  templateUrl: './age-transacciones.component.html',
  styleUrls: ['./age-transacciones.component.css']
})
export class AgeTransaccionesComponent extends ACComponent {

  opcionesTransaccion: any[] = [];
  opcionesAplicacion: any[] = [];

  constructor(protected ageService: AgeService, protected sanitizer: DomSanitizer) {
    super(ageService, sanitizer, "Lista Transacciones", ageService.TRANSACCION_URL, false, ageService.subjectOpcionesTransaccion);
    this.ageService.getAplicacionSelect(this.opcionesAplicacion);
    this.ageService.getTransaccionSelect(this.opcionesTransaccion);
    this.cargarColumnas();
    this.ageService.subjectOpcionesAplicacion.subscribe(() => {
      this.ageService.getAplicacionSelect(this.opcionesAplicacion);
    });
    this.ageService.subjectOpcionesTransaccion.subscribe(() => {
      this.ageService.getTransaccionSelect(this.opcionesTransaccion);
    });
  }

  modificarDatos() {
    this.detalle.forEach(t => {
      t.opcionesTrx = this.opcionesPorNivel(t.nivel - 1, t.ageAplicaCodigo);
    });
  }

  modificarDatosGuardar(t){
    t.ageTransaAgeAplicaCodigo = t.id.ageAplicaCodigo;
  }

  actualizarDatos(event){
    console.log(event);
    if(event.field == 'nivel' || event.field == 'ageAplicaCodigo'){
      event.data.opcionesTrx = this.opcionesPorNivel(event.data.nivel - 1, event.data.ageAplicaCodigo);
    }
  }

  opcionesPorNivel(nivel, aplicacion): any[] {
    let opciones = [];
    console.log(nivel);
    opciones.push({
      label: 'SELECCIONAR',
      value: 0
    });
    this.detalle.forEach(t => {
      
      if (t.nivel == nivel && t.ageAplicaCodigo == aplicacion) {
        opciones.push({
          label: t.codigoExterno + ' - ' + t.descripcion.toUpperCase(),
          value: t.id.codigo
        });
      }
    });
    return opciones;
  }

  cargarColumnas() {
    this.cols = [
      {
        field: 'id',
        field2: 'ageAplicaCodigo',
        header: 'Aplicación',
        width: this.sanitizer.bypassSecurityTrustStyle('width:180px'),
        opciones: this.opcionesAplicacion,
        async: true,
        required: true,
        actualizaCampo: true
      },
      /*{
        field: 'id',
        field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number',
        noinsertable: true
      },*/
      {
        field: 'codigoExterno',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:250px'),
        required: true
      },
      {
        field: 'nivel',
        //field2: 'codigo',
        header: 'Nivel',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        required: true,
        actualizaCampo: true
      },
      {
        field: 'ageTransaCodigo',
        header: 'Transacción Padre',
        width: this.sanitizer.bypassSecurityTrustStyle('width:230px'),
        //opciones: this.opcionesTransaccion,
        async: true,
        dynamic: true,
        opcionDinamica: 'opcionesTrx'
      },
      {
        field: 'opcion',
        header: 'Opción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:110px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }]
      },
      {
        field: 'transaccion',
        header: 'Transacción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:110px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }]
      },
      {
        field: 'ordenPresentacion',
        //field2: 'codigo',
        header: 'Orden',
        width: this.sanitizer.bypassSecurityTrustStyle('width:70px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'tipoTransaccion',
        header: 'Tipo Transacción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:135px'),
        opciones: [{ label: 'Otro', value: 'O' },
        { label: 'Débito', value: 'D' },
        { label: 'Crédito', value: 'C' }]
      },
      {
        field: 'tipoOperacion',
        header: 'Tipo Operación',
        width: this.sanitizer.bypassSecurityTrustStyle('width:125px'),
        opciones: [{ label: 'Externa', value: 'E' },
        { label: 'Interna', value: 'I' }]
      },
      {
        field: 'url',
        header: 'Url',
        width: this.sanitizer.bypassSecurityTrustStyle('width:180px'),
        required: true
      },
      {
        field: 'parametros',
        header: 'Parámetros',
        width: this.sanitizer.bypassSecurityTrustStyle('width:180px')
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
      'id':{
        'ageAplicaCodigo': 0
      },
      'tipoOperacion':'I',
      'tipoTransaccion': 'O',
      'opcion': 'S',
      'transaccion': 'S',
      'codigoExterno': '',
      'descripcion': '',
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
