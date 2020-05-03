import { TestBed } from '@angular/core/testing';

import { SriService } from './sri.service';

describe('SriService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SriService = TestBed.get(SriService);
    expect(service).toBeTruthy();
  });
});
