import { TestBed } from '@angular/core/testing';

import { SynonymsService } from './synonyms.service';

describe('SynonymsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SynonymsService = TestBed.get(SynonymsService);
    expect(service).toBeTruthy();
  });
});
