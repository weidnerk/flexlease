import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsdialogComponent } from './settingsdialog.component';

describe('SettingsdialogComponent', () => {
  let component: SettingsdialogComponent;
  let fixture: ComponentFixture<SettingsdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
