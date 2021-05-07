import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConsumerProfileComponent } from './components/users/consumer/consumer-view-profile/consumer-profile.component';
import { SupplierProfileComponent } from './components/users/supplier/supplier-view-profile/supplier-profile.component';
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
import { NotAuthGuard } from './guards/not-auth/not-auth.guard';
import { CrearReservaPropietarioComponent } from './components/reservas/crear-reserva-propietario/crear-reserva-propietario.component';
import { SubirImagenComponent } from './components/subir-imagen/subir-imagen.component';
import { ConsumerEditProfileComponent } from './components/users/consumer/consumer-edit-profile/consumer-edit-profile.component';
import { SupplierEditProfileComponent } from './components/users/supplier/supplier-edit-profile/supplier-edit-profile.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'userProfile',
    component: ConsumerProfileComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'userProfile/:id/edit',
    component: ConsumerEditProfileComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'ownerProfile/:id/edit',
    component: SupplierEditProfileComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'ownerProfile',
    component: SupplierProfileComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'negocio-edit/:id',
    component: EditarNegocioComponent,
    canActivate: [OwnerBusinessGuard],
  },
  {
    path: 'negocio-create',
    component: CrearNegocioComponent,
    canActivate: [OwnerGuard],
  },
  {
    path: 'mis-negocios',
    component: MisNegociosComponent,
    canActivate: [OwnerGuard],
  },
  {
    path: 'negocio/:id',
    component: VerNegocioComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'negocioByReserva/:id',
    component: VerNegocioBookingComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'reservas',
    component: VerReservasComponent,
    canActivate: [ConsumerGuard],
  },
  {
    path: 'services-edit/:id',
    component: ServisesComponent,
    canActivate: [OwnerGuard],
  },
  {
    path: 'upload',
    component: SubirImagenComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'reservar/:id',
    component: CrearReservaComponent,
    canActivate: [ConsumerGuard],
  },
  {
    path: 'buscar',
    component: BuscadorNegocioComponent,
    canActivate: [ConsumerGuard],
  },
  {
    path: 'nueva-reserva/:id',
    component: CrearReservaPropietarioComponent,
    canActivate: [OwnerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
