import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './dealers.routes';
import { DealersComponent } from './dealers.component';

@NgModule({
  declarations: [DealersComponent],
  imports: [
    CommonModule,
    routing
  ]
})
export class DealersModule { }
