import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/sri/man/ACComponent';
import { SriService } from 'src/app/servicios/sri/sri.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-sri-clase-contribuyente-rtf',
  templateUrl: './sri-clase-contribuyente-rtf.component.html',
  styleUrls: ['./sri-clase-contribuyente-rtf.component.css']
})
export class SriClaseContribuyenteRtfComponent extends ACComponent {

  opcionesImpuestos:any[]=[]
  opcionesTipoBienServicio: any[] = []


  constructor(protected sriService: SriService, protected sanitizer: DomSanitizer) {
    super(sriService, sanitizer, "Lista Clase Contribuyente RTF", sriService.CLASE_CONTRIBUYENTE_RTF_URL, false, sriService.subjectOpcionesSriClaseContribuyenteRTF);

    this.sriService.getImpuestoSelect(this.opcionesImpuestos);
    this.sriService.getTipoBienServicioSelect(this.opcionesTipoBienServicio);

    this.cargarColumnas();

    this.sriService.subjectOpcionesSriImpuesto.subscribe(()=>{
      this.sriService.getImpuestoSelect(this.opcionesImpuestos);
    });
    this.sriService.subjectOpcionesSriTipoBienServicio.subscribe(()=>{
      this.sriService.getTipoBienServicioSelect(this.opcionesTipoBienServicio);
    });

  }

  cargarColumnas() {
    this.cols = [
      {
        field: 'id',
        field2: 'sriImpuesCodigo',
        header: 'Impuesto',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        opciones: this.opcionesImpuestos,
        async: true,
        required: true
      },
      {
        field: 'id',
        field2: 'sriTipBsCodigo',
        header: 'Tipo Bien Servicio',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        opciones: this.opcionesTipoBienServicio,
        async: true,
        required: true
      },
      {
        field: 'id',
        field2: 'ageClaCoRetenerACodigo',
        header: 'Código de ageClaCoRetenerA de AGE',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'id',
        field2: 'ageClaCoRetenerDeCodigo',
        header: 'Código de ageClaCoRetenerDe de AGE',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'deCada',
        header: 'De Cada',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'porcentaje',
        header: '% Porcentaje',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'retiene',
        header: 'Retiene',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }]
      },
      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        opciones: [{ label: 'Activo', value: 'A' },
        { label: 'Inactivo', value: 'I' }]
      },
      {
        field: 'observacionEstado',
        header: 'Observación Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px')
      }
    ];
  }

  agregar() {
    this.detalle.unshift({
      'id': {
        'ageClaCoRetenerACodigo': 0,
        'ageClaCoRetenerDeCodigo': 0
      },
      'deCada': 1,
      'porcentaje': 1,
      'retiene': 'N',
      'estado': 'A',
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
