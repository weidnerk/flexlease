import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectprintComponent } from './objectprint.component';

describe('DisplayobjectComponent', () => {
  let component: ObjectprintComponent;
  let fixture: ComponentFixture<ObjectprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
