import { Component, OnInit } from '@angular/core';
import { LeaseResidual, Lease, CarRatingDeduct, DealerProfile } from '../_models';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-leaseresiduals',
  templateUrl: './leasesettings.component.html',
  styleUrls: ['./leasesettings.component.sass']
})
export class LeaseResidualsComponent implements OnInit {
  residuals: LeaseResidual[];
  carRatingDeducts: CarRatingDeduct[];
  dealerProfiles: DealerProfile[];

  residualsLoading = false;
  carRatingDeductsLoading = false;
  dealerProfileLoading = false;

  residualsLoaded = false;
  carRatingDeductsLoaded = false;
  dealerProfileLoaded = false;

  errorMessage: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getLeaseResiduals();
    this.getCarRatingDeducts();
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

  getCarRatingDeducts() {
    this.carRatingDeductsLoading = true;
    this.dataService.getValues<CarRatingDeduct>('CarRatingDeduct').subscribe(
      data => {
        this.carRatingDeducts = data;
        this.carRatingDeductsLoading = false;
        this.carRatingDeductsLoaded = true;
      },
      error => {
        this.carRatingDeductsLoading = false;
        this.carRatingDeductsLoaded = false;
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
        this.carRatingDeductsLoading = false;
        this.carRatingDeductsLoaded = false;
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }

}
