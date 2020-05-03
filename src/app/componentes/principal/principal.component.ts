import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory,
  Injector,
  OnDestroy
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
    this.cargarHome();
    this.general.activeItemChange.subscribe((value: MenuItem) => {
      console.log("change active item");
      if (value) {
        this.entry.detach();
        if (value.queryParams.ruta)
          this.cargarRuta(value.queryParams.ruta);
        //this.general.rutaActual = [{ label: 'Comprobante Electronico' }, { label: 'Parametros' }]/*value.queryParams.ruta*/;
        this.general.iconoActual = value.icon;
        this.entry.insert(value.queryParams.viewRef.hostView, 0);
        //console.log(this.entry.);
      }

    });
    //this.general.activeItemChange.next(this.general.tabs[0]);

  }

  cargarHome() {
    const factory = this.general.resolver.resolveComponentFactory(IndexComponent);
    let entry1 = factory.create(this.general.injector);
    setTimeout(() => {
      this.general.tabs[0].queryParams.viewRef = entry1;
      this.entry.insert(entry1.hostView, 0);
    }, 500);
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

    let entryRemove: ComponentRef<IndexComponent>;
    this.general.tabs.forEach((tab, i) => {
      if (index === i) {
        entryRemove = this.general.tabs[i].queryParams.viewRef;
      }
    });
    //this.entry.remove();
    this.general.tabs = this.general.tabs.filter((item, i) => i !== index);
    this.general.activeItemChange.next(this.general.tabs[this.general.tabs.length - 1]);
    entryRemove.destroy();
    //console.log(entryRemove.instance);
    //this.entry.remove(0);

    event.preventDefault();
  }

  cargarOpcion(index) {
    this.general.activeItemChange.next(this.general.tabs[index]);
    //this.entry.detach();
    //this.entry.insert(parametros.viewRef.hostView);
  }

}
