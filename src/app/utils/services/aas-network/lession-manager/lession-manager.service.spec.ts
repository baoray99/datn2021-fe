import { TestBed } from '@angular/core/testing';

import { LessionManagerService } from './lession-manager.service';

describe('LessionManagerService', () => {
  let service: LessionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
