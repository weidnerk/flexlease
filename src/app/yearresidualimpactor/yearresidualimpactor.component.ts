import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { YearResidualImpactor } from '../_models';

@Component({
  selector: 'app-yearresidualimpactor',
  templateUrl: './yearresidualimpactor.component.html',
  styleUrls: ['./yearresidualimpactor.component.scss']
})
export class YearresidualimpactorComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<YearresidualimpactorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { rec: YearResidualImpactor }) { }

  ngOnInit() {
    this.buildForm();
    this.form.patchValue({
      impactPct: this.data.rec.impactPct,
      yearModel: this.data.rec.yearModel
    });
  }

  buildForm(): void {
    this.form = this.fb.group({
      yearModel: [null, {
        validators: [Validators.required, Validators.minLength(2)],
        updateOn: 'submit'
      }],
      impactPct: [null, {
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
