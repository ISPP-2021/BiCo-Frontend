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
import { RegisterComponent } from './components/register/register.component';
import { BuscadorNegocioComponent } from './components/buscador-negocio/buscador-negocio.component';
import { VerReservasComponent } from './components/reservas/ver-reservas/ver-reservas.component';
import { MisNegociosComponent } from './components/negocios/mis-negocios/mis-negocios.component';
import { OwnerGuard } from './guards/owner/owner.guard';
import { OwnerBusinessGuard } from './guards/ownerBusiness/owner-business.guard';
import { ConsumerGuard } from './guards/consumer/consumer.guard';
import { AuthenticatedGuard } from './guards/auth/authenticated.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'userProfile',
    component: ConsumerProfileComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'ownerProfile',
    component: SupplierProfileComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'negocio-edit/:id',
    component: EditarNegocioComponent,
    canActivate: [OwnerBusinessGuard]
  },
  {
    path: 'negocio-create',
    component: CrearNegocioComponent,
    canActivate: [OwnerGuard]
  },
  {
    path: 'mis-negocios',
    component: MisNegociosComponent,
    canActivate: [OwnerGuard]
  },
  {
    path: 'negocio/:id',
    component: VerNegocioComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'negocioByReserva/:id',
    component: VerNegocioBookingComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'reservas',
    component: VerReservasComponent,
    canActivate: [ConsumerGuard]
  },
  {
    path: 'services-edit/:id',
    component: ServisesComponent,
    canActivate: [OwnerGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'reservar/:id',
    component: CrearReservaComponent,
    canActivate: [ConsumerGuard]
  },
  {
    path: 'buscar',
    component: BuscadorNegocioComponent,
    canActivate: [ConsumerGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
