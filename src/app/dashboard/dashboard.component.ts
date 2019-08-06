import { Component, OnInit } from '@angular/core';
import { crownhonda } from './data';
import { crownjaguar } from './data';
import { single } from './data';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  crownhonda: any[];
  crownjaguar: any[];
  single: any[];

  view: any[] = [200, 200];

  crownHondaScheme = {
    domain: ['#2196f3']  // #2196F3
  };

  crownJaguarScheme = {
    domain: ['#FF69B4']  // #03A9F4
  };

  constructor(private alertService: AlertService) {

    Object.assign(this, {
      crownhonda,
      crownjaguar,
      single
    });
  }

  ngOnInit() {
    const str = `By using our site, you acknowledge that you have read and
                understand our Cookie Policy, Privacy Policy, and our Terms of Service.`;
    // setTimeout(() => {
    //   this.alertService.info(str);
    //   }, 1);
  }

  onSelect(event) {
    console.log(event);
  }
}
