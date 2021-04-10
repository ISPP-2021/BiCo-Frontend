import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConsumerProfileComponent } from './components/users/consumer/consumer-profile.component';
import { SupplierProfileComponent } from './components/users/supplier/supplier-profile.component';
import { EditarNegocioComponent } from './components/negocios/editar-negocio/editar-negocio.component';
import { CrearNegocioComponent } from './components/negocios/crear-negocio/crear-negocio.component';
import { VerNegocioComponent } from './components/negocios/ver-negocio/ver-negocio.component';
import { VerNegocioBookingComponent } from './components/negocios/ver-negocio-booking/ver-negocio-booking.component';
import { CrearReservaComponent } from './components/reservas/crear-reserva/crear-reserva.component';
import { ServisesComponent } from './components/servises/servises.component';
import { LoginComponent } from './components/login/login.component';
import { BuscadorNegocioComponent } from './components/buscador-negocio/buscador-negocio.component';
import { VerReservasComponent } from './components/reservas/ver-reservas/ver-reservas.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'consumer/:id',
    component: ConsumerProfileComponent,
  },
  {
    path: 'supplier/:id',
    component: SupplierProfileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'negocio-edit/:id',
    component: EditarNegocioComponent,
  },
  {
    path: 'negocio-create',
    component: CrearNegocioComponent,
  },
  {
    path: 'negocio/:id',
    component: VerNegocioComponent,
  },
  {
    path: 'negocioByReserva/:id',
    component: VerNegocioBookingComponent,
  },
  {
    path: 'reservas',
    component: VerReservasComponent,
  },
  {
    path: 'services-edit/:id',
    component: ServisesComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'reservar/:id',
    component: CrearReservaComponent,
  },
  {
    path: 'buscar',
    component: BuscadorNegocioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
