import { TestBed } from '@angular/core/testing';

import { CaseNoteService } from './case-note.service';

describe('CaseNoteService', () => {
  let service: CaseNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
