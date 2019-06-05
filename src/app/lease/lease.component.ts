import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lease, Vehicle } from '../_models';
import { DataService } from '../_services/data.service';
import { MatAccordion, MatExpansionPanel } from '@angular/material';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.scss']
})
export class LeaseComponent implements OnInit, OnDestroy {
  errorMessage: string;
  loading = false;
  loaded = false;
  appid: number;
  lease: Lease;
  private paramsSubscription: Subscription;
  loadingVehicle = false;
  vehicle: Vehicle;
  vehicleLoaded = false;

  constructor(private activatedroute: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {

    this.paramsSubscription = this.activatedroute.params.subscribe(params => {
        this.appid = params.appid;
        this.getLease();
        this.getVehicle();
      });
  }
  ngOnDestroy() {
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

}
