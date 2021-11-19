import { TestBed } from '@angular/core/testing';

import { CourseManagerService } from './course-manager.service';

describe('CourseManagerService', () => {
  let service: CourseManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
