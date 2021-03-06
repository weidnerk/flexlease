import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { routing } from './settings.routes';
import { SettingsdialogComponent } from '../settingsdialog/settingsdialog.component';
import { MatDialogModule, MatInputModule, MatButtonModule, MatTabsModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../_services/data.service';

@NgModule({
  declarations: [SettingsComponent,
                SettingsdialogComponent],
  imports: [
    CommonModule,
    routing,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule
  ],
  entryComponents: [SettingsdialogComponent],
  providers: [DataService],
})
export class SettingsModule { }
