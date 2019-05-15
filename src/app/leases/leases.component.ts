import { Component, OnInit } from '@angular/core';
import { Lease } from '../_models';
import { LeaseService } from '../_services/lease.service';

@Component({
  selector: 'app-leases',
  templateUrl: './leases.component.html',
  styleUrls: ['./leases.component.sass']
})
export class LeasesComponent implements OnInit {
  public cardList: CardInterface[] = [];
  leases: Lease[];
  loading = false;
  errorMessage: string;

  constructor(private leaseService: LeaseService) { }

  ngOnInit() {
    // for (let i = 1; i <= 10; i++) {
    //   this.cardList.push({
    //     imgSrc: 'http://via.placeholder.com/300',
    //     title: 'Card No. ' + i,
    //     description:
    //       'Angular Flex Layout provides a sophisticated layout API using FlexBox CSS + mediaQuery.\
    //       This module provides Angular developers with component layout features using a custom Layout API, \
    //       mediaQuery observables, and injected DOM flexbox-2016 css stylings.'
    //   });
    // }
    this.getLeases();
  }

  getLeases() {
    this.loading = true;
    this.leaseService.getLeases().subscribe(
      data => {
        this.leases = data;
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
export interface CardInterface {
  imgSrc: string;
  title: string;
  description: string;
}
