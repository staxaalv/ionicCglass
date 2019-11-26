import { Injectable, ComponentFactoryResolver, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { MenuItem } from 'primeng/api';
import { IndexComponent } from 'src/app/componentes/index/index.component';
import { ParametrosGeneralesComponent } from 'src/app/componentes/paginas/ace/man/parametros-generales/parametros-generales.component';
import { Subject } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import { PaisesComponent } from 'src/app/componentes/paginas/age/man/paises/paises.component';
import { AgeSecuenciaPrimariaComponent } from 'src/app/componentes/paginas/age/man/age-secuencia-primaria/age-secuencia-primaria.component';

const entryComponents = {
  parametrosGenerales: ParametrosGeneralesComponent,
  index: IndexComponent,
  paises: PaisesComponent,
  secuenciaPrimaria: AgeSecuenciaPrimariaComponent
};


@Injectable({
  providedIn: 'root'
})
export class GeneralService {


  tabs: MenuItem[];
  activeItem: MenuItem;
  rutaActual: any[] = [];
  iconoActual: any = '';
  navColor = "#2C6AA0";
  rutaLogo = "http://192.168.0.116:8080/ClearGlassPrep/assets/images/logos/logo2.png";
  rutaFoto = "http://192.168.0.116:8080/ClearGlassPrep/images/usuario/usersmf_64.png";
  user = "SADMIN";

  API_URL = environment.apiUrl;

  activeItemChange: Subject<MenuItem> = new Subject<MenuItem>();

  constructor(public http: HttpClient,
    private authService: AutenticacionService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector) {

    this.activeItemChange.subscribe((value) => {
      this.activeItem = value
    });

    const factory = this.resolver.resolveComponentFactory(IndexComponent);
    let entry1 = factory.create(this.injector);
    this.tabs = [
      { label: 'Inicio', icon: 'pi pi-home', queryParams: { 'viewRef': entry1 }, id: '0' }
    ];
    this.rutaActual = [
      { label: 'Home' }
    ];

    this.activeItem = this.tabs[0];

  }

  ngAfterViewInit() {
  }

  agregarTab(componente, descripcion, icono, aplicacion, transaccion, ruta) {

    if (!this.verificarSiExiste(aplicacion, transaccion)) {
      const factory = this.resolver.resolveComponentFactory(entryComponents[componente]);
      let entry1 = factory.create(this.injector);
      //const instance = entry1.instance;
      //instance['ruta'].subscribe(e => this.ruta.emit (e));;
      let id = this.tabs.length;
      console.log(id);
      this.tabs.push({
        label: descripcion, icon: icono, queryParams: { 'viewRef': entry1, 'codigoAplicacion': aplicacion, 'codigoTransaccion': transaccion, 'ruta': ruta, id: id }
      });


      this.activeItemChange.next(this.tabs[this.tabs.length - 1]);
    }

  }

  verificarSiExiste(aplicacion, transaccion) {
    let tab = this.tabs.filter(tab => tab.queryParams.codigoAplicacion == aplicacion && tab.queryParams.codigoTransaccion == transaccion);
    if (tab.length == 0) {
      return false;
    } else {
      this.activeItemChange.next(tab[0]);
      return true;
    }
  }

  
}
