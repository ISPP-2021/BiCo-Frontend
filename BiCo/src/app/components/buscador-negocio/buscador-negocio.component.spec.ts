import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorNegocioComponent } from './buscador-negocio.component';

describe('BuscadorNegocioComponent', () => {
  let component: BuscadorNegocioComponent;
  let fixture: ComponentFixture<BuscadorNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
