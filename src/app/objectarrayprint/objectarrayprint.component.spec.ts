import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectarrayprintComponent } from './objectarrayprint.component';

describe('ObjectarrayprintComponent', () => {
  let component: ObjectarrayprintComponent;
  let fixture: ComponentFixture<ObjectarrayprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectarrayprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectarrayprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
