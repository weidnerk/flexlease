import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Lease } from '../_models/index';
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
  lease: Lease;
  vehicle: Vehicle;
  form: FormGroup;
  errorMessage: string;
  loadingLease = false;
  loadingVehicle = false;

  constructor(private fb: FormBuilder,
              private leaseService: LeaseService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.buildForm();
  }

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }

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
      }]

    });
  }

  getData(appid: string) {
    this.errorMessage = null;
    this.getLease(appid);
    this.getVehicle(appid);
  }

  getLease(appid: string) {
    this.loadingLease = true;
    this.leaseService.getLease(appid).subscribe(
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
          tag: this.lease.customerApp.tag
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

  getVehicle(appid: string) {
    this.loadingVehicle = true;
    this.leaseService.getVehicle(appid).subscribe(
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
  }

}
