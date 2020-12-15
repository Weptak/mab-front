import { TestBed } from '@angular/core/testing';

import { ChercheurGuard } from './chercheur.guard';

describe('ChercheurGuard', () => {
  let guard: ChercheurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChercheurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
