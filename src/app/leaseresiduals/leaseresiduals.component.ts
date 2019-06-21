import { Component, OnInit } from '@angular/core';
import { LeaseResidual } from '../_models';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-leaseresiduals',
  templateUrl: './leaseresiduals.component.html',
  styleUrls: ['./leaseresiduals.component.sass']
})
export class LeaseResidualsComponent implements OnInit {
  residuals: LeaseResidual[];
  loading = false;
  errorMessage: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getLeaseResiduals();
  }
  getLeaseResiduals() {
    this.loading = true;
    this.dataService.getValues<LeaseResidual>('LeaseResidual').subscribe(
      data => {
        this.residuals = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }

}
