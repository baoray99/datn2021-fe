import { TestBed } from '@angular/core/testing';

import { LessonManagerService } from './lesson-manager.service';

describe('LessonManagerService', () => {
  let service: LessonManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
