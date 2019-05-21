import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { routing } from './settings.routes';
import { SettingsdialogComponent } from '../settingsdialog/settingsdialog.component';
import { MatDialogModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { LeaseService } from '../_services/lease.service';

@NgModule({
  declarations: [SettingsComponent,
                SettingsdialogComponent],
  imports: [
    CommonModule,
    routing,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  entryComponents: [SettingsdialogComponent],
  providers: [LeaseService],
})
export class SettingsModule { }
