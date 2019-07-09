import { Component, OnInit } from '@angular/core';
import { LeaseResidual, Lease, DealerProfile, YearResidualImpactor } from '../_models';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-leaseresiduals',
  templateUrl: './leasesettings.component.html',
  styleUrls: ['./leasesettings.component.sass']
})
export class LeaseResidualsComponent implements OnInit {
  residuals: LeaseResidual[];
  dealerProfiles: DealerProfile[];
  yearResidualImpactors: YearResidualImpactor[];

  residualsLoading = false;
  dealerProfileLoading = false;

  residualsLoaded = false;
  dealerProfileLoaded = false;

  yearResidualImpactorLoaded = false;
  yearResidualImpactorLoading = false;

  errorMessage: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getLeaseResiduals();
    this.getDealerProfile();
    this.getYearResidualImpactor();
  }

  getLeaseResiduals() {
    this.residualsLoading = true;
    this.dataService.getValues<LeaseResidual>('LeaseResidual').subscribe(
      data => {
        this.residuals = data;
        this.residualsLoading = false;
        this.residualsLoaded = true;
      },
      error => {
        this.residualsLoading = false;
        this.residualsLoaded = false;
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }

  getDealerProfile() {
    this.dealerProfileLoading = true;
    this.dataService.getValues<DealerProfile>('DealerProfile').subscribe(
      data => {
        this.dealerProfiles = data;
        this.dealerProfileLoading = false;
        this.dealerProfileLoaded = true;
      },
      error => {
        this.dealerProfileLoading = false;
        this.dealerProfileLoaded = false;
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }

  getYearResidualImpactor() {
    this.dealerProfileLoading = true;
    this.dataService.getValues<YearResidualImpactor>('YearResidualImpactor').subscribe(
      data => {
        this.yearResidualImpactors = data;
        this.yearResidualImpactorLoading = false;
        this.yearResidualImpactorLoaded = true;
      },
      error => {
        this.yearResidualImpactorLoading = false;
        this.yearResidualImpactorLoaded = false;
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }

}
