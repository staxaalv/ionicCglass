import { TestBed } from '@angular/core/testing';

import { CibService } from './cib.service';

describe('CibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CibService = TestBed.get(CibService);
    expect(service).toBeTruthy();
  });
});
