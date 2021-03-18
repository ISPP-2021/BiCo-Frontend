import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CercaDeMiComponent } from './cerca-de-mi.component';

describe('CercaDeMiComponent', () => {
  let component: CercaDeMiComponent;
  let fixture: ComponentFixture<CercaDeMiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CercaDeMiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CercaDeMiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
