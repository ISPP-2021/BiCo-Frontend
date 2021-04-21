import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';

import { OwnerGuard } from './owner.guard';

describe('OwnerGuard', () => {
  let guard: OwnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [AppModule, Router]});
    guard = TestBed.inject(OwnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
