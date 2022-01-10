import { TestBed } from '@angular/core/testing';

import { CommentManagerService } from './comment-manager.service';

describe('CommentManagerService', () => {
  let service: CommentManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
