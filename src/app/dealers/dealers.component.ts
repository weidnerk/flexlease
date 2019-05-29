import { Component, OnInit } from '@angular/core';
import { LeaseService } from '../_services/lease.service';
import { FLEXDealer } from '../_models/dealer';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss']
})
export class DealersComponent implements OnInit {

  loading = false;
  errorMessage = '';
  dealers: FLEXDealer[];

  constructor(private leaseService: LeaseService) { }

  ngOnInit() {
    this.getDealers();
  }

  getDealers() {
    let filter: string[] = [];;
    filter.push('program');
    filter.push('POS2');
    this.loading = true;
    this.leaseService.getValues<FLEXDealer>('FLEXDealer', undefined, filter).subscribe(
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

}
