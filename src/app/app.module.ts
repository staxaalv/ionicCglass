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
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { IndexComponent } from './componentes/index/index.component';
import { ParametrosGeneralesComponent } from './componentes/paginas/ace/man/parametros-generales/parametros-generales.component';
import { CabeceraCodigoDescripcionComponent } from './componentes/recursos/cabeceras/cabecera-codigo-descripcion/cabecera-codigo-descripcion.component';
import { DetalleTablaComponent } from './componentes/recursos/detalle/detalle-tabla/detalle-tabla.component';
import { DetalleComponent } from './componentes/recursos/detalles/detalle/detalle.component';
import { JerarquiaComponent } from './componentes/recursos/jerarquia/jerarquia.component';

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
    CabeceraCodigoDescripcionComponent,
    DetalleTablaComponent,
    DetalleComponent,
    JerarquiaComponent
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
