import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { routing } from './settings.routes';
import { SettingsdialogComponent } from '../settingsdialog/settingsdialog.component';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SettingsComponent,
                SettingsdialogComponent],
  imports: [
    CommonModule,
    routing,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  entryComponents: [SettingsdialogComponent]
})
export class SettingsModule { }
