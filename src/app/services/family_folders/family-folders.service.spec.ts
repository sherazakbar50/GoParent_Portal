import { TestBed } from '@angular/core/testing';

import { FamilyFoldersService } from './family-folders.service';

describe('FamilyFoldersService', () => {
  let service: FamilyFoldersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyFoldersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
