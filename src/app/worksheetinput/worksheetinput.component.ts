/*

  Wasn't sure if would need to implement ngOnChanges per https://www.youtube.com/watch?v=OT9qqEbS2qM
  but @Input variable, appid, arriving correctly so far from worksheet.component.

*/
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Lease, CustomerApp } from '../_models/index';
import { Vehicle } from '../_models/index';
import { LeaseService } from '../_services/lease.service';
import { SharedService } from '../_services/shared.service';

const FIRSTNAME_REGEX = /^[a-zA-Z]+$/;
const LASTNAME_REGEX = /^[a-zA-Z ']+$/;

@Component({
  selector: 'app-worksheetinput',
  templateUrl: './worksheetinput.component.html',
  styleUrls: ['./worksheetinput.component.scss']
})
export class WorksheetinputComponent implements OnInit {
  @Input() appid: number;
  lease: Lease;
  vehicle: Vehicle;
  form: FormGroup;
  errorMessage: string;
  loadingLease = false;
  loadingVehicle = false;

  // 'Annual miles elected' slider settings
  private autoTicks = false;
  private disabled = false;
  private invert = false;
  private max = 18000;
  private min = 15000;
  private showTicks = true;
  private step = 1000;
  private thumbLabel = true;
  private value = 0;
  private vertical = false;
  private _tickInterval = 1;
  // End slider settings

  constructor(private fb: FormBuilder,
              private leaseService: LeaseService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.buildForm();
    console.log('appid: ' + this.appid);
    this.getData();
  }

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get annualMilesElected() { return this.form.get('annualMilesElected'); }

  buildForm(): void {

    this.form = this.fb.group({
      firstName: [null, {
        validators: [Validators.required, Validators.minLength(2), Validators.pattern(FIRSTNAME_REGEX)],
        updateOn: 'submit'
      }],
      lastName: [null, {
        validators: [Validators.required, Validators.minLength(2), Validators.pattern(LASTNAME_REGEX)],
        updateOn: 'submit'
      }],
      zip: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      VIN: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      miles: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      year: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      bookValue: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      cashDown: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      term: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      tag: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      make: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      model: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      annualMilesElected: [null]
    });
  }

  getData() {
    this.errorMessage = null;
    this.getLease();
    this.getVehicle();
  }

  // Get lease and calculate
  getLease() {
    this.loadingLease = true;
    this.leaseService.getValue<Lease>('Lease', this.appid).subscribe(
      data => {
        this.lease = data;
        this.loadingLease = false;
        this.sharedService.changeLeaseResult(this.lease.leaseResult);
        this.form.patchValue({
          firstName: this.lease.customerApp.firstName,
          lastName: this.lease.customerApp.lastName,
          zip: this.lease.customerApp.currentAddress.zip,
          cashDown: this.lease.customerApp.cashDown,
          miles: this.lease.customerApp.vehicle.miles,
          year: this.lease.customerApp.vehicle.year,
          term: this.lease.customerApp.term,
          tag: this.lease.customerApp.tag,
          annualMilesElected: this.lease.customerApp.annualMiles
        });
      },
      error => {
        this.loadingLease = false;
        console.log('getLease: ' + error);
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }

  getVehicle() {
    this.loadingVehicle = true;
    this.leaseService.getValue<Vehicle>('Vehicle', this.appid).subscribe(
      data => {
        this.vehicle = data;
        this.loadingVehicle = false;
        this.form.patchValue({
          VIN: this.vehicle.vin,
          bookValue: this.vehicle.bookValue,
          make: this.vehicle.make,
          model: this.vehicle.model
        });
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

  onSubmit() {
    console.log(this.annualMilesElected.value);

    const customerApp: CustomerApp = {
       lenderAppId: this.appid,
       firstName: '',
       lastName: '',
       cashDown: 0,
       currentAddress: null,
       vehicle: null,
       term: 0,
       tag: 0,
       dealerName: null,
       annualMiles: this.annualMilesElected.value
    };

    this.leaseService.storeValue<CustomerApp>('CustomerApp', customerApp).subscribe(
      data => {
      },
      error => {
        this.loadingVehicle = false;
        console.log('update lease: ' + error);
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );

    // this.getData();
  }

  // used by mat-slider
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  // used by mat-slider
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = +value;
  }

}
