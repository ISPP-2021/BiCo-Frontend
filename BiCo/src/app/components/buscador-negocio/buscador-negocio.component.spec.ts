import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorNegocioComponent } from './buscador-negocio.component';
import { FilterCommercePipe } from 'src/app/pipes/filter-commerce.pipe';
import { AppModule } from 'src/app/app.module';

describe('BuscadorNegocioComponent', () => {
	let component: BuscadorNegocioComponent;
	let fixture: ComponentFixture<BuscadorNegocioComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BuscadorNegocioComponent, FilterCommercePipe],
			imports: [AppModule]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BuscadorNegocioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	// it('should not create', () => {
	// 	localStorage.setItem('token', '12345');
	// 	expect(component).toBeTruthy();
	// });
});
