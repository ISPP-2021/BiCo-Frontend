import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerEditProfileComponent } from './consumer-edit-profile.component';

describe('ConsumerEditProfileComponent', () => {
  let component: ConsumerEditProfileComponent;
  let fixture: ComponentFixture<ConsumerEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerEditProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
