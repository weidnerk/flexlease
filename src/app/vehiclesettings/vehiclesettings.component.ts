import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../_services/data.service';
import { VehicleMake, VehicleModel } from '../_models';
import { MatSelectChange, MatOption } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehiclesettings',
  templateUrl: './vehiclesettings.component.html',
  styleUrls: ['./vehiclesettings.component.scss']
})
export class VehiclesettingsComponent implements OnInit {
  ratingPattern = '^[A-C]$';
  form: FormGroup;
  makes: VehicleMake[];
  models: VehicleModel[];
  errorMessage: string;
  loading = false;

  constructor(private fb: FormBuilder,
    private dataService: DataService,
    private router: Router) { }

  get makeId() { return this.form.get('make'); }
  get modelId() { return this.form.get('model'); }
  get rating() { return this.form.get('rating'); }

  ngOnInit() {
    this.buildForm();
    this.getMakes();
  }


  getMakes() {
    this.loading = true;
    this.dataService.getValues<VehicleMake>('VehicleMake')
      .subscribe(x => {
        this.makes = x;
        this.loading = false;
      },
        error => {
          this.loading = false;
          this.errorMessage = error;
        });
  }

  getModels(makeId: number) {
    this.loading = true;
    this.dataService.getValues<VehicleModel>('VehicleModel', makeId)
      .subscribe(x => {
        this.models = x;
        this.loading = false;
      },
        error => {
          this.loading = false;
          this.errorMessage = error;
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
      }],
      rating: [null, {
        validators: [Validators.required, Validators.pattern(this.ratingPattern)],
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
    // console.log(selectedData.value);

    this.dataService.getValue<VehicleModel>('VehicleModel', selectedData.value)
      .subscribe(x => {
        const model = x;
        this.form.patchValue({
          rating: model.rating
        });

      },
        error => {
          this.errorMessage = error;
        });

  }

  onSubmit() {

    if (this.form.valid) {
      const model = {} as VehicleModel;
      model.ID = this.modelId!.value;
      model.rating = this.rating!.value.toUpperCase();

      this.dataService.storeValue<VehicleModel>('VehicleModel', model).subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          console.log('storeMaintValue: ' + error);
        }
        ,      // in case of failure show this message
        () => console.log('Job Done Post !')
      );
    } else {
      this.errorMessage = 'Form is invalid.';
    }
  }
}
