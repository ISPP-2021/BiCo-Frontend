import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VerNegocioComponent } from './components/negocios/ver-negocio/ver-negocio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EditarNegocioComponent } from "./components/negocios/editar-negocio/editar-negocio.component";
import { CrearNegocioComponent } from "./components/negocios/crear-negocio/crear-negocio.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  /*{
    path: 'negocios',
    component: NegociosComponent
  },*/
  {
    path: 'negocio/:id',
    component: VerNegocioComponent
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
