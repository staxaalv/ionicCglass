import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/sri/man/ACComponent';
import { SriService } from 'src/app/servicios/sri/sri.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-sri-tipo-comprobante',
  templateUrl: './sri-tipo-comprobante.component.html',
  styleUrls: ['./sri-tipo-comprobante.component.css']
})
export class SriTipoComprobanteComponent extends ACComponent {

  constructor(protected sriService: SriService, protected sanitizer: DomSanitizer) {
    super(sriService, sanitizer, "Lista de Tipo de Comprobantes", sriService.TIPO_COMPROBANTE_URL, false, sriService.subjectOpcionesSriTipoComprobante);
  }

  cargarColumnas() {
    this.cols = [
      {
        field: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'codigoInstitucionControl',
        header: 'Código Institución Control',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        tipo: 'number',
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:45%'),
        required: true
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
      'codigo': 0,
      'codigoInstitucionControl': 0,
      'descripcion': '',
      'estado': 'A',
      'observacionEstado': '',
      'fechaIngreso': Date.now(),
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
