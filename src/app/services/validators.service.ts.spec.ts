import { TestBed } from '@angular/core/testing';

import { ValidatorsServiceTs } from './validators.service.ts';

describe('ValidatorsServiceTs', () => {
  let service: ValidatorsServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorsServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
