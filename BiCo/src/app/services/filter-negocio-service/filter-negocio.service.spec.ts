import { TestBed } from '@angular/core/testing';

import { FilterNegocioService } from './filter-negocio.service';

describe('FilterNegocioService', () => {
  let service: FilterNegocioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterNegocioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
