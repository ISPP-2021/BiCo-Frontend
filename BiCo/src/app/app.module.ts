import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CercaDeMiComponent } from './components/cerca-de-mi/cerca-de-mi.component';
import { BuscadorNegocioComponent } from './components/buscador-negocio/buscador-negocio.component';
import { FilterCommercePipe } from './pipes/filter-commerce.pipe';
import { PerfilComponent } from './components/perfil/perfil.component';
import { HomeComponent } from './components/home/home.component';
import { VerNegocioComponent } from './components/negocios/ver-negocio/ver-negocio.component';
import { GeocodingService } from './services/geocoding-service/geocoding.service';
import { EditarNegocioComponent } from './components/negocios/editar-negocio/editar-negocio.component'
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { CrearNegocioComponent } from './components/negocios/crear-negocio/crear-negocio.component';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CercaDeMiComponent,
    BuscadorNegocioComponent,
    PerfilComponent,
    HomeComponent,
    VerNegocioComponent,
    EditarNegocioComponent,
    FilterCommercePipe,
    CrearNegocioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    NgbModule,
    MatButtonModule,
    BrowserModule,
    MatInputModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GeocodingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
