import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import { IndexComponent } from 'src/app/componentes/index/index.component';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent, Message } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { AgeService } from 'src/app/servicios/age/age.service';
import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/servicios/generales/general.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() id: number;
  @Input() data: any[];
  @Input() cols: any[];
  @Input() name: any;
  @Input() loading: any;
  @Input() errorGuardar: boolean;
  @Input() msgsIngresar: Message[];
  @Input() msgsActualizar: Message[];
  @Input() selected: any[];

  @Output() agregarFila = new EventEmitter<string>(false);
  @Output() guardarFilas = new EventEmitter<string>(true);
  @Output() eliminarFilas = new EventEmitter<any>(true);
  @Output() modificarFila = new EventEmitter<any>(true);

  errorSeleccionado: String = "";
  first: number = 0;
  rows: number = 5;
  totalRegistros: number;
  displayDialog: boolean;
  opcionesTipoIdentificacion: any[] = [];
  es: any;

  @ViewChild('dt', { read: Table, static: false })
  dt: Table;

  /*@HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    console.log(event);
  }*/

  @HostListener('window:keyup.ctrl', ['$event'])
  atajos(e) {
    if (e.shiftKey && e.ctrlKey && e.keyCode == 83) {
      if (!this.loading && this.id == this.gs.activeItem.queryParams.id)
        this.guardar();
    }
    if (e.shiftKey && e.ctrlKey && e.keyCode == 65) {
      if (this.id == this.gs.activeItem.queryParams.id)
        this.agregar();
    }
    /*if (e.shiftKey && e.ctrlKey && e.keyCode == 68) {
      if (!this.loading)
        this.guardar();
    }*/
  }

  /*@HostListener('window:keyup.delete', ['$event'])
  atajoEliminar(e) {
    console.log("eliminar");
    if (e.shiftKey && e.ctrlKey && e.keyCode == 68) {
      if (!this.loading)
        this.eliminar();
    }
  }*/


  constructor(private ageService: AgeService, private gs: GeneralService) {
    /*this._hotkeysService.add(new Hotkey('ctrl+shift+s', (event: KeyboardEvent): boolean => {
      console.log('Typed hotkey');
      this.guardar();
      return false; // Prevent bubbling 
    }));*/
    //this.observableOpcionesTipoIdentificacion = this.getOpciones();

  }

  /*getTipoIdentificacion(): any[] {
    this.ageService
      .getDetalle(this.ageService.TIPO_IDENTIFICACION_URL)
      .then((res: any) => {
        this.loading = false;
        if (res.respuestaCodigo == 0) {
          if (res.data) {
            res.data.forEach(data => {
              this.opcionesTipoIdentificacion.push(
                { label: data.descripcion, value: data.codigo }
              );
            });
            return this.opcionesTipoIdentificacion;
          }
          //return res.data;
        } else {
          this.msgsIngresar.push({ severity: 'error', summary: 'Error al consultar: ', detail: JSON.stringify(res.error) });
        }
      });
    return null;
  }*/

  ngOnInit() {
    /*setTimeout(() => {
      this.getTipoIdentificacion();
    }, 3000);*/
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
      monthNamesShort: [ "Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  }
  }

  ngAfterViewChecked() {
    /*if (document.getElementsByClassName('ui-table')[0].scrollWidth <
      document.getElementsByClassName('ui-table-wrapper')[0].scrollWidth) {
      document.getElementsByClassName('ui-table-wrapper')[0].setAttribute("style", "padding-bottom:63px;");
    } else {
      document.getElementsByClassName('ui-table-wrapper')[0].setAttribute("style", "padding-bottom:80px;");
      document.getElementsByClassName('ui-table-wrapper')[0].setAttribute("style", "overflow-x:initial;");
    }*/
  }

  ngAfterViewInit() {
  }

  async agregar() {
    this.first = 0;
    //this.page = 1;
    await this.agregarFila.emit();
    setTimeout(() => {
      this.focusCelda();
      this.totalRegistros = this.data.length;
    }, 200);
  }

  async guardar() {

    for (let index = 0; index < this.data.length; index++) {
      const t = this.data[index];
      if (t.nuevo || t.modificado) {
        if (!this.validarCamposObligatorios(t)) {
          this.loading = false;
          return false;
        }
      }
    }
    await this.guardarFilas.emit();
  }

  validarCamposObligatorios(detalle): boolean {
    for (let index = 0; index < this.cols.length; index++) {
      const col = this.cols[index];
      if (col.required) {
        if (!col.field2) {
          if (!detalle[col.field]) {
            if (col.tipo == 'number') {
              if (detalle[col.field] < 0) {
                this.msgsIngresar = [];
                this.msgsIngresar.push({ severity: 'error', summary: 'Error al ingresar: ', detail: 'Campo ' + col.header + ' requerido' });
                return false;
              }
            } else {
              this.msgsIngresar = [];
              this.msgsIngresar.push({ severity: 'error', summary: 'Error al ingresar: ', detail: 'Campo ' + col.header + ' requerido' });
              return false;
            }
          }
        } else if (col.field2) {
          if (!detalle[col.field][col.field2]) {
            if (col.tipo == 'number') {
              if (detalle[col.field][col.field2] < 0) {
                this.msgsIngresar = [];
                this.msgsIngresar.push({ severity: 'error', summary: 'Error al ingresar: ', detail: 'Campo ' + col.header + ' requerido' });
                return false;
              }

            } else {
              this.msgsIngresar = [];
              this.msgsIngresar.push({ severity: 'error', summary: 'Error al ingresar: ', detail: 'Campo ' + col.header + ' requerido' });
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  async eliminar() {
    await this.eliminarFilas.emit(this.selected);
    this.dt.reset();
    this.first = 0;
    this.totalRegistros = this.data.length;
  }

  modificado(data, col?: any) {
    if (!data.nuevo) {
      data.modificado = true;
    }
    console.log(data.actualizaCampos);
    if (col && col.actualizaCampo) {
      this.modificarFila.emit({
        data: data,
        field: col.field2 ? col.field2 : col.field
      });
    }
  }

  agregarVacio(options: any[], async) {
    if (options.length > 0) {

      let options2: any[] = [];
      options2 = options2.concat(options);
      if (async) {
        options2.splice(0, 1);
      }
      options2.unshift({ label: 'TODOS', value: '' });

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
    this.first = $event.first;
    //this.page = $event.first / $event.rows + 1;
    this.rows = $event.rows;
  }

  filter($event) {
    console.log($event);
  }

  getTotalPage() {
    return Math.ceil(this.totalRegistros ? this.totalRegistros: this.data.length / this.rows);;
  }

  getTotalRegistros(){
    return this.totalRegistros ? this.totalRegistros: this.data.length;
  }

  getPageCurrent() {
    return this.first / this.rows + 1;
  }

  cargarSelect(nivel) {
    console.log(nivel);
  }

  filtrar1($event){
    console.log($event);
    this.totalRegistros = $event.filteredValue.length;
  }

  filtrar($event, dt: Table, field) {
    dt.filter($event.value, field, 'contains')
    console.log(dt.rows);
    console.log(dt.first);
    console.log(dt.filteredValue);
  }
}
