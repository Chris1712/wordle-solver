import { TestBed } from '@angular/core/testing';

import { DictionaryService } from './dictionary.service';

describe('DictionaryService', () => {
  let service: DictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a whole buncha words', () => {
    expect(service.getDictionary().length).toBeGreaterThan(5000);
  });
});
