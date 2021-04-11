import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReservasComponent } from './ver-reservas.component';
import { AppModule } from 'src/app/app.module';

describe('VerReservasComponent', () => {
	let component: VerReservasComponent;
	let fixture: ComponentFixture<VerReservasComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [VerReservasComponent],
			imports: [AppModule]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(VerReservasComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		localStorage.setItem('token', '12345');
		expect(component).toBeTruthy();
	});
});
