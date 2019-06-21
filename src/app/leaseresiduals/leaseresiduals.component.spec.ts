import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseResidualsComponent } from './leaseresiduals.component';

describe('LeaseresidualsComponent', () => {
  let component: LeaseResidualsComponent;
  let fixture: ComponentFixture<LeaseResidualsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaseResidualsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseResidualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
