import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeasesComponent } from './leases.component';
import { routing } from './leases.routes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule, MatCardModule } from '@angular/material';
import { LeaseService } from '../_services/lease.service';
@NgModule({
  declarations: [LeasesComponent],
  imports: [
    CommonModule,
    routing,
    FlexLayoutModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [LeaseService],
})
export class LeasesModule { }
