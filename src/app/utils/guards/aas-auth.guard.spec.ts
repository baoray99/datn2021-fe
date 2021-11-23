import { TestBed } from '@angular/core/testing';

import { AasAuthGuard } from './aas-auth.guard';

describe('AasAuthGuard', () => {
  let guard: AasAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AasAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
