import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { AuthGuard } from './servicios/auth/auth.guard';
import { IndexComponent } from './componentes/index/index.component';
import { ParametrosGeneralesComponent } from './componentes/paginas/ace/man/parametros-generales/parametros-generales.component';
import { PaisesComponent } from './componentes/paginas/age/man/paises/paises.component';
import { AgeSecuenciaPrimariaComponent } from './componentes/paginas/age/man/age-secuencia-primaria/age-secuencia-primaria.component';
import { AgePerfilesComponent } from './componentes/paginas/age/man/age-perfiles/age-perfiles.component';
import { AgeUsuariosComponent } from './componentes/paginas/age/man/age-usuarios/age-usuarios.component';
import { AgeLicenciatarioAplicaSecuComponent } from './componentes/paginas/age/man/age-licenciatario-aplica-secu/age-licenciatario-aplica-secu.component';
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
import { AgeFranquiciasComponent } from './componentes/paginas/age/man/age-franquicias/age-franquicias.component';
import { AgeFormasPagoComponent } from './componentes/paginas/age/man/age-formas-pago/age-formas-pago.component';
import { AgeInstitucionesFinancierasComponent } from './componentes/paginas/age/man/age-instituciones-financieras/age-instituciones-financieras.component';
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
import { CibUnidadesMedidasComponent } from './componentes/paginas/cib/man/cib-unidades-medidas/cib-unidades-medidas.component';
import { CibSecuenciasPrimariasComponent } from './componentes/paginas/cib/man/cib-secuencias-primarias/cib-secuencias-primarias.component';
import { CibSecuenciasLicenciatariosComponent } from './componentes/paginas/cib/man/cib-secuencias-licenciatarios/cib-secuencias-licenciatarios.component';
import { CibEquivalenciasUnidadesMedidasComponent } from './componentes/paginas/cib/man/cib-equivalencias-unidades-medidas/cib-equivalencias-unidades-medidas.component';
import { CibMarcasComponent } from 'src/app/componentes/paginas/cib/man/cib-marcas/cib-marcas.component';
import { CibLineasComponent } from './componentes/paginas/cib/man/cib-lineas/cib-lineas.component';
import { CibSubLineasComponent } from './componentes/paginas/cib/man/cib-sub-lineas/cib-sub-lineas.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'index/:id', component: IndexComponent,
      },
      {
        path: 'paises', component: PaisesComponent
      },
      {
        path: 'secuenciaPrimaria', component: AgeSecuenciaPrimariaComponent
      },
      {
        path: 'perfiles', component: AgePerfilesComponent
      },
      {
        path: 'usuarios', component: AgeUsuariosComponent
      },
      {
        path: 'secuenciasLicenciatario', component: AgeLicenciatarioAplicaSecuComponent
      },
      {
        path: 'ageAplicaciones', component: AgeAplicacionesComponent
      },
      {
        path: 'ageTiposIdentificaciones', component: AgeTiposIdentificacionesComponent
      },
      {
        path: 'ageSucursales', component: AgeSucursalesComponent
      },
      {
        path: 'ageTiposSucursales', component: AgeTiposSucursalesComponent
      },
      {
        path: 'ageTiposLocalidades', component: AgeTiposLocalidadesComponent
      },
      {
        path: 'ageLocalidades', component: AgeLocalidadesComponent
      },
      {
        path: 'ageIdiomas', component: AgeIdiomasComponent
      },
      {
        path: 'ageMonedas', component: AgeMonedasComponent
      },
      {
        path: 'ageTransacciones', component: AgeTransaccionesComponent
      },
      {
        path: 'ageTransaccionesPerfiles', component: AgePerfilesTransaccionesComponent
      },
      {
        path: 'ageUsuariosPerfiles', component: AgeUsuariosPerfilesComponent
      },
      {
        path: 'ageParametrosGenerales', component: AgeParametrosGeneralesComponent
      },
      {
        path: 'agePuntosEmision', component: AgePuntosEmisionesComponent
      },
      {
        path: 'ageUsuariosPuntoEmision', component: AgeUsuariosPuntoEmisionComponent
      },
      {
        path: 'ageUsuariosParamVigencia', component: AgeUsuariosParametroVigenciaComponent
      },
      {
        path: 'ageFranquicias', component: AgeFranquiciasComponent
      },
      {
        path: 'ageFormasPagos', component: AgeFormasPagoComponent
      },
      {
        path: 'ageInstitucionesFinancieras', component: AgeInstitucionesFinancierasComponent
      },
      {
        path: 'sriImpuesto', component: SriImpuestoComponent
      },
      {
        path: 'sriErroresInstitucionContr', component: SriErroresInstitucionControlComponent
      },
      {
        path: 'sriTipoComprobante', component: SriTipoComprobanteComponent
      },
      {
        path: 'sriPtoEmisionTipoComprobante', component: SriPtoEmisionTipoComprobanteComponent
      },
      {
        path: 'sriImpuestoTarifa', component: SriImpuestoTarifaComponent
      },
      {
        path: 'sriRetencionFuente', component: SriRetencionFuenteComponent
      },
      {
        path: 'sriRetencionFuentePorcentaje', component: SriRetencionFuentePorcentajeComponent
      },
      {
        path: 'sriTipoBienServicio', component: SriTipoBienServicioComponent
      },
      {
        path: 'sriClaseContribuyenteRtf', component: SriClaseContribuyenteRtfComponent
      },
      {
        path: 'sriConfiguracion', component: SriConfiguracionComponent
      },
      {
        path: 'sriSecuenciaPrimaria', component: SriSecuenciaPrimariaComponent
      },
      {
        path: 'cibUnidadesMedidas', component: CibUnidadesMedidasComponent
      },
      {
        path: 'cibSecuenciaPrimaria', component: CibSecuenciasPrimariasComponent
      },
      {
        path: 'cibLicenciatariosAplicaSecu', component: CibSecuenciasLicenciatariosComponent
      },
      {
        path: 'cibEquivUnidMed', component: CibEquivalenciasUnidadesMedidasComponent
      },
      {
        path: 'cibMarcas', component: CibMarcasComponent
      },
      {
        path: 'cibLineas', component: CibLineasComponent
      },
      {
        path: 'cibSubLineas', component: CibSubLineasComponent
      }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
