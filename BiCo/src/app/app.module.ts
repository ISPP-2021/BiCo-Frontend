import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CercaDeMiComponent } from './cerca-de-mi/cerca-de-mi.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { GeocodingService } from './geocoding.service'

@NgModule({
  declarations: [
    AppComponent,
    CercaDeMiComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule
  ],
  providers: [GeocodingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
