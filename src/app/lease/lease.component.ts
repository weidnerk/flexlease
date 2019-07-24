import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lease, Vehicle, CustomerApp } from '../_models';
import { DataService } from '../_services/data.service';
import { MatAccordion, MatExpansionPanel, MatSlider, MatSliderChange } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditprofileComponent } from '../creditprofile/creditprofile.component';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.scss']
})
export class LeaseComponent implements OnInit, OnDestroy, AfterViewInit {

  errorMessage: string;
  loading = false;
  loaded = false;
  appid: number;
  lease: Lease;
  private paramsSubscription: Subscription;
  loadingVehicle = false;
  vehicle: Vehicle;
  vehicleLoaded = false;
  ame: number;
  showDetail = false;
  showDetailLabel = 'Show Detail';
  form: FormGroup;
  annualMiles: number;

  residualValueKeys: string[] = [];
  residualValueValues: string[] = [];

  adjCapCostKeys: string[] = [];
  adjCapCostValues: string[] = [];

  // 'Annual miles elected' slider settings
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 18000;
  min = 15000;
  showTicks = true;
  step = 1000;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tick = 1;
  // End slider settings

  constructor(private activatedroute: ActivatedRoute,
              private dataService: DataService,
              private fb: FormBuilder) { }

  get annualMilesForm() { return this.form.get('annualMiles'); }
  get cashDown() { return this.form.get('cashDown'); }

  ngOnInit() {
    this.buildForm();
    this.paramsSubscription = this.activatedroute.params.subscribe(params => {
      this.appid = params.appid;
      this.getLease();
      this.getVehicle();
    });

  }
  ngAfterViewInit() {
    // console.log('afterViewInit');
  }
  ngOnDestroy() {
    // console.log('ngOnDestroy');
    this.paramsSubscription.unsubscribe();
  }

  // Get lease and calculate
  getLease() {
    this.loading = true;
    this.dataService.getValue<Lease>('Lease', this.appid).subscribe(
      data => {
        this.lease = data;
        this.loading = false;
        this.loaded = true;
        this.form.patchValue({
          cashDown: this.lease.customerApp.cashDown,
          annualMiles: this.lease.customerApp.annualMiles
        });
      },
      error => {
        this.loading = false;
        console.log('getLease: ' + error);
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }
  getVehicle() {
    this.loadingVehicle = true;
    this.dataService.getValue<Vehicle>('Vehicle', this.appid).subscribe(
      data => {
        this.vehicle = data;
        this.loadingVehicle = false;
        this.vehicleLoaded = true;
      },
      error => {
        this.loadingVehicle = false;
        console.log('getVehicle: ' + error);
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }
  onStore() {
    const app = {} as CustomerApp;
    app.lenderAppId = this.appid;

    app.annualMiles = this.annualMilesForm!.value;
    // app.annualMiles = this.annualMiles; // used with onAnnualMilesChange
    app.cashDown = this.cashDown!.value;

    this.dataService.storeObject<CustomerApp>('CustomerApp', app, ['AnnualMiles', 'CashDown']).subscribe(
      data => {
        this.errorMessage = 'Record has been stored.';
        this.getLease();
      },
      error => {
        console.log('storeDealer: ' + error);
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }

  // Used by mat-slider
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  // Used by mat-slider
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this.tickInterval) : 0;
  }
  set tickInterval(value) {
    this.tickInterval = +value;
  }

  onShowDetail() {
    this.showDetail = !this.showDetail;
    if (this.showDetail) {
      this.showDetailLabel = 'Hide Detail';
    } else {
      this.showDetailLabel = 'Show Detail';
    }
  }
  buildForm(): void {
    this.form = this.fb.group({
      annualMiles: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      cashDown: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }]
    });
  }
  onAnnualMilesChange(event: MatSliderChange) {
    // let v = event.value;
    this.annualMiles = Number(event!.value);
  }

}
