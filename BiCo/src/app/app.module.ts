import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { CercaDeMiComponent } from './components/cerca-de-mi/cerca-de-mi.component';
import { BuscadorNegocioComponent } from './components/buscador-negocio/buscador-negocio.component';
import { EditarNegocioComponent } from './components/negocios/editar-negocio/editar-negocio.component'
import { CrearNegocioComponent } from './components/negocios/crear-negocio/crear-negocio.component';
import { ServisesComponent } from './components/servises/servises.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { VerNegocioComponent } from './components/negocios/ver-negocio/ver-negocio.component';

import { FilterCommercePipe } from './pipes/filter-commerce.pipe';

import { GeocodingService } from './services/geocoding-service/geocoding.service';

@NgModule({
  declarations: [
    AppComponent,
    CercaDeMiComponent,
    BuscadorNegocioComponent,
    UserProfileComponent,
    HomeComponent,
    EditarNegocioComponent,
    FilterCommercePipe,
    CrearNegocioComponent,
    ServisesComponent,
    LoginComponent
    UsersComponent,
    UserProfileComponent,
    VerNegocioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    NgbModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    BrowserModule,
    MatInputModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    HttpClientModule
  ],
  providers: [GeocodingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
