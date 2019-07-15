import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LeaseSettingsComponent } from './leasesettings.component';
import { DataService } from '../_services/data.service';
import { ObjectarrayprintComponent } from '../objectarrayprint/objectarrayprint.component';
import { routing } from './leasesettings.routes';
import { MainPipe } from '../_pipes/main-pipe.module';
import { MatProgressSpinnerModule, MatTabsModule, MatIconModule, MatButtonModule, MatInputModule, MatDialogModule, MatSelectModule } from '@angular/material';
import { YearresidualimpactorComponent } from '../yearresidualimpactor/yearresidualimpactor.component';

@NgModule({
  declarations: [
    LeaseSettingsComponent,
    ObjectarrayprintComponent,
    YearresidualimpactorComponent],
  imports: [
    CommonModule,
    routing,
    MainPipe,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule
  ],
  entryComponents: [YearresidualimpactorComponent],
  providers: [DataService]
})
export class LeaseSettingsModule { }
