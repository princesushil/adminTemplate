import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleassignMaster } from './userroleassign-master';

describe('UserroleassignMaster', () => {
  let component: UserroleassignMaster;
  let fixture: ComponentFixture<UserroleassignMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserroleassignMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserroleassignMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
