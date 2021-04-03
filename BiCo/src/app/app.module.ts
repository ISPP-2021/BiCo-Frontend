import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ConsumerProfileComponent } from './components/users/consumer/consumer-profile.component';
import { SupplierProfileComponent } from './components/users/supplier/supplier-profile.component';

import { CercaDeMiComponent } from './components/cerca-de-mi/cerca-de-mi.component';
import { GeocodingService } from './services/geocoding-service/geocoding.service';

import { BuscadorNegocioComponent } from './components/buscador-negocio/buscador-negocio.component';
import { FilterCommercePipe } from './pipes/filter-commerce.pipe';
import { CrearNegocioComponent } from './components/negocios/crear-negocio/crear-negocio.component';
import { VerNegocioComponent } from './components/negocios/ver-negocio/ver-negocio.component';
import { CrearReservaComponent } from './components/reservas/crear-reserva/crear-reserva.component';
import { EditarNegocioComponent } from './components/negocios/editar-negocio/editar-negocio.component';

import { ServisesComponent } from './components/servises/servises.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';




@NgModule({
  declarations: [
    AppComponent,
    CercaDeMiComponent,
    BuscadorNegocioComponent,
    HomeComponent,
    EditarNegocioComponent,
    FilterCommercePipe,
    ConsumerProfileComponent,
    SupplierProfileComponent,
    CrearNegocioComponent,
    ServisesComponent,
    LoginComponent,
    VerNegocioComponent,
    CrearReservaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    HttpClientModule,
    MatDividerModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatTabsModule,
    MatListModule,
    MatSidenavModule,
  ],
  providers: [
    GeocodingService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
