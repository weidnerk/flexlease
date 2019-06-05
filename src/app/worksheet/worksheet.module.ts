import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatListModule, MatCardModule, MatInputModule, MatIconModule, MatSliderModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { WorksheetComponent } from './worksheet.component';
import { WorksheetinputComponent } from '../worksheetinput/worksheetinput.component';
import { WorksheetoutputComponent } from '../worksheetoutput/worksheetoutput.component';
import { routing } from './worksheet.routes';
import { DataService } from '../_services/data.service';
import { SharedService } from '../_services/shared.service';

@NgModule({
  declarations: [
    WorksheetComponent,
    WorksheetinputComponent,
    WorksheetoutputComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    routing,
    HttpClientModule,
    MatSliderModule
  ],
  providers: [DataService, SharedService]

})
export class WorksheetModule { }
