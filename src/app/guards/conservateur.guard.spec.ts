import { TestBed } from '@angular/core/testing';

import { ConservateurGuard } from './conservateur.guard';

describe('ConservateurGuard', () => {
  let guard: ConservateurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConservateurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
