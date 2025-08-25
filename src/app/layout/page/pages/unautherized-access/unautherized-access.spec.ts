import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnautherizedAccess } from './unautherized-access';

describe('UnautherizedAccess', () => {
  let component: UnautherizedAccess;
  let fixture: ComponentFixture<UnautherizedAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnautherizedAccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnautherizedAccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
