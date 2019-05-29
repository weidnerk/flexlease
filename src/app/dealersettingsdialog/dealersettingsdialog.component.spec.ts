import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersettingsdialogComponent } from './dealersettingsdialog.component';

describe('DealersettingsdialogComponent', () => {
  let component: DealersettingsdialogComponent;
  let fixture: ComponentFixture<DealersettingsdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealersettingsdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersettingsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
