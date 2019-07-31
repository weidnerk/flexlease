/**
 * Intended to be used by objectarrayprint to edit dealer state profiles.
 */
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DealerStateProfile } from '../_models';

@Component({
  selector: 'app-dealerstateprofile',
  templateUrl: './dealerstateprofile.component.html',
  styleUrls: ['./dealerstateprofile.component.scss']
})
export class DealerstateprofileComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<DealerstateprofileComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { rec: DealerStateProfile }) { }

  ngOnInit() {
    this.buildForm();
    this.form.patchValue({
      buyFactor: this.data.rec.buyFactor,
      sellFactor: this.data.rec.sellFactor
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      buyFactor: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      sellFactor: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }]
    });
  }

  onSubmit() {

  }

  onCancel() {
    this.dialogRef.close();
  }
}
