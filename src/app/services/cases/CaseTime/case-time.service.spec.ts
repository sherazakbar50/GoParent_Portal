import { TestBed } from '@angular/core/testing';

import { CaseTimeService } from './case-time.service';

describe('CaseTimeService', () => {
  let service: CaseTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
