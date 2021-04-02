import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from  '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { CercaDeMiComponent } from './components/cerca-de-mi/cerca-de-mi.component';
import { GeocodingService } from './services/geocoding-service/geocoding.service';

import { BuscadorNegocioComponent } from './components/buscador-negocio/buscador-negocio.component';
import { FilterCommercePipe } from './pipes/filter-commerce.pipe';
import { CrearNegocioComponent } from './components/negocios/crear-negocio/crear-negocio.component';
import { VerNegocioComponent } from './components/negocios/ver-negocio/ver-negocio.component';
import { EditarNegocioComponent } from './components/negocios/editar-negocio/editar-negocio.component';

import { ServisesComponent } from './components/servises/servises.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';


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
		LoginComponent,
		UsersComponent,
		VerNegocioComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		GoogleMapsModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatFormFieldModule,
		MatTableModule,
		MatDividerModule,
		MatCheckboxModule,
		MatInputModule,
		MatSelectModule,
		MatGridListModule,
		MatButtonModule,
		MatTabsModule,
		HttpClientModule
	],
	providers: [GeocodingService],
	bootstrap: [AppComponent]
})
export class AppModule { }
