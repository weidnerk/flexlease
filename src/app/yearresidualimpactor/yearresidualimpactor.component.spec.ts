import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearresidualimpactorComponent } from './yearresidualimpactor.component';

describe('YearresidualimpactorComponent', () => {
  let component: YearresidualimpactorComponent;
  let fixture: ComponentFixture<YearresidualimpactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearresidualimpactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearresidualimpactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
