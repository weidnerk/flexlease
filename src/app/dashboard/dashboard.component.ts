import { Component } from '@angular/core';
import { crownhonda } from './data';
import { crownjaguar } from './data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {

  crownhonda: any[];
  crownjaguar: any[];

  view: any[] = [200, 200];

  crownHondaScheme = {
    domain: ['#2196f3']  // #2196F3
  };

  crownJaguarScheme = {
    domain: ['#FF69B4']  // #03A9F4
  };

  constructor() {

    Object.assign(this, {
      crownhonda,
      crownjaguar
    });
  }

  onSelect(event) {
    console.log(event);
  }
}
