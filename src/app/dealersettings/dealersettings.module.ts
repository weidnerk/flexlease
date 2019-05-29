import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealersettingsComponent } from './dealersettings.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { routing } from '../dealersettings/dealersettings.routes';
import { DealersettingsdialogComponent } from '../dealersettingsdialog/dealersettingsdialog.component';
@NgModule({
  declarations: [DealersettingsComponent,
    DealersettingsdialogComponent],
  imports: [
    CommonModule,
    routing,
    MatDialogModule
  ],
  entryComponents: [DealersettingsdialogComponent],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
]
})
export class DealersettingsModule { }
