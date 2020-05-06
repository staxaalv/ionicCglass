import { Injectable, ComponentFactoryResolver, Injector, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { MenuItem } from 'primeng/api';
import { IndexComponent } from 'src/app/componentes/index/index.component';
import { ParametrosGeneralesComponent } from 'src/app/componentes/paginas/ace/man/parametros-generales/parametros-generales.component';
import { Subject, Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import { PaisesComponent } from 'src/app/componentes/paginas/age/man/paises/paises.component';
import { AgeSecuenciaPrimariaComponent } from 'src/app/componentes/paginas/age/man/age-secuencia-primaria/age-secuencia-primaria.component';
import { AgePerfilesComponent } from 'src/app/componentes/paginas/age/man/age-perfiles/age-perfiles.component';
import { AgeUsuariosComponent } from 'src/app/componentes/paginas/age/man/age-usuarios/age-usuarios.component';
import { AgeLicenciatarioAplicaSecuComponent } from 'src/app/componentes/paginas/age/man/age-licenciatario-aplica-secu/age-licenciatario-aplica-secu.component';
import { AgeAplicacionesComponent } from 'src/app/componentes/paginas/age/man/age-aplicaciones/age-aplicaciones.component';
import { AgeTiposIdentificacionesComponent } from 'src/app/componentes/paginas/age/man/age-tipos-identificaciones/age-tipos-identificaciones.component';
import { AgeSucursalesComponent } from 'src/app/componentes/paginas/age/man/age-sucursales/age-sucursales.component';
import { AgeTiposSucursalesComponent } from 'src/app/componentes/paginas/age/man/age-tipos-sucursales/age-tipos-sucursales.component';
import { AgeTiposLocalidadesComponent } from 'src/app/componentes/paginas/age/man/age-tipos-localidades/age-tipos-localidades.component';
import { AgeLocalidadesComponent } from 'src/app/componentes/paginas/age/man/age-localidades/age-localidades.component';
import { AgeIdiomasComponent } from 'src/app/componentes/paginas/age/man/age-idiomas/age-idiomas.component';
import { AgeMonedasComponent } from 'src/app/componentes/paginas/age/man/age-monedas/age-monedas.component';
import { AgeTransaccionesComponent } from 'src/app/componentes/paginas/age/man/age-transacciones/age-transacciones.component';
import { AgePerfilesTransaccionesComponent } from 'src/app/componentes/paginas/age/man/age-perfiles-transacciones/age-perfiles-transacciones.component';
import { AgeUsuariosPerfilesComponent } from 'src/app/componentes/paginas/age/man/age-usuarios-perfiles/age-usuarios-perfiles.component';
import { AgeParametrosGeneralesComponent } from 'src/app/componentes/paginas/age/man/age-parametros-generales/age-parametros-generales.component';
import { AgePuntosEmisionesComponent } from 'src/app/componentes/paginas/age/man/age-puntos-emisiones/age-puntos-emisiones.component';
import { AgeUsuariosPuntoEmisionComponent } from 'src/app/componentes/paginas/age/man/age-usuarios-punto-emision/age-usuarios-punto-emision.component';
import { AgeUsuariosParametroVigenciaComponent } from 'src/app/componentes/paginas/age/man/age-usuarios-parametro-vigencia/age-usuarios-parametro-vigencia.component';
import { AgeFranquiciasComponent } from 'src/app/componentes/paginas/age/man/age-franquicias/age-franquicias.component';
import { AgeFormasPagoComponent } from 'src/app/componentes/paginas/age/man/age-formas-pago/age-formas-pago.component';
import { AgeInstitucionesFinancierasComponent } from 'src/app/componentes/paginas/age/man/age-instituciones-financieras/age-instituciones-financieras.component';
import { SriImpuestoComponent } from 'src/app/componentes/paginas/sri/man/sri-impuesto/sri-impuesto.component';
import { SriErroresInstitucionControlComponent } from 'src/app/componentes/paginas/sri/man/sri-errores-institucion-control/sri-errores-institucion-control.component';
import { SriTipoComprobanteComponent } from 'src/app/componentes/paginas/sri/man/sri-tipo-comprobante/sri-tipo-comprobante.component';
import { SriPtoEmisionTipoComprobanteComponent } from 'src/app/componentes/paginas/sri/man/sri-pto-emision-tipo-comprobante/sri-pto-emision-tipo-comprobante.component';
import { SriImpuestoTarifaComponent } from 'src/app/componentes/paginas/sri/man/sri-impuesto-tarifa/sri-impuesto-tarifa.component';
import { SriRetencionFuenteComponent } from 'src/app/componentes/paginas/sri/man/sri-retencion-fuente/sri-retencion-fuente.component';
import { SriRetencionFuentePorcentajeComponent } from 'src/app/componentes/paginas/sri/man/sri-retencion-fuente-porcentaje/sri-retencion-fuente-porcentaje.component';
import { SriTipoBienServicioComponent } from 'src/app/componentes/paginas/sri/man/sri-tipo-bien-servicio/sri-tipo-bien-servicio.component';
import { SriClaseContribuyenteRtfComponent } from 'src/app/componentes/paginas/sri/man/sri-clase-contribuyente-rtf/sri-clase-contribuyente-rtf.component';
import { SriConfiguracionComponent } from 'src/app/componentes/paginas/sri/man/sri-configuracion/sri-configuracion.component';
import { SriSecuenciaPrimariaComponent } from 'src/app/componentes/paginas/sri/man/sri-secuencia-primaria/sri-secuencia-primaria.component';
import { CibUnidadesMedidasComponent } from 'src/app/componentes/paginas/cib/man/cib-unidades-medidas/cib-unidades-medidas.component';
import { CibSecuenciasPrimariasComponent } from 'src/app/componentes/paginas/cib/man/cib-secuencias-primarias/cib-secuencias-primarias.component';
import { CibSecuenciasLicenciatariosComponent } from 'src/app/componentes/paginas/cib/man/cib-secuencias-licenciatarios/cib-secuencias-licenciatarios.component';
import { CibEquivalenciasUnidadesMedidasComponent } from 'src/app/componentes/paginas/cib/man/cib-equivalencias-unidades-medidas/cib-equivalencias-unidades-medidas.component';
import { CibMarcasComponent } from 'src/app/componentes/paginas/cib/man/cib-marcas/cib-marcas.component';
import { CibLineasComponent } from 'src/app/componentes/paginas/cib/man/cib-lineas/cib-lineas.component';
import { CibSubLineasComponent } from 'src/app/componentes/paginas/cib/man/cib-sub-lineas/cib-sub-lineas.component';
import { CibProductosComponent } from 'src/app/componentes/paginas/cib/man/cib-productos/cib-productos.component';
import { CibProductosImpuestosComponent } from 'src/app/componentes/paginas/cib/man/cib-productos-impuestos/cib-productos-impuestos.component';
import { CibProductosAdicionalesComponent } from 'src/app/componentes/paginas/cib/man/cib-productos-adicionales/cib-productos-adicionales.component';
import { CibSucursalesInventarioComponent } from 'src/app/componentes/paginas/cib/man/cib-sucursales-inventario/cib-sucursales-inventario.component';
import { CibCabeceraMovimientoComponent } from 'src/app/componentes/paginas/cib/man/cib-cabecera-movimiento/cib-cabecera-movimiento.component';
import { CibDetalleMovimientoComponent } from 'src/app/componentes/paginas/cib/man/cib-detalle-movimiento/cib-detalle-movimiento.component';
import { CibCabeceraRecetasComponent } from 'src/app/componentes/paginas/cib/man/cib-cabecera-recetas/cib-cabecera-recetas.component';
import { CibDetalleRecetasComponent } from 'src/app/componentes/paginas/cib/man/cib-detalle-recetas/cib-detalle-recetas.component';
const entryComponents = {
  index: IndexComponent,
  paises: PaisesComponent,
  secuenciaPrimaria: AgeSecuenciaPrimariaComponent,
  perfiles: AgePerfilesComponent,
  usuarios: AgeUsuariosComponent,
  secuenciasLicenciatario: AgeLicenciatarioAplicaSecuComponent,
  ageAplicaciones: AgeAplicacionesComponent,
  ageTiposIdentificaciones: AgeTiposIdentificacionesComponent,
  ageSucursales: AgeSucursalesComponent,
  ageTiposSucursales: AgeTiposSucursalesComponent,
  ageTiposLocalidades: AgeTiposLocalidadesComponent,
  ageLocalidades: AgeLocalidadesComponent,
  ageIdiomas: AgeIdiomasComponent,
  ageMonedas: AgeMonedasComponent,
  ageTransacciones: AgeTransaccionesComponent,
  ageTransaccionesPerfiles: AgePerfilesTransaccionesComponent,
  ageUsuariosPerfiles: AgeUsuariosPerfilesComponent,
  ageParametrosGenerales: AgeParametrosGeneralesComponent,
  agePuntosEmision: AgePuntosEmisionesComponent,
  ageUsuariosPuntoEmision: AgeUsuariosPuntoEmisionComponent,
  ageUsuariosParamVigencia: AgeUsuariosParametroVigenciaComponent,
  ageFranquicias: AgeFranquiciasComponent,
  ageFormasPagos: AgeFormasPagoComponent,
  ageInstitucionesFinancieras: AgeInstitucionesFinancierasComponent,
  sriImpuesto: SriImpuestoComponent,
  sriErroresInstitucionContr: SriErroresInstitucionControlComponent,
  sriTipoComprobante: SriTipoComprobanteComponent,
  sriPtoEmisionTipoComprobante: SriPtoEmisionTipoComprobanteComponent,
  sriImpuestoTarifa: SriImpuestoTarifaComponent,
  sriRetencionFuente: SriRetencionFuenteComponent,
  sriRetencionFuentePorcentaje: SriRetencionFuentePorcentajeComponent,
  sriTipoBienServicio: SriTipoBienServicioComponent,
  sriClaseContribuyenteRtf: SriClaseContribuyenteRtfComponent,
  sriConfiguracion: SriConfiguracionComponent,
  sriSecuenciaPrimaria: SriSecuenciaPrimariaComponent,
  cibUnidadesMedidas: CibUnidadesMedidasComponent,
  cibSecuenciaPrimaria: CibSecuenciasPrimariasComponent,
  cibLicenciatariosAplicaSecu: CibSecuenciasLicenciatariosComponent,
  cibEquivUnidMed: CibEquivalenciasUnidadesMedidasComponent,
  cibMarcas: CibMarcasComponent,
  cibLineas: CibLineasComponent,
  cibSubLineas: CibSubLineasComponent,
  cibProductos: CibProductosComponent,
  cibProductosImpuestos: CibProductosImpuestosComponent,
  cibProductosAdicionales: CibProductosAdicionalesComponent,
  cibInvetarioSucursales: CibSucursalesInventarioComponent,
  cibCabeceraMovimiento: CibCabeceraMovimientoComponent,
  cibDetalleMovimiento: CibDetalleMovimientoComponent,
  cibCabeceraRecetas: CibCabeceraRecetasComponent,
  cibDetalleRecetas: CibDetalleRecetasComponent
};

@Injectable({
  providedIn: 'root'
})
export class GeneralService implements OnDestroy {


  tabs: MenuItem[] = [];
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
    public resolver: ComponentFactoryResolver,
    public injector: Injector) {
    this.inicializarServicio();
  }

  inicializarServicio() {
    this.tabs = [
      { label: 'Inicio', icon: 'pi pi-home', queryParams: { 'viewRef': null }, id: '0' }
    ];
    this.rutaActual = [
      { label: 'Home' }
    ];
    this.activeItem = this.tabs[0];
    this.activeItemChange.subscribe((value) => {
      this.activeItem = value
    });
  }

  cargarHome() {
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
      let id = this.tabs.length;
      entry1.instance['id'] = id;
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

  cerrarSesion() {
    this.authService.autenticado = false;
    this.authService.codigoLicenciatario = null;
    this.authService.codigoUsuario = null;
    this.authService.token = "";

    //this.activeItem = this.tabs[0];
    //this.activeItemChange.next(this.tabs[0]);
    //this.cargarHome();
    //this.inicializarServicio();
    sessionStorage.clear();
    //Cerrar session en base de datos
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    console.log("destroy");
    this.activeItemChange.unsubscribe();
  }
}
