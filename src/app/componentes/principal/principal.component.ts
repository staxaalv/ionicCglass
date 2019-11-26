import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory,
  Injector
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GeneralService } from 'src/app/servicios/generales/general.service';
import { ParametrosGeneralesComponent } from '../paginas/ace/man/parametros-generales/parametros-generales.component';
import { IndexComponent } from '../index/index.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  @ViewChild('messagecontainer', { read: ViewContainerRef, static: false })
  entry: ViewContainerRef;

  constructor(public general: GeneralService) { }
  
  ngAfterViewInit() {
    this.general.activeItemChange.subscribe((value: MenuItem) => {
      console.log("change active item");
      this.entry.detach();
      if (value.queryParams.ruta)
        this.cargarRuta(value.queryParams.ruta);
      //this.general.rutaActual = [{ label: 'Comprobante Electronico' }, { label: 'Parametros' }]/*value.queryParams.ruta*/;
      this.general.iconoActual = value.icon;
      this.entry.insert(value.queryParams.viewRef.hostView, 0);
      //console.log(this.entry.);
    });
    this.general.activeItemChange.next(this.general.tabs[0]);

  }

  cargarRuta(ruta: String) {
    let separador: string = '-';
    let rutaSeparada: String[] = ruta.split(separador);
    this.general.rutaActual = [];
    rutaSeparada.forEach(r => {
      this.general.rutaActual.push(
        {
          label: r
        }
      );
    });
  }

  closeItem(event, index, id) {

    console.log(id);
    this.general.tabs = this.general.tabs.filter((item, i) => i !== index);
    this.general.activeItemChange.next(this.general.tabs[this.general.tabs.length - 1]);
    //this.entry.remove(0);

    event.preventDefault();
  }

  cargarOpcion(index) {
    this.general.activeItemChange.next(this.general.tabs[index]);
    //this.entry.detach();
    //this.entry.insert(parametros.viewRef.hostView);
  }

}
