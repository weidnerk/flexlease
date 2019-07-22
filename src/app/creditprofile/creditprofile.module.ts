import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditprofileComponent } from '../creditprofile/creditprofile.component';
import { MatCheckboxModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreditprofileComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports: [CreditprofileComponent]
})
export class CreditprofileModule { }
