import { Component, OnInit } from '@angular/core';
import { AgeService } from 'src/app/servicios/age/age.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent {

  detalle: any[] = [];
  loading: boolean = true;
  errorGuardar: boolean = false;
  cols: any[];
  msgsIngresar: Message[] = [];
  msgsActualizar: Message[] = [];
  titulo: String = "Lista Países";
  listaEliminar: any[] = [];
  key: String = "codigo";

  constructor(private ageService: AgeService, private sanitizer: DomSanitizer) {
    this.getDetalles();
  }

  getDetalles() {
    this.loading = true;
    this.ageService
      .getDetalle(this.ageService.PAIS_URL)
      .then((res: any) => {
        this.loading = false;
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            this.detalle = res.data;
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
        tipo: 'number',
        noinsertable: true
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

  agregar() {
    //this.parametrosGenerales.map(t => console.log(JSON.stringify(t)));
    this.detalle.unshift({
      //'id': 0,
      'descripcion': '',
      'estado': 'A',
      'observacionEstado': '',
      'fechaIngreso': Date.now(),
      'nuevo': true
    });
  }

  guardar() {

    let detallesNuevos: any[] = [];
    let detallesModificar: any[] = [];
    this.detalle.map(t => {
      if (t.nuevo) {
        this.loading = true;
        detallesNuevos.push(t);
      } else if (t.modificado) {
        this.loading = true;
        detallesModificar.push(t);
      }
    });

    if (detallesNuevos.length > 0) {
      this.ageService.insertarDetalles(this.ageService.PAIS_URL, detallesNuevos).then((data: any) => {
        this.loading = false;
        if (data.respuestaCodigo === -1) {
          this.msgsIngresar = [];
          this.msgsIngresar.push({ severity: 'error', summary: 'Error al agregar: ', detail: JSON.stringify(data.error.message) });
        } else {
          for (let index = 0; index < data.data.length; index++) {
            detallesNuevos[index].codigo = data.data[index].codigo;
            detallesNuevos[index].nuevo = false;
          }
          this.msgsIngresar = [];
          this.msgsIngresar.push({ severity: 'success', summary: 'Guardado con éxito ' });
        setTimeout(() => {
            this.msgsIngresar = [];
          }, 5000);
        }
      });
    }

    if (detallesModificar.length > 0) {
      this.ageService.actualizarDetalles(this.ageService.PAIS_URL, detallesModificar).then((data: any) => {
        this.loading = false;
        if (data.respuestaCodigo === -1) {
          this.msgsActualizar = [];
          this.msgsActualizar.push({ severity: 'error', summary: 'Error al actualizar: ', detail: JSON.stringify(data.error.message) });
        } else {
          detallesModificar.forEach(t => {
            t.modificado = false;
          });
          this.msgsActualizar = [];
          this.msgsActualizar.push({ severity: 'success', summary: 'Actualizado con éxito ' });
          setTimeout(() => {
            this.msgsActualizar = [];
          }, 5000);
        }
      });
      /*detallesModificar.forEach(t => {
        this.ageService.actualizarDetalle(this.ageService.PAIS_URL, t).then((data: any) => {
          this.loading = false;
          if (data.respuestaCodigo === -1) {
            t.modificado = false;
            t.guardado = '0';
            t.error = data.error.message;
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
      });*/
    }
  }

  eliminar(listaEliminar) {
    let listaEliminarBase: any [] = [];
    console.log(listaEliminar.length);
    listaEliminar.map(select => {
      if(!select.nuevo){
        select.estado = "N";
        listaEliminarBase.push(select);
      }
    });
    console.log(listaEliminarBase);
    this.ageService.actualizarDetalles(this.ageService.PAIS_URL, listaEliminarBase).then((data: any) => {
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
        }, 5000);
      }
    });

  }
}
