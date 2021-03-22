import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CercaDeMiComponent } from './cerca-de-mi/cerca-de-mi.component';
import { BuscadorNegocioComponent } from './buscador-negocio/buscador-negocio.component';
import { FilterCommercePipe } from './pipes/filter-commerce.pipe'
import { FormsModule} from '@angular/forms'
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfilComponent } from './components/perfil/perfil.component';
import { HomeComponent } from './components/home/home.component';
import { VerNegocioComponent } from './components/negocios/ver-negocio/ver-negocio.component';
import { GeocodingService } from './geocoding.service';
import { ViewBusinessComponent } from './business/view-business/view-business.component'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CercaDeMiComponent,
    BuscadorNegocioComponent,
    FilterCommercePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    NgbModule
    ViewBusinessComponent
    BrowserModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    PerfilComponent,
    HomeComponent,
    VerNegocioComponent,
    FormsModule
  ],
  providers: [GeocodingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
