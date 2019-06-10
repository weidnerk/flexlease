import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lease, Vehicle, CustomerApp } from '../_models';
import { DataService } from '../_services/data.service';
import { MatAccordion, MatExpansionPanel, MatSlider } from '@angular/material';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.scss']
})
export class LeaseComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('annualMilesElected', { static: false }) annualMiles: MatSlider;

  errorMessage: string;
  loading = false;
  loaded = false;
  appid: number;
  lease: Lease;
  private paramsSubscription: Subscription;
  loadingVehicle = false;
  vehicle: Vehicle;
  vehicleLoaded = false;
  ame: number;

  // 'Annual miles elected' slider settings
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 18000;
  min = 15000;
  showTicks = true;
  step = 1000;
  thumbLabel = true;
  value = 0;
  vertical = false;
  _tickInterval = 1;
  // End slider settings

  constructor(private activatedroute: ActivatedRoute,
    private dataService: DataService) { }

  ngOnInit() {
    this.paramsSubscription = this.activatedroute.params.subscribe(params => {
      this.appid = params.appid;
      this.getLease();
      this.getVehicle();
    });

  }
  ngAfterViewInit() {
    console.log('afterViewInit');
  }
  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.paramsSubscription.unsubscribe();
  }

  // Get lease and calculate
  getLease() {
    this.loading = true;
    this.dataService.getValue<Lease>('Lease', this.appid).subscribe(
      data => {
        this.lease = data;
        this.loading = false;
        this.loaded = true;
        // if (this.annualMiles) {
        //   this.annualMiles.value = this.lease.customerApp.annualMiles;
        //   this.annualMiles.value = 17000;
        // }
        setTimeout(() => {
          this.annualMiles.value = this.lease.customerApp.annualMiles;
        }, 1);
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
  getVehicle() {
    this.loadingVehicle = true;
    this.dataService.getValue<Vehicle>('Vehicle', this.appid).subscribe(
      data => {
        this.vehicle = data;
        this.loadingVehicle = false;
        this.vehicleLoaded = true;
      },
      error => {
        this.loadingVehicle = false;
        console.log('getVehicle: ' + error);
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }
  onStore() {

    const app = {} as CustomerApp;
    app.lenderAppId = this.appid;
    if (this.annualMiles.value) {
      app.annualMiles = this.annualMiles.value;
    }

    this.dataService.storeObject<CustomerApp>('CustomerApp', app, ['AnnualMiles']).subscribe(
      data => {
        this.errorMessage = 'Record has been stored.';
      },
      error => {
        console.log('storeDealer: ' + error);
        this.errorMessage = error;
      }
      ,      // in case of failure show this message
      () => console.log('Job Done Post !')
    );
  }

  // used by mat-slider
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  // used by mat-slider
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = +value;
  }
}
