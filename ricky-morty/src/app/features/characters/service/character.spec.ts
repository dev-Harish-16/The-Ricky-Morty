import { TestBed } from '@angular/core/testing';

import { CharacterApiService } from './character';

describe('Character', () => {
  let service: CharacterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
