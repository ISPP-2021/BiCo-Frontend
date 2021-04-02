import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditarNegocioComponent } from "./components/negocios/editar-negocio/editar-negocio.component";
import { CrearNegocioComponent } from "./components/negocios/crear-negocio/crear-negocio.component";
import { VerNegocioComponent } from './components/negocios/ver-negocio/ver-negocio.component';
import { ServisesComponent } from './components/servises/servises.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'perfil',
    component: UserProfileComponent
  },
   {
    path: 'negocio-edit/:id',
    component: EditarNegocioComponent
  },
   {
    path: 'negocio-create',
    component: CrearNegocioComponent
  },

  {
    path: 'negocio/:id',
    component: VerNegocioComponent
  },
    {
    path: 'services-edit/:id',
    component: ServisesComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
