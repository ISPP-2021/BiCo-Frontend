import { TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { OwnerGuard } from './owner.guard';

describe('OwnerGuard', () => {
  let guard: OwnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [AppModule]});
    guard = TestBed.inject(OwnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
