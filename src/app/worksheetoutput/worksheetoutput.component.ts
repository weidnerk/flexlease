import { Component, OnInit, Input } from '@angular/core';
import { LeaseResult } from '../_models';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-worksheetoutput',
  templateUrl: './worksheetoutput.component.html',
  styleUrls: ['./worksheetoutput.component.scss']
})
export class WorksheetoutputComponent implements OnInit {
  @Input() result: LeaseResult;
  leaseResult: LeaseResult = null;
  loaded = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {

    // subscribe to the currentDealer observable
    this.sharedService.currentLeaseResult.subscribe(
      leaseResult => {
        if (Object.keys(leaseResult).length !== 0) {
          this.leaseResult = leaseResult;
          this.loaded = true;
        }
      }
    );
  }

}
