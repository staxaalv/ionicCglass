import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { IndexComponent } from 'src/app/componentes/index/index.component';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent, Message } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() data: any[];
  @Input() cols: any[];
  @Input() name: any;
  @Input() loading: any;
  @Input() errorGuardar: boolean;
  @Input() msgsIngresar: Message[];
  @Input() msgsActualizar: Message[];
  @Input() selected: any[];
  @Input() key: String;

  @Output() agregarFila = new EventEmitter<string>(false);
  @Output() guardarFilas = new EventEmitter<string>(true);
  @Output() eliminarFilas = new EventEmitter<any>(true);

  errorSeleccionado: String = "";
  first: number = 0;
  rows: number = 5;
  //page: number = 1;
  displayDialog: boolean;

  //@ViewChild(Table) dataTableComponent: Table;

  @ViewChild('dt', { read: Table, static: false })
  dt: Table;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  async agregar() {
    console.log(this.first);
    this.first = 0;
    //this.page = 1;
    await this.agregarFila.emit();
    setTimeout(() => {
      this.focusCelda();
    }, 200);
  }

  async guardar() {
    await this.guardarFilas.emit();
  }

  async eliminar() {
    await this.eliminarFilas.emit(this.selected);
    this.dt.reset();
    this.first = 0;
  }

  modificado(data) {
    if (!data.nuevo)
      data.modificado = true;
  }

  agregarVacio(options: any[]) {
    if (options) {
      let options2: any[] = [];
      options2 = options2.concat(options);
      options2.unshift({ label: 'Todos', value: '' });
      return options2;
    }
  }



  showDialogToAdd() {
    this.displayDialog = true;
  }

  seleccionarFila(event, error: String, overlaypanel: OverlayPanel) {
    this.errorSeleccionado = error;
    overlaypanel.toggle(event);
  }

  focusCelda() {
    let elementos = document.getElementsByTagName("tr")[2].getElementsByTagName("input");
    for (let i = 0; i < elementos.length; i++) {
      if (elementos[i].type != 'checkbox' && !elementos[i].disabled) {
        elementos[i].focus();
        return;
      }
    }
  }

  paginate($event) {
    console.log($event);
    this.first = $event.first;
    //this.page = $event.first / $event.rows + 1;
    this.rows = $event.rows;
  }

  getTotalPage() {
    return Math.ceil(this.data.length / this.rows);;
  }

  getPageCurrent() {
    return this.first / this.rows + 1;
  }

}
