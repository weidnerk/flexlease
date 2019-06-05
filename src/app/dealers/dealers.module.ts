import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './dealers.routes';
import { DealersComponent } from './dealers.component';
import { MatCardModule, MatProgressSpinnerModule, MatIconModule, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatInputModule, MatButtonModule } from '@angular/material';
import { DataService } from '../_services/data.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DealersettingsdialogComponent } from '../dealersettingsdialog/dealersettingsdialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DealersComponent,
    DealersettingsdialogComponent],
  imports: [
    CommonModule,
    routing,
    MatCardModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  entryComponents: [DealersettingsdialogComponent],
    providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    DataService]
})
export class DealersModule { }
