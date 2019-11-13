import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GeneralService } from 'src/app/servicios/generales/general.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  transacciones: any;
  items: MenuItem[] = [];
  loading = false;

  constructor(private general: GeneralService) {
    this.getTransacciones();
  }

  getTransacciones() {
    this.loading = true;
    this.general
      .getTransacciones()
      .then(data => {
        //console.log(JSON.stringify(data));
        this.transacciones = data;
        this.cargarMenu();
        this.loading = false;
      });
  }

  cargarMenu() {
    this.transacciones.forEach(transaccion => {
      this.items.push(
        {
          label: transaccion.descripcion,
          icon: transaccion.parametros,
          items: this.cargarHijos(transaccion, transaccion.parametros)
        }
      );
    });
    console.log(this.items);
  }

  cargarHijos(transaccion, icono): MenuItem[] {

    let transacciones = [];
    if (!transaccion.ageTransaccionesList) {
      return null;
    }
    transaccion.ageTransaccionesList.forEach(transaccion1 => {

      let transaccionesHijos = this.cargarHijos(transaccion1, icono)
      if (transaccionesHijos.length == 0) {
        transacciones.push(
          {
            label: transaccion1.descripcion,
            icon: transaccion1.parametros,
            command: (event) => this.nagivate(transaccion1.parametros, transaccion1.descripcion, icono, transaccion1.ageTransaccionesPK.aplicaciCodigo, transaccion1.ageTransaccionesPK.codigo )
          }
        );
      } else {
        transacciones.push(
          {
            label: transaccion1.descripcion,
            icon: transaccion1.parametros,
            items: transaccionesHijos
          }
        );
      }

    });
    return transacciones;

  }

  ngOnInit() {
  }

  nagivate(componente, descripcion, icono, aplicacion, transaccion) {
    this.general.agregarTab(componente, descripcion, icono, aplicacion, transaccion);
  }
}
