import { Component, OnInit } from '@angular/core';
import { LeaseResidual, Lease, DealerStateProfile, YearResidualImpactor } from '../_models';
import { DataService } from '../_services/data.service';
import { MatSelectChange, MatOption } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-leaseresiduals',
  templateUrl: './leasesettings.component.html',
  styleUrls: ['./leasesettings.component.scss']
})
export class LeaseSettingsComponent implements OnInit {
  states = [
    { value: 'AL', viewValue: 'AL' },
    { value: 'AR', viewValue: 'AR' },
    { value: 'AZ', viewValue: 'AZ' },
    { value: 'CA', viewValue: 'CA' },
    { value: 'CO', viewValue: 'CO' },
    { value: 'CT', viewValue: 'CT' },
    { value: 'DE', viewValue: 'DE' },
    { value: 'FL', viewValue: 'FL' },
    { value: 'GA', viewValue: 'GA' },
    { value: 'IA', viewValue: 'IA' },
    { value: 'ID', viewValue: 'ID' },
    { value: 'IL', viewValue: 'IL' },
    { value: 'IN', viewValue: 'IN' },
    { value: 'KS', viewValue: 'KS' },
    { value: 'KY', viewValue: 'KY' },
    { value: 'LA', viewValue: 'LA' },
    { value: 'MD', viewValue: 'MD' },
    { value: 'ME', viewValue: 'ME' },
    { value: 'MI', viewValue: 'MI' },
    { value: 'MN', viewValue: 'MN' },
    { value: 'MS', viewValue: 'MS' },
    { value: 'NC', viewValue: 'NC' },
    { value: 'NE', viewValue: 'NE' },
    { value: 'NH', viewValue: 'NH' },
    { value: 'NJ', viewValue: 'NJ' },
    { value: 'NM', viewValue: 'NM' },
    { value: 'NV', viewValue: 'NV' },
    { value: 'OH', viewValue: 'OH' },
    { value: 'OK', viewValue: 'OK' },
    { value: 'OR', viewValue: 'OR' },
    { value: 'PA', viewValue: 'PA' },
    { value: 'RI', viewValue: 'RI' },
    { value: 'SC', viewValue: 'SC' },
    { value: 'SD', viewValue: 'SD' },
    { value: 'TN', viewValue: 'TN' },
    { value: 'TX', viewValue: 'TX' },
    { value: 'UT', viewValue: 'UT' },
    { value: 'VA', viewValue: 'VA' },
    { value: 'WA', viewValue: 'WA' },
    { value: 'WV', viewValue: 'WV' },
    { value: 'WY', viewValue: 'WY' }
  ];
  residuals: LeaseResidual[];
  dealerStateProfiles: DealerStateProfile[];
  yearResidualImpactors: YearResidualImpactor[];

  residualsLoading = false;
  dealerStateProfileLoading = false;

  residualsLoaded = false;
  dealerStateProfileLoaded = false;

  yearResidualImpactorLoaded = false;
  yearResidualImpactorLoading = false;

  form: FormGroup;
  errorMessage: string;

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.getLeaseResiduals();
    this.getYearResidualImpactor();
  }

  buildForm(): void {
    this.form = this.fb.group({
      state: [null, {
        updateOn: 'submit'
      }]
    });
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

  getDealerStateProfile(dealerState: string) {
    this.dealerStateProfileLoading = true;

    // needs to call with state param
    const filter: string[] = [];
    filter.push('dealerState');
    filter.push(dealerState);
    filter.push('rateType');
    filter.push('F');

    this.dataService.getValues<DealerStateProfile>('DealerStateProfile', undefined, filter).subscribe(
      data => {
        this.dealerStateProfiles = data;
        this.dealerStateProfileLoading = false;
        this.dealerStateProfileLoaded = true;
      },
      error => {
        this.dealerStateProfileLoading = false;
        this.dealerStateProfileLoaded = false;
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }

  getYearResidualImpactor() {
    this.dealerStateProfileLoading = true;
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
  stateSelected(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    // console.log(selectedData.value);
    this.getDealerStateProfile(selectedData.value);
  }
}
