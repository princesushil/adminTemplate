import { TestBed } from '@angular/core/testing';

import { RolewisemenuMasterService } from './rolewisemenu-master-service';

describe('RolewisemenuMasterService', () => {
  let service: RolewisemenuMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolewisemenuMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
