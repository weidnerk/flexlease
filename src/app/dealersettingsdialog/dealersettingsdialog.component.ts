import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dealersettingsdialog',
  templateUrl: './dealersettingsdialog.component.html',
  styleUrls: ['./dealersettingsdialog.component.sass']
})
export class DealersettingsdialogComponent implements OnInit {
 dealerid: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dealerid = data.dealerid;
  }

  ngOnInit() {
    console.log('dialog dealerid: ' + this.dealerid);
  }

}
