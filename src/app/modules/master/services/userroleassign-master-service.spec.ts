import { TestBed } from '@angular/core/testing';

import { UserroleassignMasterService } from './userroleassign-master-service';

describe('UserroleassignMasterService', () => {
  let service: UserroleassignMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserroleassignMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
