import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { IndexComponent } from 'src/app/componentes/index/index.component';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent, Message } from 'primeng/api';
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
  @Input() msgsIngresar: Message[];
  @Input() msgsActualizar: Message[];

  @Output() agregarFila = new EventEmitter<string>(false);
  @Output() guardarFilas = new EventEmitter<string>(true);

  errorSeleccionado: String = "";
  first: number = 0;
  rows: number = 5;
  page: number = 1;

  @ViewChild(Paginator, { read: ViewContainerRef, static: false }) paginator: Paginator;
  

  
  selected: any[];
  displayDialog: boolean;
  /*myStyles = {
    'background-color': 'lime',
    'font-size': '20px',
    'font-weight': 'bold'
  }*/

  constructor() { }

  ngOnInit() {
    //console.log(JSON.stringify(this.data));
  }

  ngAfterViewInit() {
    //console.log(JSON.stringify(this.data));
  }

  async agregar() {
    console.log(this.first);
    this.first = 0;
    this.page = 1;
    await this.agregarFila.emit();
    setTimeout(() => {
      this.focusCelda();
    }, 200);

  }

  async guardar() {
    await this.guardarFilas.emit();
  }

  modificado(data) {
    if (!data.nuevo)
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

  focusCelda() {
    //alert(document.getElementsByTagName("tr")[2].getElementsByTagName("input")[0].type);
    //alert(document.getElementsByTagName("tr")[2].getElementsByTagName("input")[1].disabled);

    let elementos = document.getElementsByTagName("tr")[2].getElementsByTagName("input");

    //document.getElementsByTagName("tr")[2].getElementsByTagName("input")[1].click();
    for (let i = 0; i < elementos.length; i++) {
      if (elementos[i].type != 'checkbox' && !elementos[i].disabled) {
        elementos[i].focus();
        return;
      }
    }
  }

  paginate($event){
    console.log($event);
    //this.page = $event.page;
    this.first = $event.first;
    this.page = $event.first/$event.rows + 1;
    //this.first = $event.first/$event.rows + 1;
  }
}
