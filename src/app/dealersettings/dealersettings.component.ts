import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DealersettingsdialogComponent } from '../dealersettingsdialog/dealersettingsdialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dealersettings',
  templateUrl: './dealersettings.component.html',
  styleUrls: ['./dealersettings.component.sass']
})
export class DealersettingsComponent implements OnInit, OnDestroy, AfterViewInit {

  private paramsSubscription: Subscription;
  dealerid: number;

  constructor(public dialog: MatDialog,
              private router: Router,
              private activatedroute: ActivatedRoute
  ) {
    this.paramsSubscription = this.activatedroute.params.subscribe(params => {
      this.dealerid = params.dealerid;

      const dialogRef = this.dialog.open(DealersettingsdialogComponent, {
        height: '400px',
        width: '300px',
        data: { dealerid: this.dealerid }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.router.navigate(['/dealers']);
      });
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
