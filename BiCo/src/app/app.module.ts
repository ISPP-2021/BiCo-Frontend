import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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

@NgModule({
  declarations: [
    AppComponent,
    CercaDeMiComponent,
    BuscadorNegocioComponent,
    PerfilComponent,
    HomeComponent,
    VerNegocioComponent,
    EditarNegocioComponent,
    FilterCommercePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    NgbModule,
    BrowserModule,
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GeocodingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
