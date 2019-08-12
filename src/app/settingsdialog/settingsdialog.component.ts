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

  maintValues = {} as MaintenanceValue[];
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
  get maxMarkupPct() { return this.form.get('maxMarkupPct'); }
  get maxMarkup1() { return this.form.get('maxMarkup1'); }
  get maxMarkup2() { return this.form.get('maxMarkup2'); }
  get minCashDown() { return this.form.get('minCashDown'); }
  get minCashDownPct() { return this.form.get('minCashDownPct'); }
  get bRatingPctOffset() { return this.form.get('bRatingPctOffset'); }
  get cRatingPctOffset() { return this.form.get('cRatingPctOffset'); }
  get leaseContractRate() { return this.form.get('leaseContractRate'); }
  get standardLeaseTerm() { return this.form.get('standardLeaseTerm'); }
  get discountPct() { return this.form.get('discountPct'); }
  get overStandardTermPct() { return this.form.get('overStandardTermPct'); }
  get underStandardTermPct() { return this.form.get('underStandardTermPct'); }

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
      }],
      maxMarkupPct: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      maxMarkup1: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      maxMarkup2: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      minCashDown: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      minCashDownPct: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      bRatingPctOffset: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      cRatingPctOffset: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      leaseContractRate: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      standardLeaseTerm: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      discountPct: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      overStandardTermPct: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      underStandardTermPct: [null, {
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
        this.maintValues = data;
        this.loading = false;
        for (const m of this.maintValues) {
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
          if (m.ruleName === 'Max Markup %') {
            this.form.patchValue({
              maxMarkupPct: m.value1
            });
          }
          if (m.ruleName === 'Max Markup 1') {
            this.form.patchValue({
              maxMarkup1: m.value1
            });
          }
          if (m.ruleName === 'Max Markup 2') {
            this.form.patchValue({
              maxMarkup2: m.value1
            });
          }
          if (m.ruleName === 'Min Cash Down $') {
            this.form.patchValue({
              minCashDown: m.value1
            });
          }
          if (m.ruleName === 'Min Cash Down %') {
            this.form.patchValue({
              minCashDownPct: m.value1
            });
          }
          if (m.ruleName === 'B Rating % Offset') {
            this.form.patchValue({
              bRatingPctOffset: m.value1
            });
          }
          if (m.ruleName === 'C Rating % Offset') {
            this.form.patchValue({
              cRatingPctOffset: m.value1
            });
          }
          if (m.ruleName === 'Lease Contract Rate') {
            this.form.patchValue({
              leaseContractRate: m.value1
            });
          }
          if (m.ruleName === 'Standard Lease Term') {
            this.form.patchValue({
              standardLeaseTerm: m.value1
            });
          }
          if (m.ruleName === 'Discount %') {
            this.form.patchValue({
              discountPct: m.value1
            });
          }
          if (m.ruleName === 'Over Standard Term %') {
            this.form.patchValue({
              overStandardTermPct: m.value1
            });
          }
          if (m.ruleName === 'Under Standard Term %') {
            this.form.patchValue({
              underStandardTermPct: m.value1
            });
          }
        }
      },
      error => {
        this.loading = false;
        console.log('getLease: ' + error);
        this.errorMessage = error;
      }
    );
  }

  /**
   * Map form values back to maint value array.
   * case values must match 'Value1' values in tblFileMaint.
   */
  loadArrayFromForm() {
    for (const m of this.maintValues) {
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
        case 'Max Markup %':
          m.value1 = this.maxMarkupPct!.value;
          break;
        case 'Max Markup 1':
          m.value1 = this.maxMarkup1!.value;
          break;
        case 'Max Markup 2':
          m.value1 = this.maxMarkup2!.value;
          break;
        case 'Min Cash Down $':
          m.value1 = this.minCashDown!.value;
          break;
        case 'Min Cash Down %':
          m.value1 = this.minCashDownPct!.value;
          break;
        case 'B Rating % Offset':
          m.value1 = this.bRatingPctOffset!.value;
          break;
        case 'C Rating % Offset':
          m.value1 = this.cRatingPctOffset!.value;
          break;
        case 'Lease Contract Rate':
          m.value1 = this.leaseContractRate!.value;
          break;
        case 'Standard Lease Term':
          m.value1 = this.standardLeaseTerm!.value;
          break;
        case 'Discount %':
          m.value1 = this.discountPct!.value;
          break;
        case 'Over Standard Term %':
          m.value1 = this.overStandardTermPct!.value;
          break;
        case 'Under Standard Term %':
          m.value1 = this.underStandardTermPct!.value;
          break;
      }
    }
  }

  storeData() {
    this.loadArrayFromForm();
    this.dataService.storeValueArray<MaintenanceValue>('MaintenanceValue', this.maintValues, ['Value1']).subscribe(
      data => {

      },
      error => {
        console.log('storeMaintValue: ' + error);
      }
    );
  }
}
