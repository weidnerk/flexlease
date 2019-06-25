import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldnameprintPipe } from './fieldnameprint.pipe';

@NgModule({
  declarations: [FieldnameprintPipe],
  imports: [CommonModule],
  exports: [FieldnameprintPipe]
})

export class MainPipe {}
