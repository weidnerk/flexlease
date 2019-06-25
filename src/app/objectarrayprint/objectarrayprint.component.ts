/**
 * Print an array of objects in spreadsheet-like format.
 * 
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-objectarrayprint',
  templateUrl: './objectarrayprint.component.html',
  styleUrls: ['./objectarrayprint.component.scss']
})
export class ObjectarrayprintComponent implements OnInit {
  @Input() object: any;

  constructor() { }

  arrName: string[][];
  keys: string[] = [];
  values: string[] = [];

  ngOnInit() {
    this.keys = Object.keys(this.object[0]);
  }

  getObjectValues(o: any) {
    const r = Object.values(o);
    return r;
  }

  isObject(o: any): boolean {
    if (o) {
      if (typeof o === 'object') {
        return true;
      } else { return false; }
    } else {
      return false;
    }
  }

  /**
   * This component wants to iterate an array so in the case of a nested object in an array element,
   * convert that object to an array.
   * @param o 
   */
  objectToArray(o: any) {
    if (o) {
      const arr = [o];
      return arr;
    } else {
      return null;
    }
  }
}
