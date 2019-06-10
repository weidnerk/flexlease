import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FLEXDealer } from '../_models/dealer';
import { DataService } from '../_services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dealersettingsdialog',
  templateUrl: './dealersettingsdialog.component.html',
  styleUrls: ['./dealersettingsdialog.component.scss']
})
export class DealersettingsdialogComponent implements OnInit {
  dealerid: number;
  dealer: FLEXDealer;
  loading = false;
  errorMessage: string;
  form: FormGroup;

  get cmsid() { return this.form.get('cmsid'); }
  get dealerDocFee() { return this.form.get('dealerDocFee'); }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dataService: DataService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<DealersettingsdialogComponent>) {
    this.dealerid = data.dealerid;
  }

  ngOnInit() {
    console.log('dialog dealerid: ' + this.dealerid);
    this.getDealer();
    this.buildForm();
  }

  getDealer() {
    this.loading = true;
    this.dataService.getValue<FLEXDealer>('FLEXDealer', this.dealerid).subscribe(
      data => {
        this.dealer = data;
        this.loading = false;
        console.log('dba: ' + this.dealer.dba);
        this.form.patchValue({
          dealerDocFee: this.dealer.serviceFee,
          cmsid: this.dealer.cmsCompanyId
        });

      },
      error => {
        this.loading = false;
        console.log('getDealer: ' + error);
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }

  buildForm(): void {

    this.form = this.fb.group({
      cmsid: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      dealerDocFee: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }]
    });
  }
  onCancel() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.form.valid) {
      let dealer = {} as FLEXDealer;
      dealer.id = this.dealer.id;
      dealer.cmsCompanyId = this.cmsid!.value;
      dealer.serviceFee = this.dealerDocFee!.value;

      this.dataService.storeObject<FLEXDealer>('FLEXDealer', dealer, ['ServiceFee']).subscribe(
        data => {
          this.dialogRef.close();
        },
        error => {
          console.log('storeDealer: ' + error);
          this.errorMessage = error;
        }
        ,      // in case of failure show this message
        () => console.log('Job Done Post !')
      );
    } else {
      this.errorMessage = 'Form is invalid.';
    }

  }
}
