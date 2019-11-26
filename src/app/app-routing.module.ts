import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { AuthGuard } from './servicios/auth/auth.guard';
import { IndexComponent } from './componentes/index/index.component';
import { ParametrosGeneralesComponent } from './componentes/paginas/ace/man/parametros-generales/parametros-generales.component';
import { PaisesComponent } from './componentes/paginas/age/man/paises/paises.component';
import { AgeSecuenciaPrimariaComponent } from './componentes/paginas/age/man/age-secuencia-primaria/age-secuencia-primaria.component';

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
        path: 'parametrosGenerales', component: ParametrosGeneralesComponent
      },
      {
        path: 'paises', component: PaisesComponent
      },
      {
        path: 'secuenciaPrimaria', component: AgeSecuenciaPrimariaComponent
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
