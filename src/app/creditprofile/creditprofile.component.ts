import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-creditprofile',
  templateUrl: './creditprofile.component.html',
  styleUrls: ['./creditprofile.component.scss']
})
export class CreditprofileComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {

    this.form = this.fb.group({
      limitedCredit: [false,
        { updateOn: 'submit' }]
    });
  }

  onSubmit() {

  }
}
