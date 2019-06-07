import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DataService } from '../_services/data.service';
import { MaintenanceValue } from '../_models/MaintenanceValue';

@Component({
  selector: 'app-settingsdialog',
  templateUrl: './settingsdialog.component.html',
  styleUrls: ['./settingsdialog.component.scss']
})
export class SettingsdialogComponent implements OnInit {

  maintValue = {} as MaintenanceValue[];
  loading = false;
  errorMessage: string;
  form: FormGroup;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<SettingsdialogComponent>,
    private dataService: DataService) { }

  ngOnInit() {
    this.buildForm();
  }
  get minIndIncome() { return this.form.get('minIndIncome'); }
  get minJointIncome() { return this.form.get('minJointIncome'); }
  get acqFee() { return this.form.get('acqFee'); }

  buildForm(): void {

    this.form = this.fb.group({
      minIndIncome: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      minJointIncome: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      acqFee: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }]
    });
    this.loadData();
  }

  onSubmit() {
    this.storeData();
    this.dialogRef.close();
  }
  onCancel() {
    this.dialogRef.close();
  }
  /**
   * load data
   */
  loadData() {
    this.loading = true;
    this.dataService.getValues<MaintenanceValue>('MaintenanceValue').subscribe(
      data => {
        this.maintValue = data;
        this.loading = false;
        for (const m of this.maintValue) {
          if (m.ruleName === 'Min Indv Income') {
            this.form.patchValue({
              minIndIncome: m.value1
            });
          }
          if (m.ruleName === 'Min Joint Income') {
            this.form.patchValue({
              minJointIncome: m.value1
            });
          }
          if (m.ruleName === 'Acquisition Fee') {
            this.form.patchValue({
              acqFee: m.value1
            });
          }
        }
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

  /**
   * Map form values back to maint value array.
   * case values must match 'Value1' values in tblFileMaint.
   */
  loadArrayFromForm() {
    for (const m of this.maintValue) {
      switch (m.ruleName) {
        case 'Min Indv Income':
          m.value1 = this.minIndIncome!.value;
          break;
        case 'Min Joint Income':
          m.value1 = this.minJointIncome!.value;
          break;
          case 'Acquisition Fee':
            m.value1 = this.acqFee!.value;
            break;
        }
    }
  }

  storeData() {
    this.loadArrayFromForm();
    this.dataService.storeValueArray<MaintenanceValue>('MaintenanceValue', this.maintValue).subscribe(
      data => {

      },
      error => {
        console.log('storeMaintValue: ' + error);
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }
}
