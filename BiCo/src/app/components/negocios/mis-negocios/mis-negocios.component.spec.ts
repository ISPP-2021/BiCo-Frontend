import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { MisNegociosComponent } from './mis-negocios.component';

describe('MisNegociosComponent', () => {
  let component: MisNegociosComponent;
  let fixture: ComponentFixture<MisNegociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisNegociosComponent ],
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisNegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
