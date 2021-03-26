import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNegocioComponent } from './crear-negocio.component';

describe('CrearNegocioComponent', () => {
  let component: CrearNegocioComponent;
  let fixture: ComponentFixture<CrearNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
