import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineMaster } from './machine-master';

describe('MachineMaster', () => {
  let component: MachineMaster;
  let fixture: ComponentFixture<MachineMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
