import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolewisemenuMaster } from './rolewisemenu-master';

describe('RolewisemenuMaster', () => {
  let component: RolewisemenuMaster;
  let fixture: ComponentFixture<RolewisemenuMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolewisemenuMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolewisemenuMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
