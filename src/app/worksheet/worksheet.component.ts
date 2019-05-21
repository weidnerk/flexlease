import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Lease } from '../_models/index';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.scss']
})
export class WorksheetComponent implements OnInit, OnDestroy {
  appid: number;
  lease: Lease;
  form: FormGroup;
  private paramsSubscription: Subscription;

  constructor(private activatedroute: ActivatedRoute) { }

  ngOnInit() {

    this.paramsSubscription = this.activatedroute.params.subscribe(params => {
      this.appid = params.appid;
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
