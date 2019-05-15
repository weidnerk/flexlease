// refer to: https://www.youtube.com/watch?v=I317BhehZKM

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LeaseResult } from '../_models';

@Injectable()
export class SharedService {

  // BehaviorSubject ensures that components consuming the service receive the most recent, up to date data

  // 1. Hold current value of the Company (notice private)
  private leaseResultSource = new BehaviorSubject({} as LeaseResult);

  // 2. Create observable to be used by the components - thus, the variable is public
  currentLeaseResult = this.leaseResultSource.asObservable();

  constructor() { }

  // call 'next' on the BehaviorSubject to changes its current value
  changeLeaseResult(result: LeaseResult) {
    this.leaseResultSource.next(result);
  }
}
