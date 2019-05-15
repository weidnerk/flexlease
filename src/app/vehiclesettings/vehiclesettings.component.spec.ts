import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesettingsComponent } from './vehiclesettings.component';

describe('VehiclesettingsComponent', () => {
  let component: VehiclesettingsComponent;
  let fixture: ComponentFixture<VehiclesettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclesettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
