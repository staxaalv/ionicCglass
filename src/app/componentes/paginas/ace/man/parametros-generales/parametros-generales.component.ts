import { Component, OnInit } from '@angular/core';
import { AceService } from 'src/app/servicios/ace/ace.service';
import { GeneralService } from 'src/app/servicios/generales/general.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-parametros-generales',
  templateUrl: './parametros-generales.component.html',
  styleUrls: ['./parametros-generales.component.css']
})
export class ParametrosGeneralesComponent implements OnInit {

  parametrosGenerales: any[] = [];
  loading: boolean = true;
  errorGuardar: boolean = false;

  parametrosGeneralesNuevo: any = {
    descripcion: 'ejemplo',
    estado: '123',
    observacionEstado: 'das'
  };

  cols: any[];

  titulo: String = "Lista Parámetros Generales";

  constructor(private aceService: AceService, private sanitizer: DomSanitizer) {
  }

  async ngOnInit() {
    //this.carService.getCarsSmall().then(cars => this.cars = cars);
    this.getParametrosGenerales();
    /*this.parametrosGenerales = [
      { vin: '123545', year: '2012', brand: 'chevy', color: 'azul' }
    ]*/
  }

  agregarFila() {
    //this.parametrosGenerales.map(t => console.log(JSON.stringify(t)));
    this.parametrosGenerales.unshift({
      'aceLicenciatariosParametrosPK': {
        'codigo': 0,
        'ageLicencCodigo': this.aceService.authService.codigoLicenciatario
      },
      'descripcion': '',
      'estado': 'A',
      'observacionEstado': ''
    });
  }

  updateParametrosGenerales() {
    this.parametrosGenerales.map(t => {

      if (t.aceLicenciatariosParametrosPK.codigo === 0) {
        this.loading = true;
        this.aceService.insertParametroGeneral(t).then((data: any) => {
          this.loading = false;
          if (data.respuestaCodigo === -1) {
            t.guardado = '0';
            t.error = data.error;
            this.errorGuardar = true;
          } else {
            t.guardado = '1';
            t.error = "";
            setTimeout(() => {
              t.guardado = ' '
            }, 4000);
          }
        });
      } else if (t.modificado) {
        this.loading = true;
        this.aceService.updateParametroGeneral(t).then((data: any) => {
          this.loading = false;
          if (data.respuestaCodigo === -1) {
            t.modificado = false;
            t.guardado = '0';
            t.error = data.error;
            this.errorGuardar = true;
          } else {
            t.modificado = false;
            t.guardado = '1';
            t.error = "";
            console.log(JSON.stringify(t));
            setTimeout(() => {
              t.guardado = ' '
            }, 4000);
          }
        });
      }
    });
  }

  getParametrosGenerales() {
    this.loading = true;
    this.aceService
      .getParametrosGenerales()
      .then((res: any) => {
        this.loading = false;
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            this.parametrosGenerales = res.data;
            this.cargarColumnas();
          }
        } else {
          alert("Error al cargar la información: " + res.error);
        }
      });
  }

  cargarColumnas() {
    this.cols = [
      {
        field: 'aceLicenciatariosParametrosPK',
        field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        tipo: 'number'
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:45%')
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


}
