import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CercaDeMiComponent } from './components/cerca-de-mi/cerca-de-mi.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfilComponent } from './components/perfil/perfil.component';
import { HomeComponent } from './components/home/home.component';
import { VerNegocioComponent } from './components/negocios/ver-negocio/ver-negocio.component';
import { GeocodingService } from './services/geocoding-service/geocoding.service';
import { EditarNegocioComponent } from './components/negocios/editar-negocio/editar-negocio.component'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CercaDeMiComponent,
    PerfilComponent,
    HomeComponent,
    VerNegocioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    NgbModule,
    EditarNegocioComponent,
    BrowserModule,
    GoogleMapsModule,
    ReactiveFormsModule
  ],
  providers: [GeocodingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
