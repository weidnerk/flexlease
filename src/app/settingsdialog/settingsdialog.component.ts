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

  buildForm(): void {

    this.form = this.fb.group({
      minIndIncome: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      minJointIncome: [null, {
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
  loadData() {
    let maintValue = {} as MaintenanceValue[];
    this.loading = true;
    let idarray: number[] = [904, 905];
    this.dataService.getValueArray<MaintenanceValue>('MaintenanceValue', idarray).subscribe(
      data => {
        maintValue = data;
        this.loading = false;
        for (let m of maintValue) {
          if (m.id === 904) {
            this.form.patchValue({
              minIndIncome: m.value1
            });
          }
          if (m.id === 905) {
            this.form.patchValue({
              minJointIncome: m.value1
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

  storeData() {
    let arr: MaintenanceValue[] = [];
    const minIndIncomeItem = {} as MaintenanceValue;
    minIndIncomeItem.fileID = 71;
    minIndIncomeItem.value1 = this.minIndIncome.value;
    minIndIncomeItem.id = 904;
    arr.push(minIndIncomeItem);

    const minJointIncomeItem = {} as MaintenanceValue;
    minJointIncomeItem.fileID = 71;
    minJointIncomeItem.value1 = this.minJointIncome.value;
    minJointIncomeItem.id = 905;
    arr.push(minJointIncomeItem);

    this.dataService.storeValueArray<MaintenanceValue>('MaintenanceValue', arr).subscribe(
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
