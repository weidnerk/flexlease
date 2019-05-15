import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetinputComponent } from './worksheetinput.component';

describe('WorksheetinputComponent', () => {
  let component: WorksheetinputComponent;
  let fixture: ComponentFixture<WorksheetinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
