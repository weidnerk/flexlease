import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './lease.routes';
import { LeaseComponent } from './lease.component';
import { MatButtonModule, MatListModule, MatCardModule, MatInputModule, MatIconModule, MatSliderModule, MatFormFieldModule, MatExpansionModule } from '@angular/material';
import { DataService } from '../_services/data.service';
import { ObjectprintComponent } from '../objectprint/objectprint.component';
import { FieldnameprintPipe } from '../_pipes/fieldnameprint.pipe';

@NgModule({
  declarations: [LeaseComponent, 
    ObjectprintComponent,
    FieldnameprintPipe],
  imports: [
    CommonModule,
    routing,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [DataService]
})
export class LeaseModule { }
