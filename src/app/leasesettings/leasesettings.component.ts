import { Component, OnInit } from '@angular/core';
import { LeaseResidual, Lease, DealerProfile } from '../_models';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-leaseresiduals',
  templateUrl: './leasesettings.component.html',
  styleUrls: ['./leasesettings.component.sass']
})
export class LeaseResidualsComponent implements OnInit {
  residuals: LeaseResidual[];
  dealerProfiles: DealerProfile[];

  residualsLoading = false;
  dealerProfileLoading = false;

  residualsLoaded = false;
  dealerProfileLoaded = false;

  errorMessage: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getLeaseResiduals();
    this.getDealerProfile();
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

}
