import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/sri/man/ACComponent';
import { SriService } from 'src/app/servicios/sri/sri.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sri-impuesto-tarifa',
  templateUrl: './sri-impuesto-tarifa.component.html',
  styleUrls: ['./sri-impuesto-tarifa.component.css']
})
export class SriImpuestoTarifaComponent extends ACComponent {

  opcionesImpuestos:any[]=[]

  constructor(protected sriService: SriService, protected sanitizer: DomSanitizer) {
    super(sriService, sanitizer, "Lista Impuesto Tarifa", sriService.IMPUESTO_TARIFA_URL, false, sriService.subjectOpcionesSriImpuestoTarifa);
    this.sriService.getImpuestoSelect(this.opcionesImpuestos);
    this.cargarColumnas();
    this.sriService.subjectOpcionesSriImpuesto.subscribe(()=>{
      this.sriService.getImpuestoSelect(this.opcionesImpuestos);
    });
   }

   cargarColumnas() {
    this.cols = [
      {
        field: 'id',
        field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        noinsertable: true
      },
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
        field: 'codigoInstitucionControl',
        header: 'Institución de Control',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px'),
        required: true
      },
      {
        field: 'deCada',
        header: 'De cada',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
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
        tipo: 'date',
        required: true
      },
      {
        field: 'porcentaje',
        header: '% Porcentaje',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'valor',
        header: 'Valor',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
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
        width: this.sanitizer.bypassSecurityTrustStyle('width:115px')
      }
    ];
  }

  agregar() {
    this.detalle.unshift({
      'id': {
        'codigo': 0,
      },
      'codigoInstitucionControl': 1,
      'deCada': 1,
      'fechaDesde': new Date(Date.now()),
      'fechaHasta': new Date(),
      'porcentaje': 1,
      'valor': 1,
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

  modificarDatos() {
    this.detalle.forEach(t => {
      t.fechaDesde = new Date(t.fechaDesde);
      if (t.fechaHasta)
        t.fechaHasta = new Date(t.fechaHasta);
    });
  }

}
