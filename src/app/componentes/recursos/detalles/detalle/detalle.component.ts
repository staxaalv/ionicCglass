import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { IndexComponent } from 'src/app/componentes/index/index.component';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';

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

  @Output() agregarFila = new EventEmitter<string>();
  @Output() guardarFilas = new EventEmitter<string>(true);

  errorSeleccionado: String = "";

  @ViewChild(Paginator, { read: ViewContainerRef, static: false }) paginator: Paginator;

  selected: any[];
  displayDialog: boolean;
  //newCar: boolean;

  myStyles = {
    'background-color': 'lime',
    'font-size': '20px',
    'font-weight': 'bold'
  }

  constructor() { }

  ngOnInit() {
    //console.log(JSON.stringify(this.data));
  }

  ngAfterViewInit() {
    //console.log(JSON.stringify(this.data));
  }

  agregar() {
    this.agregarFila.next();
  }
  async guardar() {
    await this.guardarFilas.next();

    


  }
  modificado(data) {
    data.modificado = true;
    //data.guardado = false;
  }
  agregarVacio(options: any[]) {
    if (options) {
      let options2: any[] = [];
      options2 = options2.concat(options);
      options2.unshift({ label: 'Todos', value: '' });
      return options2;
    }

  }

  eliminar() {
    let index: number[] = [];

    this.selected.map(select => {

      let i = this.data.indexOf(select);

      this.data.splice(i, 1)
    });

    console.log(index);

    //index.map((i:number) => this.data.splice(i) );


    this.selected = [];
    this.paginator.ngOnInit();
  }

  showDialogToAdd() {
    //this.newCar = true;
    //this.car = {};
    this.displayDialog = true;
  }

  seleccionarFila(event, error: String, overlaypanel: OverlayPanel) {
    this.errorSeleccionado = error;
    overlaypanel.toggle(event);
  }
}
