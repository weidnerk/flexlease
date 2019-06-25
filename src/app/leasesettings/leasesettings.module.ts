import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaseResidualsComponent } from './leasesettings.component';
import { DataService } from '../_services/data.service';
import { ObjectarrayprintComponent } from '../objectarrayprint/objectarrayprint.component';
import { routing } from './leasesettings.routes';
import { MainPipe } from '../_pipes/main-pipe.module';
import { MatProgressSpinnerModule, MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [
    LeaseResidualsComponent,
    ObjectarrayprintComponent],
  imports: [
    CommonModule,
    routing,
    MainPipe,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  providers: [DataService]
})
export class LeaseSettingsModule { }
