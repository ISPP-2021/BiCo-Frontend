import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CercaDeMiComponent } from './components/cerca-de-mi/cerca-de-mi.component';
import { BuscadorNegocioComponent } from './components/buscador-negocio/buscador-negocio.component';
import { FilterCommercePipe } from './pipes/filter-commerce.pipe';
import { HomeComponent } from './components/home/home.component';
import { EditarNegocioComponent } from './components/negocios/editar-negocio/editar-negocio.component';

import { GeocodingService } from './services/geocoding-service/geocoding.service';
import { ConsumerProfileComponent } from './components/users/consumer/consumer-profile.component';
import { SupplierProfileComponent } from './components/users/supplier/supplier-profile.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    NgbModule,
    BrowserModule,
    GoogleMapsModule,
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
  ],
  providers: [GeocodingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
