import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersettingsComponent } from './dealersettings.component';

describe('DealersettingsComponent', () => {
  let component: DealersettingsComponent;
  let fixture: ComponentFixture<DealersettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealersettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
