import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSignedInComponent } from './navbar-signed-in.component';

describe('NavbarSignedInComponent', () => {
  let component: NavbarSignedInComponent;
  let fixture: ComponentFixture<NavbarSignedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarSignedInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarSignedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
