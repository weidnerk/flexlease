import { Component, OnInit } from '@angular/core';
import { Lease } from '../_models';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-leases',
  templateUrl: './leases.component.html',
  styleUrls: ['./leases.component.scss']
})
export class LeasesComponent implements OnInit {
  leases: Lease[];
  loading = false;
  errorMessage: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getLeases();
  }

  getLeases() {
    this.loading = true;
    this.dataService.getValues<Lease>('Lease').subscribe(
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
