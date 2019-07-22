import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditprofileComponent } from './creditprofile.component';

describe('CreditprofileComponent', () => {
  let component: CreditprofileComponent;
  let fixture: ComponentFixture<CreditprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
