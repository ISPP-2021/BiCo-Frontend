import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CercaDeMiComponent } from './cerca-de-mi/cerca-de-mi.component';

@NgModule({
  declarations: [
    AppComponent,
    CercaDeMiComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
