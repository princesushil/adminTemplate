import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarHorizontal } from './navbar-horizontal';

describe('NavbarHorizontal', () => {
  let component: NavbarHorizontal;
  let fixture: ComponentFixture<NavbarHorizontal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarHorizontal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarHorizontal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
