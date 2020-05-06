import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/sri/man/ACComponent';
import { SriService } from 'src/app/servicios/sri/sri.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AgeService } from 'src/app/servicios/age/age.service';

@Component({
  selector: 'app-sri-pto-emision-tipo-comprobante',
  templateUrl: './sri-pto-emision-tipo-comprobante.component.html',
  styleUrls: ['./sri-pto-emision-tipo-comprobante.component.css']
})
export class SriPtoEmisionTipoComprobanteComponent extends ACComponent {

  opcionesTipoComprobante:any[]=[]
  //opcionesUsuariosPuntoEmision:any[]=[]
  opcionesPuntoEmision: any[] = [];

  constructor(protected ageService: AgeService,protected sriService: SriService, protected sanitizer: DomSanitizer) {
    super(sriService, sanitizer, "Lista Punto Emisión por Tipo Comprobante", sriService.PTO_EMISION_TIPO_COMPROBANT_URL, false, sriService.subjectOpcionesSriPtoEmisionTipoComprobante);
    this.sriService.getTipoComprobanteSelect(this.opcionesTipoComprobante);
    //this.ageService.getUsuariosPuntoEmisionSelect(this.opcionesUsuariosPuntoEmision);
    this.ageService.getPuntoEmisionSelect(this.opcionesPuntoEmision);

    this.cargarColumnas();

    this.sriService.subjectOpcionesSriTipoComprobante.subscribe(()=>{
      this.sriService.getTipoComprobanteSelect(this.opcionesTipoComprobante);
    });
    /*this.ageService.subjectOpcionesUsuariosPuntoEmision.subscribe(()=>{
      this.ageService.getUsuariosPuntoEmisionSelect(this.opcionesUsuariosPuntoEmision);
    });*/
    this.ageService.subjectOpcionesPuntoEmision.subscribe(() => {
      this.ageService.getPuntoEmisionSelect(this.opcionesPuntoEmision);
    });

  }

  cargarColumnas() {

    this.cols = [
      /*{
        field: 'id',
        field2: 'agePumEmAgeLicencCodigo',
        header: 'agePumEmAgeSucursCodigo',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'id',
        field2: 'agePumEmAgeSucursCodigo',
        header: 'agePumEmAgeSucursCodigo',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        required: true
      },*/
      {
        field: 'id',
        field2: 'agePumEmCodigo',
        header: 'Punto Emisión',
        width: this.sanitizer.bypassSecurityTrustStyle('width:75px'),
        opciones: this.opcionesPuntoEmision,
        async: true,
        required: true
      },
      {
        field: 'id',
        field2: 'sriTipCoCodigo',
        header: 'Tipo Comprobante',
        width: this.sanitizer.bypassSecurityTrustStyle('width:95px'),
        opciones: this.opcionesTipoComprobante,
        async: true,
        required: true
      },
      {
        field: 'secuenciaCiclica',
        header: 'Cíclica',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }]
      },
      {
        field: 'secuenciaIncremento',
        header: 'Incremento',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'secuenciaValorActual',
        header: 'Valor Actual',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'secuenciaValorInicio',
        header: 'Valor Inicio',
        width: this.sanitizer.bypassSecurityTrustStyle('width:65px'),
        tipo: 'number',
        required: true
      },
      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:85px'),
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
        'agePumEmAgeLicencCodigo': this.ageService.authService.codigoLicenciatario,
        'agePumEmAgeSucursCodigo': this.ageService.authService.codigoSucursal,
        'agePumEmCodigo': 0,
        'sriTipCoCodigo': 0
      },
      'secuenciaCiclica': 'N',
      'estado': 'A',
      'secuenciaIncremento': 1,
      'secuenciaValorActual': 0,
      'secuenciaValorInicio': 0,
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
