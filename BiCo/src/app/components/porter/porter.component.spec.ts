import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorterComponent } from './porter.component';

describe('PorterComponent', () => {
  let component: PorterComponent;
  let fixture: ComponentFixture<PorterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
