import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './dealers.routes';
import { DealersComponent } from './dealers.component';
import { MatCardModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { LeaseService } from '../_services/lease.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [DealersComponent],
  imports: [
    CommonModule,
    routing,
    MatCardModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatIconModule
  ],
  providers: [LeaseService]
})
export class DealersModule { }
