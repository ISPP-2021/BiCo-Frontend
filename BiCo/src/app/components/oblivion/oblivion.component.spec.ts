import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OblivionComponent } from './oblivion.component';

describe('OblivionComponent', () => {
  let component: OblivionComponent;
  let fixture: ComponentFixture<OblivionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OblivionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OblivionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
