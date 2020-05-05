import { Component, OnInit } from '@angular/core';
import { ACComponent } from 'src/app/componentes/paginas/cib/man/ACComponent';
import { CibService } from 'src/app/servicios/cib/cib.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-cib-equivalencias-unidades-medidas',
  templateUrl: './cib-equivalencias-unidades-medidas.component.html',
  styleUrls: ['./cib-equivalencias-unidades-medidas.component.css']
})
export class CibEquivalenciasUnidadesMedidasComponent extends ACComponent {

  opcionesUnidadMedida:any[]=[]

  constructor(protected cibService: CibService, protected sanitizer: DomSanitizer) {
    super(cibService, sanitizer, "Lista Equivalencia Unidad Medida", cibService.EQUIVALENCIA_UNIDADES_MEDIDAS_URL, false, cibService.subjectOpcionesEquivalenciaUnidadesMedidas);
    this.cibService.getUnidadMedidaSelect(this.opcionesUnidadMedida);
    this.cargarColumnas();
    this.cibService.subjectOpcionesUnidadesMedidas.subscribe(()=>{
      this.cibService.getUnidadMedidaSelect(this.opcionesUnidadMedida);
    });

  }

  modificarDatos() {
    this.detalle.forEach(t => {
      t.UnidadMedidaId1 = {
        'codigo': t.id.cibUniMeCodigo,
        'ageLicencCodigo': t.id.cibUniMeAgeLicencCodigoD
      }
      t.UnidadMedidaId2 = {
        'codigo': t.id.cibUniMeCodigoSerA,
        'ageLicencCodigo': t.id.cibUniMeAgeLicencCodigoA
      }
    });
  }

  modificarDatosGuardar(t){
    t.id.cibUniMeCodigo=t.UnidadMedidaId1.codigo;
    t.id.cibUniMeAgeLicencCodigoD=t.UnidadMedidaId1.ageLicencCodigo;

    t.id.cibUniMeCodigoSerA = t.UnidadMedidaId2.codigo;
    t.id.cibUniMeAgeLicencCodigoA = t.UnidadMedidaId2.ageLicencCodigo;
  }

   cargarColumnas() {
    this.cols = [
      {
        //field: 'id',
        //field2: 'cibUniMeCodigo',
        field: 'UnidadMedidaId1',
        header: 'Unidad de Medida',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        opciones: this.opcionesUnidadMedida,
        async: true,
        required: true
      },
      {
        //field: 'id',
        //field2: 'cibUniMeCodigoSerA',
        field: 'UnidadMedidaId2',
        header: 'Unidad Medida (SerA)',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        opciones: this.opcionesUnidadMedida,
        async: true,
        required: true
      },
      {
        field: 'valor',
        header: 'Valor',
        width: this.sanitizer.bypassSecurityTrustStyle('width:30%'),
        tipo: 'number',
        required: true
      },
      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:30%'),
        opciones: [{ label: 'Activo', value: 'A' },
        { label: 'Inactivo', value: 'I' }]
      },
      {
        field: 'observacionEstado',
        header: 'Observación Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:45%')
      }
    ];
  }

  agregar() {
    this.detalle.unshift({
      'id':{
        'cibUniMeAgeLicencCodigoD':0,
        'cibUniMeAgeLicencCodigoA':0
      },
      'valor': 1,
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
