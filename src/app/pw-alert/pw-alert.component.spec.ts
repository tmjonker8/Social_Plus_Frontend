import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwAlertComponent } from './pw-alert.component';

describe('PwAlertComponent', () => {
  let component: PwAlertComponent;
  let fixture: ComponentFixture<PwAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PwAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
