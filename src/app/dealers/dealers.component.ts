import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { FLEXDealer } from '../_models/dealer';
import { MatDialog } from '@angular/material';
import { DealersettingsdialogComponent } from '../dealersettingsdialog/dealersettingsdialog.component';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss']
})
export class DealersComponent implements OnInit {

  loading = false;
  errorMessage = '';
  dealers: FLEXDealer[];

  constructor(private dataService: DataService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getDealers();
  }

  getDealers() {
    const filter: string[] = [];
    filter.push('program');
    filter.push('POS2');
    this.loading = true;
    this.dataService.getValues<FLEXDealer>('FLEXDealer', undefined, filter).subscribe(
      data => {
        this.dealers = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }

  openSettings(cmsid: number) {
    // console.log(cmsid);

    const dialogRef = this.dialog.open(DealersettingsdialogComponent, {
      height: '500px',
      width: '300px',
      data: { dealerid: cmsid }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

}
