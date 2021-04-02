import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConsumerProfileComponent } from './components/users/consumer/consumer-profile.component';
import { SupplierProfileComponent } from './components/users/supplier/supplier-profile.component';

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
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
