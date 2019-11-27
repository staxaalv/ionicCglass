import { Component, OnInit } from '@angular/core';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Alert } from 'selenium-webdriver';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-age-secuencia-primaria',
  templateUrl: './age-secuencia-primaria.component.html',
  styleUrls: ['./age-secuencia-primaria.component.css']
})
export class AgeSecuenciaPrimariaComponent {

  detalle: any[] = [];
  loading: boolean = true;
  errorGuardar: boolean = false;
  cols: any[];
  titulo: String = "Lista Secuencia Primaria";
  listaEliminar: any[] = [];
  msgsIngresar: Message[] = [];
  msgsActualizar: Message[] = [];
  key: String = "codigo";

  constructor(private ageService: AgeService, private sanitizer: DomSanitizer) {
    this.getDetalles();
  }

  getDetalles() {
    this.loading = true;
    this.ageService
      .getDetalle(this.ageService.SECUENCIA_PRIMARIA_URL)
      .then((res: any) => {
        this.loading = false;
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            this.detalle = res.data;
            console.log(this.detalle);
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
        field: 'codigo',
        //field2: 'codigo',
        header: 'Código',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        tipo: 'number'/*,
        noinsertable: true*/
      },
      {
        field: 'descripcion',
        header: 'Descripción',
        width: this.sanitizer.bypassSecurityTrustStyle('width:40%')
      },
      {
        field: 'ciclica',
        header: 'Cíclica',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        opciones: [{ label: 'Si', value: 'S' },
        { label: 'No', value: 'N' }]
      },
      {
        field: 'incrementaEn',
        //field2: 'codigo',
        header: 'Incremento',
        width: this.sanitizer.bypassSecurityTrustStyle('width:13%'),
        tipo: 'number'/*,
        noinsertable: true*/
      },
      {
        field: 'valorInicial',
        //field2: 'codigo',
        header: 'Valor Inicial',
        width: this.sanitizer.bypassSecurityTrustStyle('width:13%'),
        tipo: 'number'/*,
        noinsertable: true*/
      },
      {
        field: 'valorActual',
        //field2: 'codigo',
        header: 'Valor Actual',
        width: this.sanitizer.bypassSecurityTrustStyle('width:13%'),
        tipo: 'number',
        noinsertable: true
      },
      {
        field: 'estado',
        header: 'Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:10%'),
        opciones: [{ label: 'Activo', value: 'A' },
        { label: 'Inactivo', value: 'I' }]
      },
      {
        field: 'observacionEstado',
        header: 'Observación Estado',
        width: this.sanitizer.bypassSecurityTrustStyle('width:20%')
      }
    ];
  }

  async agregarFila() {
    //this.parametrosGenerales.map(t => console.log(JSON.stringify(t)));
    this.detalle.unshift({
      'codigo': 0,
      'descripcion': '',
      'ciclica': 'N',
      'incrementaEn': 1,
      'valorInicial': 0,
      'valorActual': 0,
      'estado': 'A',
      'observacionEstado': '',
      'fechaIngreso': Date.now(),
      'nuevo': true
    });
  }

  guardar() {
    this.detalle.map(t => {
      if (t.nuevo) {
        this.loading = true;
        this.ageService.insertarDetalle(this.ageService.SECUENCIA_PRIMARIA_URL, t).then((data: any) => {
          this.loading = false;
          if (data.respuestaCodigo === -1) {
            t.guardado = '0';
            t.error = data.error;
            this.errorGuardar = true;
          } else {
            t.guardado = '1';
            t.error = "";
            t.nuevo = false;
            setTimeout(() => {
              t.guardado = ' '
            }, 4000);
          }
        });
      } else if (t.modificado) {
        this.loading = true;
        this.ageService.actualizarDetalle(this.ageService.SECUENCIA_PRIMARIA_URL, t).then((data: any) => {
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

  eliminar(listaEliminar) {
    let listaEliminarBase: any [] = [];
    listaEliminar.map(select => {
      if(!select.nuevo){
        select.estado = "N";
        listaEliminarBase.push(select);
      }
    });
    this.ageService.actualizarDetalles(this.ageService.SECUENCIA_PRIMARIA_URL, listaEliminarBase).then((data: any) => {
      this.loading = false;
      if (data.respuestaCodigo === -1) {
        this.msgsActualizar = [];
        this.msgsActualizar.push({ severity: 'error', summary: 'Error al eliminar: ', detail: JSON.stringify(data.error.message) });
      } else {
        listaEliminar.map(select => {
          let i = this.detalle.indexOf(select);
          this.detalle.splice(i, 1)
        });
        this.listaEliminar = [];
        this.msgsActualizar = [];
        this.msgsActualizar.push({ severity: 'success', summary: 'Eliminado con éxito ' });
        setTimeout(() => {
          this.msgsActualizar = [];
        }, 6000);
      }
    });

  }
}
