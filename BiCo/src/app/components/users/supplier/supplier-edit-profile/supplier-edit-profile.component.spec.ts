import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierEditProfileComponent } from './supplier-edit-profile.component';

describe('SupplierEditProfileComponent', () => {
  let component: SupplierEditProfileComponent;
  let fixture: ComponentFixture<SupplierEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierEditProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
