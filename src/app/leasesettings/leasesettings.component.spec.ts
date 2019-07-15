import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseSettingsComponent } from './leasesettings.component';

describe('LeaseresidualsComponent', () => {
  let component: LeaseSettingsComponent;
  let fixture: ComponentFixture<LeaseSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
