import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/cib/man/ACComponent';
import { CibService } from 'src/app/servicios/cib/cib.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AgeService } from 'src/app/servicios/age/age.service';

@Component({
  selector: 'app-cib-cabecera-movimiento',
  templateUrl: './cib-cabecera-movimiento.component.html',
  styleUrls: ['./cib-cabecera-movimiento.component.css']
})
export class CibCabeceraMovimientoComponent extends ACComponent  {

  opcionesTransaccion:any[]=[]


  constructor(protected ageService: AgeService,protected cibService: CibService, protected sanitizer: DomSanitizer) {
    super(cibService, sanitizer, "Lista Cabecera Movimiento", cibService.CABECERA_MOVIMIENTO_URL, false, cibService.subjectOpcionesCabeceraMovimiento);

    this.ageService.getTransaccionIdSelect(this.opcionesTransaccion);

    this.cargarColumnas();

    this.ageService.subjectOpcionesTransaccion.subscribe(()=>{
      this.ageService.getTransaccionIdSelect(this.opcionesTransaccion);
    });

  }

   modificarDatos() {
    this.detalle.forEach(t => {
      t.fecha = new Date(t.fecha);
      t.transaccionId = {
        'codigo': t.ageTransaCodigo,
        'ageAplicaCodigo': t.ageTransaAgeAplicaCodigo
      };
    });
  }
  modificarDatosGuardar(t){
    t.ageTransaAgeAplicaCodigo = t.transaccionId.ageAplicaCodigo;
    t.ageTransaCodigo=t.transaccionId.codigo
  }

   cargarColumnas() {
    this.cols = [
      {
        field: 'id',
        field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:55px'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'transaccionId',
        header: 'Transacción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:125px'),
        opciones: this.opcionesTransaccion,
        async: true,
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:145px'),
        required: true
      },
      {
        field: 'fecha',
        header: 'Fecha',
        width: this.sanitizer.bypassSecurityTrustStyle('width:95px'),
        tipo: 'date',
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
        width: this.sanitizer.bypassSecurityTrustStyle('width:135px')
      }
    ];
  }

  agregar() {
    this.detalle.unshift({
      'id': {
        'codigo': 0,
        'ageLicencCodigo': this.ageService.authService.codigoLicenciatario
      },
      'descripcion': '',
      'estado': 'A',
      'fecha': new Date(Date.now()),
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
