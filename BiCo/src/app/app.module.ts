import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CercaDeMiComponent } from './cerca-de-mi/cerca-de-mi.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { GeocodingService } from './geocoding.service';
import { BuscadorNegocioComponent } from './buscador-negocio/buscador-negocio.component';
import { FilterCommercePipe } from './pipes/filter-commerce.pipe'
import { FormsModule} from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    CercaDeMiComponent,
    BuscadorNegocioComponent,
    FilterCommercePipe
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    FormsModule
  ],
  providers: [GeocodingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
