import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from './componentes/footer/footer.component';
import { HeaderComponent } from './componentes/header/header.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuComponent } from './componentes/menu/menu.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { GaugeChartModule } from 'angular-gauge-chart'
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PaginatorModule } from 'primeng/paginator';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { IndexComponent } from './componentes/index/index.component';
import { ParametrosGeneralesComponent } from './componentes/paginas/ace/man/parametros-generales/parametros-generales.component';
import { CabeceraCodigoDescripcionComponent } from './componentes/recursos/cabeceras/cabecera-codigo-descripcion/cabecera-codigo-descripcion.component';
import { DetalleTablaComponent } from './componentes/recursos/detalle/detalle-tabla/detalle-tabla.component';
import { DetalleComponent } from './componentes/recursos/detalles/detalle/detalle.component';
import { JerarquiaComponent } from './componentes/recursos/jerarquia/jerarquia.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaisesComponent } from './componentes/paginas/age/man/paises/paises.component';
import { AgeSecuenciaPrimariaComponent } from './componentes/paginas/age/man/age-secuencia-primaria/age-secuencia-primaria.component';
import { AgePerfilesComponent } from './componentes/paginas/age/man/age-perfiles/age-perfiles.component';
import { AgeLicenciatarioAplicaSecuComponent } from './componentes/paginas/age/man/age-licenciatario-aplica-secu/age-licenciatario-aplica-secu.component';
import { AgeUsuariosComponent } from './componentes/paginas/age/man/age-usuarios/age-usuarios.component';
import { AgeAplicacionesComponent } from './componentes/paginas/age/man/age-aplicaciones/age-aplicaciones.component';
import { AgeTiposIdentificacionesComponent } from './componentes/paginas/age/man/age-tipos-identificaciones/age-tipos-identificaciones.component';
import { AgeSucursalesComponent } from './componentes/paginas/age/man/age-sucursales/age-sucursales.component';
import { AgeTiposSucursalesComponent } from './componentes/paginas/age/man/age-tipos-sucursales/age-tipos-sucursales.component';
import { AgeTiposLocalidadesComponent } from './componentes/paginas/age/man/age-tipos-localidades/age-tipos-localidades.component';
import { AgeLocalidadesComponent } from './componentes/paginas/age/man/age-localidades/age-localidades.component';
import { AgeIdiomasComponent } from './componentes/paginas/age/man/age-idiomas/age-idiomas.component';
import { AgeMonedasComponent } from './componentes/paginas/age/man/age-monedas/age-monedas.component';
import { AgeTransaccionesComponent } from './componentes/paginas/age/man/age-transacciones/age-transacciones.component';
import { AgePerfilesTransaccionesComponent } from './componentes/paginas/age/man/age-perfiles-transacciones/age-perfiles-transacciones.component';
import { AgeUsuariosPerfilesComponent } from './componentes/paginas/age/man/age-usuarios-perfiles/age-usuarios-perfiles.component';
import { AgeParametrosGeneralesComponent } from './componentes/paginas/age/man/age-parametros-generales/age-parametros-generales.component';
import { AgePuntosEmisionesComponent } from './componentes/paginas/age/man/age-puntos-emisiones/age-puntos-emisiones.component';
import { AgeUsuariosPuntoEmisionComponent } from './componentes/paginas/age/man/age-usuarios-punto-emision/age-usuarios-punto-emision.component';
import { AgeUsuariosParametroVigenciaComponent } from './componentes/paginas/age/man/age-usuarios-parametro-vigencia/age-usuarios-parametro-vigencia.component';
import { AgeFormasPagoComponent } from './componentes/paginas/age/man/age-formas-pago/age-formas-pago.component';
import { AgeInstitucionesFinancierasComponent } from './componentes/paginas/age/man/age-instituciones-financieras/age-instituciones-financieras.component';
import { AgeFormaPagoInstituFinanComponent } from './componentes/paginas/age/man/age-forma-pago-institu-finan/age-forma-pago-institu-finan.component';
import { AgeFranquiciasComponent } from './componentes/paginas/age/man/age-franquicias/age-franquicias.component';
import { SriImpuestoComponent } from './componentes/paginas/sri/man/sri-impuesto/sri-impuesto.component';
import { SriErroresInstitucionControlComponent } from './componentes/paginas/sri/man/sri-errores-institucion-control/sri-errores-institucion-control.component';
import { SriTipoComprobanteComponent } from './componentes/paginas/sri/man/sri-tipo-comprobante/sri-tipo-comprobante.component';
import { SriPtoEmisionTipoComprobanteComponent } from './componentes/paginas/sri/man/sri-pto-emision-tipo-comprobante/sri-pto-emision-tipo-comprobante.component';
import { SriImpuestoTarifaComponent } from './componentes/paginas/sri/man/sri-impuesto-tarifa/sri-impuesto-tarifa.component';
import { SriRetencionFuenteComponent } from './componentes/paginas/sri/man/sri-retencion-fuente/sri-retencion-fuente.component';
import { SriRetencionFuentePorcentajeComponent } from './componentes/paginas/sri/man/sri-retencion-fuente-porcentaje/sri-retencion-fuente-porcentaje.component';
import { SriTipoBienServicioComponent } from './componentes/paginas/sri/man/sri-tipo-bien-servicio/sri-tipo-bien-servicio.component';
import { SriClaseContribuyenteRtfComponent } from './componentes/paginas/sri/man/sri-clase-contribuyente-rtf/sri-clase-contribuyente-rtf.component';
import { SriConfiguracionComponent } from './componentes/paginas/sri/man/sri-configuracion/sri-configuracion.component';
import { SriSecuenciaPrimariaComponent } from './componentes/paginas/sri/man/sri-secuencia-primaria/sri-secuencia-primaria.component';
import { CibUnidadesMedidasComponent } from './componentes/paginas/cib/man/cib-unidades-medidas/cib-unidades-medidas.component';
import { CibSecuenciasPrimariasComponent } from './componentes/paginas/cib/man/cib-secuencias-primarias/cib-secuencias-primarias.component';
import { CibSecuenciasLicenciatariosComponent } from './componentes/paginas/cib/man/cib-secuencias-licenciatarios/cib-secuencias-licenciatarios.component';
import { CibEquivalenciasUnidadesMedidasComponent } from './componentes/paginas/cib/man/cib-equivalencias-unidades-medidas/cib-equivalencias-unidades-medidas.component';
import { CibMarcasComponent } from './componentes/paginas/cib/man/cib-marcas/cib-marcas.component';
import { CibLineasComponent } from './componentes/paginas/cib/man/cib-lineas/cib-lineas.component';
import { CibSubLineasComponent } from './componentes/paginas/cib/man/cib-sub-lineas/cib-sub-lineas.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    PrincipalComponent,
    IndexComponent,
    ParametrosGeneralesComponent,
    PaisesComponent,
    CabeceraCodigoDescripcionComponent,
    DetalleTablaComponent,
    DetalleComponent,
    JerarquiaComponent,
    PaisesComponent,
    AgeSecuenciaPrimariaComponent,
    AgePerfilesComponent,
    AgeLicenciatarioAplicaSecuComponent,
    AgeUsuariosComponent,
    AgeAplicacionesComponent,
    AgeTiposIdentificacionesComponent,
    AgeSucursalesComponent,
    AgeTiposSucursalesComponent,
    AgeTiposLocalidadesComponent,
    AgeLocalidadesComponent,
    AgeIdiomasComponent,
    AgeMonedasComponent,
    AgeTransaccionesComponent,
    AgePerfilesTransaccionesComponent,
    AgeUsuariosPerfilesComponent,
    AgeParametrosGeneralesComponent,
    AgePuntosEmisionesComponent,
    AgeUsuariosPuntoEmisionComponent,
    AgeUsuariosParametroVigenciaComponent,
    AgeFormasPagoComponent,
    AgeInstitucionesFinancierasComponent,
    AgeFormaPagoInstituFinanComponent,
    AgeFranquiciasComponent,
    SriImpuestoComponent,
    SriErroresInstitucionControlComponent,
    SriTipoComprobanteComponent,
    SriPtoEmisionTipoComprobanteComponent,
    SriImpuestoTarifaComponent,
    SriRetencionFuenteComponent,
    SriRetencionFuentePorcentajeComponent,
    SriTipoBienServicioComponent,
    SriClaseContribuyenteRtfComponent,
    SriConfiguracionComponent,
    SriSecuenciaPrimariaComponent,
    CibUnidadesMedidasComponent,
    CibSecuenciasPrimariasComponent,
    CibSecuenciasLicenciatariosComponent,
    CibEquivalenciasUnidadesMedidasComponent,
    CibMarcasComponent,
    CibLineasComponent,
    CibSubLineasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    SplitButtonModule,
    DialogModule,
    CalendarModule,
    DropdownModule,
    PanelMenuModule,
    TabMenuModule,
    TieredMenuModule,
    TableModule,
    ChartModule,
    ToastModule,
    GaugeChartModule,
    BreadcrumbModule,
    PaginatorModule,
    OverlayPanelModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.doubleBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    HttpClientModule/*,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    ComponentFactory*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
