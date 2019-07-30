import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-creditprofile',
  templateUrl: './creditprofile.component.html',
  styleUrls: ['./creditprofile.component.scss']
})
export class CreditprofileComponent implements OnInit {
  @Input() disclosures: any;
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  get ctlPoiIssues() { return this.form.get('poiIssues'); }

  ngOnInit() {
    this.buildForm();
    // console.log('name: ' + this.name);
    // console.log('limited credit:' + JSON.stringify(this.disclosures));
    if (this.disclosures) {
      this.form.patchValue({
        limitedCredit: this.disclosures.limitedCredit
      });
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      limitedCredit: [{ value: false, disabled: true },
      { updateOn: 'submit' }],
      poiIssues: [{ value: false, disabled: true },
      { updateOn: 'submit' }]
    });
  }

  onSubmit() {

  }

  setControlProperties(enable: boolean) {
    if (enable) {
      this.ctlPoiIssues!.enable();
    } else {
      this.ctlPoiIssues!.disable();
    }
  }
}
