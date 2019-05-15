import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaseService } from '../_services/lease.service';
import { VehicleMake, VehicleModel } from '../_models';
import { MatSelectChange, MatOption } from '@angular/material';

@Component({
  selector: 'app-vehiclesettings',
  templateUrl: './vehiclesettings.component.html',
  styleUrls: ['./vehiclesettings.component.scss']
})
export class VehiclesettingsComponent implements OnInit {

  form: FormGroup;
  makes: VehicleMake[];
  models: VehicleModel[];
  errorMessage: string;
  loading = false;

  constructor(private fb: FormBuilder,
              private leaseService: LeaseService) { }

  get makeId() { return this.form.get('make'); }

  ngOnInit() {
    this.buildForm();
    this.getMakes();
  }


  getMakes() {
    this.loading = true;
    this.leaseService.getMakes()
      .subscribe(x => {
        this.makes = x;
        this.loading = false;
      },
        error => {
          this.loading = false;
          this.errorMessage = error.errMsg;
        });
  }

  getModels(makeId: number) {
    this.loading = true;
    this.leaseService.getModels(makeId)
      .subscribe(x => {
        this.models = x;
        this.loading = false;
      },
        error => {
          this.loading = false;
          this.errorMessage = error.errMsg;
        });
  }

  buildForm(): void {

    this.form = this.fb.group({
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

  makeSelected(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    console.log(selectedData.value);
    this.getModels(selectedData.value);
  }

  modelSelected(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    console.log(selectedData.value);
  }

}
