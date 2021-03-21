import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CercaDeMiComponent } from './cerca-de-mi/cerca-de-mi.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { GeocodingService } from './geocoding.service';
import { ViewBusinessComponent } from './business/view-business/view-business.component'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CercaDeMiComponent,
    ViewBusinessComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    ReactiveFormsModule
  ],
  providers: [GeocodingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
