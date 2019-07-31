import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerstateprofileComponent } from './dealerstateprofile.component';

describe('DealerstateprofileComponent', () => {
  let component: DealerstateprofileComponent;
  let fixture: ComponentFixture<DealerstateprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerstateprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerstateprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
