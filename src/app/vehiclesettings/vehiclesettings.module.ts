import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesettingsComponent } from './vehiclesettings.component';
import { routing } from './vehiclesettings.routes';
import { MatInputModule, MatOptionModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../_services/data.service';

@NgModule({
  declarations: [VehiclesettingsComponent],
  imports: [
    CommonModule,
    routing,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [DataService]
})
export class VehiclesettingsModule { }
