import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lease, Vehicle, CustomerApp } from '../_models';
import { DataService } from '../_services/data.service';
import { MatAccordion, MatExpansionPanel, MatSlider, MatSliderChange } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditprofileComponent } from '../creditprofile/creditprofile.component';
import { AlertService } from '../_alert/alert.service';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.scss']
})
export class LeaseComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(CreditprofileComponent, { static: false }) creditprofile: CreditprofileComponent;

  errorMessage: string;
  wait = false;
  leaseLoaded = false;
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
  private editingLease = false;

  residualValueKeys: string[] = [];
  residualValueValues: string[] = [];

  adjCapCostKeys: string[] = [];
  adjCapCostValues: string[] = [];

  // 'Annual miles elected' slider settings
  autoTicks = false;
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
              private fb: FormBuilder,
              private alertService: AlertService) { }

  get ctlAnnualMiles() { return this.form.get('annualMiles'); }
  get ctlCashDown() { return this.form.get('cashDown'); }
  get ctlMiles() { return this.form.get('miles'); }
  get ctlVin() { return this.form.get('vin'); }

  ngOnInit() {
    this.buildForm();
    this.paramsSubscription = this.activatedroute.params.subscribe(params => {
      this.appid = params.appid;
      this.getLease();
      this.getVehicle();
      this.info('test alert');  // displays nothing - only button is working
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
    this.wait = true;
    this.dataService.getValue<Lease>('Lease', this.appid).subscribe(
      data => {
        this.lease = data;
        this.leaseLoaded = true;
        this.form.patchValue({
          cashDown: this.lease.customerApp.cashDown,
          annualMiles: this.lease.customerApp.annualMiles,
          miles: this.vehicle.miles,
          vin: this.vehicle.vin
        });
        this.wait = false;
      },
      error => {
        this.wait = false;
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
    if (!this.formIsValid()) {
      return;
    }
    this.wait = true;
    const app = {} as CustomerApp;
    app.lenderAppId = this.appid;

    app.annualMiles = this.ctlAnnualMiles!.value;
    // app.annualMiles = this.annualMiles; // used with onAnnualMilesChange
    app.cashDown = this.ctlCashDown!.value;

    this.dataService.storeObject<CustomerApp>('CustomerApp', app, ['AnnualMiles', 'CashDown']).subscribe(
      data => {
        this.getLease();
        // this.editingLease = false;
      },
      error => {
        console.log('storeDealer: ' + error);
        this.errorMessage = error;
        this.editingLease = false;
        this.wait = false;
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
      annualMiles: [{value: null, disabled: true}, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      cashDown: [{value: null, disabled: true}, {
        validators: [Validators.required, Validators.minLength(2), Validators.pattern(/^[1-9]\d*$/)],
        updateOn: 'submit'
      }],
      miles: [{value: null, disabled: true}, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      vin: [{value: null, disabled: true}, {
        validators: [Validators.required, Validators.minLength(17), Validators.maxLength(17)],
        updateOn: 'submit'
      }]
    });
  }
  onAnnualMilesChange(event: MatSliderChange) {
    // let v = event.value;
    this.annualMiles = Number(event!.value);
  }

  onEdit(item: any) {
    this.editingLease = true;
    this.ctlCashDown!.enable();
    this.ctlAnnualMiles!.enable();
    this.ctlVin!.enable();
    this.ctlMiles!.enable();
    this.creditprofile.setControlProperties(true);
  }

  onCancelEdit() {
    this.editingLease = false;
    this.ctlCashDown!.disable();
    this.ctlAnnualMiles!.disable();
    this.creditprofile.setControlProperties(false);
    this.ctlVin!.disable();
    this.ctlMiles!.disable();
    this.getLease();  // abandon changes
  }

  formIsValid(): boolean {
    if (this.ctlAnnualMiles!.invalid) { return false; }
    if (this.ctlCashDown!.invalid) { return false; }
    if (this.ctlMiles!.invalid) { return false; }
    if (this.ctlVin!.invalid) { return false; }
    return true;
  }
  info(message: string) {
    this.alertService.info(message);
  }
  warn(message: string) {
    this.alertService.warn(message);
  }
}
